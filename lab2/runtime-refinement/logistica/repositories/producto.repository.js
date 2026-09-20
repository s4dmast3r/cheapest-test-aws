"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ProductoRepository = class ProductoRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(producto) {
        const newProducto = this.repository.create(producto);
        return this.repository.save(newProducto);
    }
    async findAll(query) {
        const queryBuilder = this.repository.createQueryBuilder('producto');
        if (query.codigoInterno) {
            queryBuilder.andWhere('producto.codigoInterno = :codigoInterno', {
                codigoInterno: query.codigoInterno,
            });
        }
        if (query.codigoBarras) {
            queryBuilder.andWhere('producto.codigoBarras = :codigoBarras', {
                codigoBarras: query.codigoBarras,
            });
        }
        if (query.categoria) {
            queryBuilder.andWhere('producto.categoria = :categoria', {
                categoria: query.categoria,
            });
        }
        return queryBuilder.getMany();
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async update(id, updates) {
        await this.repository.update(id, updates);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
    async findProductosDisponiblesParaTendero(tiendaId, zona) {
        const now = new Date();
        return this.repository
            .createQueryBuilder('producto')
            .where(`EXISTS (
          SELECT 1
          FROM items_pedido ip
          JOIN pedidos p ON p.id = ip."pedidoId"
          WHERE ip."productoId" = producto.id
            AND p."tiendaId" = :tiendaId
        )`, { tiendaId })
            .andWhere(`EXISTS (
          SELECT 1
          FROM promociones promo
          JOIN promocion_tiendas pt ON pt."promocionId" = promo.id
          WHERE promo."productoId" = producto.id
            AND promo.inicio <= :now
            AND promo.fin >= :now
            AND pt."tiendaId" = :tiendaId
        )`, { now, tiendaId })
            .andWhere(`EXISTS (
          SELECT 1
          FROM disponibilidad_zona dz
          JOIN catalogos cat ON cat.id = dz."catalogoId"
          WHERE dz."productoId" = producto.id
            AND dz."cantidadDisponible" > 0
            AND cat.zona = :zona
        )`, { zona })
            .getMany();
    }
};
exports.ProductoRepository = ProductoRepository;
exports.ProductoRepository = ProductoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCTO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductoRepository);
//# sourceMappingURL=producto.repository.js.map