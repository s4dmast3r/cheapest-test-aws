"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatabaseSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeederService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
const path = __importStar(require("path"));
const typeorm_1 = require("typeorm");
const NOW = Symbol('NOW');
const LOAD_SEED_KEYS = [
    'productos',
    'catalogos',
    'catalogos_productos',
    'promociones',
    'pedidos',
    'items_pedido',
    'despachos',
    'disponibilidad_zona',
    'notas_credito',
    'items_inventario',
    'registros_compra_producto_tienda',
    'registros_venta_producto_tienda',
    'productos_externos',
    'ventas',
    'items_venta',
];
let DatabaseSeederService = DatabaseSeederService_1 = class DatabaseSeederService {
    dataSource;
    logger = new common_1.Logger(DatabaseSeederService_1.name);
    logisticaMonedaId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
    inventarioMonedaId = '550e8400-e29b-41d4-a716-446655440000';
    tiendaIds = [
        'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbc',
    ];
    effectiveTiendaIds = this.tiendaIds;
    zonaNames = null;
    paretoDist = null;
    zonaBaseNames = [
        'Zona Norte',
        'Zona Sur',
        'Zona Oriente',
        'Zona Occidente',
        'Zona Centro',
    ];
    categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
    marcas = ['Marca A', 'Marca B', 'Marca C', 'Marca D'];
    estadosPedido = [
        'creado',
        'aprobado',
        'enAlistamiento',
        'alistado',
        'despachado',
        'entregado',
        'cancelado',
        'devuelto',
    ];
    motivosNotaCredito = [
        'productoVencido',
        'productoEquivocado',
        'danoEnTransporte',
    ];
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onModuleInit() {
        await this.seedDatabase();
    }
    async seedDatabase() {
        this.logger.log('Synchronizing database schema before seeding.');
        await this.dataSource.synchronize();
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.applyBaseSeed(queryRunner);
            const counts = this.loadSeedCounts();
            this.logger.log(`Top-up targets: ${JSON.stringify(counts)}`);
            const productoIds = await this.seedProductos(queryRunner, counts.productos);
            const catalogoIds = await this.seedCatalogos(queryRunner, counts.catalogos);
            await this.seedCatalogoProductos(queryRunner, counts.catalogos_productos, catalogoIds, productoIds);
            await this.seedPromociones(queryRunner, counts.promociones, productoIds);
            const pedidoIds = await this.seedPedidos(queryRunner, counts.pedidos);
            await this.seedItemsPedido(queryRunner, counts.items_pedido, pedidoIds, productoIds);
            await this.seedDespachos(queryRunner, counts.despachos, pedidoIds);
            await this.seedDisponibilidadZona(queryRunner, counts.disponibilidad_zona, catalogoIds, productoIds);
            await this.seedNotasCredito(queryRunner, counts.notas_credito, pedidoIds);
            const itemInventarioIds = await this.seedItemsInventario(queryRunner, counts.items_inventario, productoIds);
            await this.seedRegistrosCompra(queryRunner, counts.registros_compra_producto_tienda, itemInventarioIds, productoIds);
            await this.seedRegistrosVenta(queryRunner, counts.registros_venta_producto_tienda, itemInventarioIds, productoIds);
            const productoExternoIds = await this.seedProductosExternos(queryRunner, counts.productos_externos);
            const ventaIds = await this.seedVentas(queryRunner, counts.ventas);
            await this.seedItemsVenta(queryRunner, counts.items_venta, ventaIds, productoExternoIds);
            await queryRunner.commitTransaction();
            this.logger.log('✅ Database seeded successfully.');
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error('❌ Failed to seed database.', error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async applyBaseSeed(queryRunner) {
        const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
        const statements = this.extractSqlStatements(sql).map((s) => this.makeStatementIdempotent(s));
        for (const statement of statements) {
            await queryRunner.query(statement);
        }
    }
    loadSeedCounts() {
        const config = yaml.load(fs.readFileSync(path.join(__dirname, 'load-seed.yaml'), 'utf8'));
        const loadConfig = config.load ?? {};
        this.configureDistribution(loadConfig);
        return LOAD_SEED_KEYS.reduce((counts, key) => ({
            ...counts,
            [key]: this.parseCount(loadConfig[key], key),
        }), {});
    }
    configureDistribution(loadConfig) {
        const { tiendas, zonas, distribucion } = loadConfig;
        if (tiendas !== undefined) {
            if (typeof tiendas !== 'number' ||
                !Number.isInteger(tiendas) ||
                tiendas < this.tiendaIds.length) {
                throw new Error(`Invalid load-seed count for "tiendas": ${String(tiendas)} (mínimo ${this.tiendaIds.length})`);
            }
            this.effectiveTiendaIds = [
                ...this.tiendaIds,
                ...Array.from({ length: tiendas - this.tiendaIds.length }, (_, i) => `eeeeeeee-0000-4000-8000-${String(i + 1).padStart(12, '0')}`),
            ];
        }
        if (zonas !== undefined) {
            if (typeof zonas !== 'number' || !Number.isInteger(zonas) || zonas < 1) {
                throw new Error(`Invalid load-seed count for "zonas": ${String(zonas)}`);
            }
            this.zonaNames = Array.from({ length: zonas }, (_, i) => i < this.zonaBaseNames.length ? this.zonaBaseNames[i] : `Zona ${i + 1}`);
        }
        if (distribucion !== undefined) {
            const tipo = distribucion.tipo ?? 'uniforme';
            if (tipo === 'pareto') {
                const pesoCabeza = this.parseFraction(distribucion.peso_cabeza, 'distribucion.peso_cabeza', 0.8);
                const fraccionCabeza = this.parseFraction(distribucion.fraccion_cabeza, 'distribucion.fraccion_cabeza', 0.2);
                this.paretoDist = { pesoCabeza, fraccionCabeza };
            }
            else if (tipo !== 'uniforme') {
                throw new Error(`Invalid load-seed "distribucion.tipo": ${String(tipo)} (use "uniforme" o "pareto")`);
            }
        }
    }
    parseFraction(value, key, defaultValue) {
        if (value === undefined)
            return defaultValue;
        if (typeof value !== 'number' || value <= 0 || value >= 1) {
            throw new Error(`Invalid load-seed "${key}": ${String(value)} (debe estar entre 0 y 1)`);
        }
        return value;
    }
    pickAssigned(list, index) {
        if (list.length <= 1)
            return list[0];
        if (!this.paretoDist)
            return list[index % list.length];
        const headCount = Math.max(1, Math.min(list.length - 1, Math.round(list.length * this.paretoDist.fraccionCabeza)));
        const tailCount = list.length - headCount;
        const headTickets = Math.max(1, Math.min(9, Math.round(this.paretoDist.pesoCabeza * 10)));
        const cycle = Math.floor(index / 10);
        if (index % 10 < headTickets) {
            return list[cycle % headCount];
        }
        return list[headCount + (cycle % tailCount)];
    }
    parseCount(value, key) {
        if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
            throw new Error(`Invalid load-seed count for "${key}": ${String(value)}`);
        }
        return value;
    }
    extractSqlStatements(sql) {
        return sql
            .split(/\r?\n/)
            .filter((line) => !line.trim().startsWith('--'))
            .join('\n')
            .split(';')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
    }
    makeStatementIdempotent(statement) {
        if (!/^INSERT\s+INTO/i.test(statement)) {
            return statement;
        }
        return `${statement} ON CONFLICT DO NOTHING`;
    }
    async seedProductos(queryRunner, targetCount) {
        const existingIds = await this.getIds(queryRunner, 'productos');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return existingIds;
        const insertedIds = this.uuids(missingCount);
        const startIndex = existingIds.length;
        await this.batchInsert(queryRunner, 'INSERT INTO productos (id, "codigoInterno", "codigoBarras", nombre, marca, categoria, presentacion, "precioBase", "monedaId") VALUES', insertedIds.map((id, index) => {
            const seq = startIndex + index + 1;
            return [
                id,
                `LOAD-${String(seq).padStart(5, '0')}`,
                `${7000000000000 + seq}`,
                `Producto Load ${seq}`,
                this.marcas[index % this.marcas.length],
                this.categorias[index % this.categorias.length],
                `Presentacion ${(index % 3) + 1}`,
                (10 + (index % 90)).toFixed(2),
                this.logisticaMonedaId,
            ];
        }));
        return [...existingIds, ...insertedIds];
    }
    async seedCatalogos(queryRunner, targetCount) {
        const existingIds = await this.getIds(queryRunner, 'catalogos');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return existingIds;
        const insertedIds = this.uuids(missingCount);
        const startIndex = existingIds.length;
        await this.batchInsert(queryRunner, 'INSERT INTO catalogos (id, "tiendaId", "vigenciaDesde", "vigenciaHasta", zona) VALUES', insertedIds.map((id, index) => [
            id,
            this.pickAssigned(this.effectiveTiendaIds, startIndex + index),
            '2026-01-01 00:00:00',
            '2026-12-31 23:59:59',
            this.zonaNames
                ? this.pickAssigned(this.zonaNames, startIndex + index)
                : `Zona Load ${startIndex + index + 1}`,
        ]));
        return [...existingIds, ...insertedIds];
    }
    async seedCatalogoProductos(queryRunner, targetCount, catalogoIds, productoIds) {
        this.ensureReferences(catalogoIds, 'catalogos_productos_productos', 'catalogos');
        this.ensureReferences(productoIds, 'catalogos_productos_productos', 'productos');
        const existingPairs = await this.getCatalogoProductoPairs(queryRunner);
        const missingCount = this.getMissingCount(existingPairs.size, targetCount);
        if (missingCount === 0)
            return;
        const rows = this.buildMissingCatalogoProductoPairs(catalogoIds, productoIds, existingPairs, missingCount);
        await this.batchInsert(queryRunner, 'INSERT INTO "catalogos_productos_productos" ("catalogosId", "productosId") VALUES', rows);
    }
    async seedPromociones(queryRunner, targetCount, productoIds) {
        this.ensureReferences(productoIds, 'promociones', 'productos');
        const existingIds = await this.getIds(queryRunner, 'promociones');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        const startIndex = existingIds.length;
        const insertedPromocionIds = this.uuids(missingCount);
        await this.batchInsert(queryRunner, 'INSERT INTO promociones (id, nombre, "precioPromocional", "monedaId", "productoId", inicio, fin, restricciones) VALUES', insertedPromocionIds.map((id, index) => {
            const activa = index % 10 < 7;
            return [
                id,
                `Promo Load ${startIndex + index + 1}`,
                (5 + (index % 40)).toFixed(2),
                this.logisticaMonedaId,
                productoIds[index % productoIds.length],
                activa ? this.daysAgo(30) : this.daysAgo(120),
                activa ? this.daysFromNow(30) : this.daysAgo(60),
                (index % 200) + 1,
            ];
        }));
        await this.batchInsert(queryRunner, 'INSERT INTO promocion_tiendas (id, "promocionId", "tiendaId") VALUES', insertedPromocionIds.map((promocionId, index) => [
            (0, crypto_1.randomUUID)(),
            promocionId,
            this.pickAssigned(this.effectiveTiendaIds, index),
        ]));
    }
    async seedPedidos(queryRunner, targetCount) {
        const existingIds = await this.getIds(queryRunner, 'pedidos');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return existingIds;
        const insertedIds = this.uuids(missingCount);
        const startIndex = existingIds.length;
        await this.batchInsert(queryRunner, 'INSERT INTO pedidos (id, identificador, "tiendaId", "fechaHoraCreacion", "montoTotal", "monedaId", estado) VALUES', insertedIds.map((id, index) => [
            id,
            `PED-LOAD-${String(startIndex + index + 1).padStart(5, '0')}`,
            this.pickAssigned(this.effectiveTiendaIds, startIndex + index),
            this.daysAgo(missingCount - index),
            (20 + (index % 200)).toFixed(2),
            this.logisticaMonedaId,
            this.estadosPedido[index % this.estadosPedido.length],
        ]));
        return [...existingIds, ...insertedIds];
    }
    async seedItemsPedido(queryRunner, targetCount, pedidoIds, productoIds) {
        this.ensureReferences(pedidoIds, 'items_pedido', 'pedidos');
        this.ensureReferences(productoIds, 'items_pedido', 'productos');
        const existingIds = await this.getIds(queryRunner, 'items_pedido');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        const startIndex = existingIds.length;
        await this.batchInsert(queryRunner, 'INSERT INTO items_pedido (id, "pedidoId", "productoId", cantidad, "precioUnitario", descuento, "monedaId", lote, "fechaVencimiento") VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            pedidoIds[index % pedidoIds.length],
            this.pickAssigned(productoIds, index),
            (index % 10) + 1,
            (10 + (index % 90)).toFixed(2),
            '0.00',
            this.logisticaMonedaId,
            `LOTE-LOAD-${startIndex + index + 1}`,
            '2027-12-31',
        ]));
    }
    async seedDespachos(queryRunner, targetCount, pedidoIds) {
        this.ensureReferences(pedidoIds, 'despachos', 'pedidos');
        const existingIds = await this.getIds(queryRunner, 'despachos');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        await this.batchInsert(queryRunner, 'INSERT INTO despachos (id, "pedidoId", bodega, "horaSalida", "ventanaPrometidaInicio", "ventanaPrometidaFin") VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            pedidoIds[index % pedidoIds.length],
            `Bodega Load ${(index % 5) + 1}`,
            '2026-03-05 08:00:00',
            '2026-03-05 10:00:00',
            '2026-03-05 18:00:00',
        ]));
    }
    async seedDisponibilidadZona(queryRunner, targetCount, catalogoIds, productoIds) {
        this.ensureReferences(catalogoIds, 'disponibilidad_zona', 'catalogos');
        this.ensureReferences(productoIds, 'disponibilidad_zona', 'productos');
        const existingIds = await this.getIds(queryRunner, 'disponibilidad_zona');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        await this.batchInsert(queryRunner, 'INSERT INTO disponibilidad_zona (id, "catalogoId", "productoId", "cantidadDisponible", "ultimaActualizacion") VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            catalogoIds[index % catalogoIds.length],
            productoIds[index % productoIds.length],
            (index % 500) + 1,
            NOW,
        ]));
    }
    async seedNotasCredito(queryRunner, targetCount, pedidoIds) {
        this.ensureReferences(pedidoIds, 'notas_credito', 'pedidos');
        const existingIds = await this.getIds(queryRunner, 'notas_credito');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        const startIndex = existingIds.length;
        await this.batchInsert(queryRunner, 'INSERT INTO notas_credito (id, "pedidoId", "numeroDocumento", fecha, motivo, monto, "monedaId", evidencia) VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            pedidoIds[index % pedidoIds.length],
            `NC-LOAD-${String(startIndex + index + 1).padStart(4, '0')}`,
            '2026-03-01',
            this.motivosNotaCredito[index % this.motivosNotaCredito.length],
            (1 + (index % 50)).toFixed(2),
            this.logisticaMonedaId,
            `Evidencia load test ${startIndex + index + 1}`,
        ]));
    }
    async seedItemsInventario(queryRunner, targetCount, productoIds) {
        this.ensureReferences(productoIds, 'items_inventario', 'productos');
        const existingIds = await this.getIds(queryRunner, 'items_inventario');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return existingIds;
        const insertedIds = this.uuids(missingCount);
        await this.batchInsert(queryRunner, 'INSERT INTO items_inventario (id, "productoId", "tiendaId", cantidad, "precioVenta", "monedaId") VALUES', insertedIds.map((id, index) => [
            id,
            productoIds[index % productoIds.length],
            this.tiendaIds[index % this.tiendaIds.length],
            (index % 500) + 1,
            (5 + (index % 95)).toFixed(2),
            this.inventarioMonedaId,
        ]));
        return [...existingIds, ...insertedIds];
    }
    async seedRegistrosCompra(queryRunner, targetCount, itemInventarioIds, productoIds) {
        this.ensureReferences(itemInventarioIds, 'registros_compra_producto_tienda', 'items_inventario');
        this.ensureReferences(productoIds, 'registros_compra_producto_tienda', 'productos');
        const existingIds = await this.getIds(queryRunner, 'registros_compra_producto_tienda');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        await this.batchInsert(queryRunner, 'INSERT INTO registros_compra_producto_tienda (id, "tiendaId", "productoId", "compraId", "itemInventarioId", "fechaCompra", cantidad) VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            this.tiendaIds[index % this.tiendaIds.length],
            productoIds[index % productoIds.length],
            (0, crypto_1.randomUUID)(),
            itemInventarioIds[index % itemInventarioIds.length],
            this.hoursAgo(missingCount - index),
            (index % 100) + 1,
        ]));
    }
    async seedRegistrosVenta(queryRunner, targetCount, itemInventarioIds, productoIds) {
        this.ensureReferences(itemInventarioIds, 'registros_venta_producto_tienda', 'items_inventario');
        this.ensureReferences(productoIds, 'registros_venta_producto_tienda', 'productos');
        const existingIds = await this.getIds(queryRunner, 'registros_venta_producto_tienda');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        await this.batchInsert(queryRunner, 'INSERT INTO registros_venta_producto_tienda (id, "tiendaId", "productoId", "ventaId", "itemInventarioId", "fechaVenta", cantidad) VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            this.tiendaIds[index % this.tiendaIds.length],
            productoIds[index % productoIds.length],
            (0, crypto_1.randomUUID)(),
            itemInventarioIds[index % itemInventarioIds.length],
            this.hoursAgo(missingCount - index),
            (index % 50) + 1,
        ]));
    }
    async seedProductosExternos(queryRunner, targetCount) {
        const existingIds = await this.getIds(queryRunner, 'productos_externos');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return existingIds;
        const insertedIds = this.uuids(missingCount);
        const startIndex = existingIds.length;
        await this.batchInsert(queryRunner, 'INSERT INTO productos_externos (id, "tiendaId", "codigoBarras", nombre, categoria, "precioBase", "monedaId", cantidad) VALUES', insertedIds.map((id, index) => {
            const seq = startIndex + index + 1;
            return [
                id,
                this.tiendaIds[index % this.tiendaIds.length],
                `EXT-${8000000000000 + seq}`,
                `Producto Externo Load ${seq}`,
                this.categorias[index % this.categorias.length],
                (8 + (index % 50)).toFixed(2),
                this.inventarioMonedaId,
                (index % 100) + 1,
            ];
        }));
        return [...existingIds, ...insertedIds];
    }
    async seedVentas(queryRunner, targetCount) {
        const existingIds = await this.getIds(queryRunner, 'ventas');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return existingIds;
        const insertedIds = this.uuids(missingCount);
        await this.batchInsert(queryRunner, 'INSERT INTO ventas (id, "tiendaId", "fechaHora", total, "monedaId") VALUES', insertedIds.map((id, index) => [
            id,
            this.tiendaIds[index % this.tiendaIds.length],
            this.hoursAgo(missingCount - index),
            (10 + (index % 300)).toFixed(2),
            this.inventarioMonedaId,
        ]));
        return [...existingIds, ...insertedIds];
    }
    async seedItemsVenta(queryRunner, targetCount, ventaIds, productoExternoIds) {
        this.ensureReferences(ventaIds, 'items_venta', 'ventas');
        this.ensureReferences(productoExternoIds, 'items_venta', 'productos_externos');
        const existingIds = await this.getIds(queryRunner, 'items_venta');
        const missingCount = this.getMissingCount(existingIds.length, targetCount);
        if (missingCount === 0)
            return;
        await this.batchInsert(queryRunner, 'INSERT INTO items_venta (id, "ventaId", "productoExternoId", "productoId", cantidad, "precioUnitario", "monedaId") VALUES', this.uuids(missingCount).map((id, index) => [
            id,
            ventaIds[index % ventaIds.length],
            productoExternoIds[index % productoExternoIds.length],
            null,
            (index % 10) + 1,
            (5 + (index % 50)).toFixed(2),
            this.inventarioMonedaId,
        ]));
    }
    ensureReferences(ids, tableName, dependencyName) {
        if (ids.length === 0) {
            throw new Error(`Cannot seed ${tableName} without existing ${dependencyName} rows.`);
        }
    }
    getMissingCount(currentCount, targetCount) {
        return Math.max(targetCount - currentCount, 0);
    }
    async getIds(queryRunner, tableName) {
        const rows = (await queryRunner.query(`SELECT id FROM ${tableName} ORDER BY id`));
        return rows.map((row) => row.id);
    }
    async getCatalogoProductoPairs(queryRunner) {
        const rows = (await queryRunner.query('SELECT "catalogosId", "productosId" FROM "catalogos_productos_productos" ORDER BY "catalogosId", "productosId"'));
        return new Set(rows.map((row) => `${row.catalogosId}:${row.productosId}`));
    }
    buildMissingCatalogoProductoPairs(catalogoIds, productoIds, existingPairs, missingCount) {
        const rows = [];
        for (const catalogoId of catalogoIds) {
            for (const productoId of productoIds) {
                const key = `${catalogoId}:${productoId}`;
                if (existingPairs.has(key))
                    continue;
                existingPairs.add(key);
                rows.push([catalogoId, productoId]);
                if (rows.length === missingCount)
                    return rows;
            }
        }
        throw new Error(`Unable to generate ${missingCount} unique catalogo-producto rows with the available references.`);
    }
    async batchInsert(queryRunner, insertPrefix, rows, batchSize = 500) {
        if (rows.length === 0)
            return;
        for (let start = 0; start < rows.length; start += batchSize) {
            const batch = rows.slice(start, start + batchSize);
            const valueClauses = batch.map((row) => {
                const values = row.map((value) => {
                    if (value === null)
                        return 'NULL';
                    if (value === NOW)
                        return 'NOW()';
                    if (typeof value === 'number')
                        return String(value);
                    return `'${String(value).replace(/'/g, "''")}'`;
                });
                return `(${values.join(', ')})`;
            });
            await queryRunner.query(`${insertPrefix}\n${valueClauses.join(',\n')}`);
        }
    }
    uuids(count) {
        return Array.from({ length: count }, () => (0, crypto_1.randomUUID)());
    }
    daysFromNow(days) {
        return this.daysAgo(-days);
    }
    daysAgo(days) {
        return new Date(Date.now() - days * 86_400_000)
            .toISOString()
            .replace('T', ' ')
            .slice(0, 19);
    }
    hoursAgo(hours) {
        return new Date(Date.now() - hours * 3_600_000)
            .toISOString()
            .replace('T', ' ')
            .slice(0, 19);
    }
};
exports.DatabaseSeederService = DatabaseSeederService;
exports.DatabaseSeederService = DatabaseSeederService = DatabaseSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DatabaseSeederService);
//# sourceMappingURL=database-seeder.service.js.map