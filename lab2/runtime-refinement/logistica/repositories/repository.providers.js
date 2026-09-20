"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryProviders = void 0;
const entities_1 = require("./entities");
exports.repositoryProviders = [
    {
        provide: 'CATALOGO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.Catalogo),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PRODUCTO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.Producto),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROMOCION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.Promocion),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PEDIDO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.Pedido),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'DESPACHO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.Despacho),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOTA_CREDITO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.NotaCredito),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'DISPONIBILIDAD_ZONA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.DisponibilidadZona),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=repository.providers.js.map