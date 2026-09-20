"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryProviders = void 0;
const item_venta_entity_1 = require("./entities/item-venta.entity");
const producto_externo_entity_1 = require("./entities/producto-externo.entity");
const venta_entity_1 = require("./entities/venta.entity");
exports.repositoryProviders = [
    {
        provide: 'PRODUCTO_EXTERNO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(producto_externo_entity_1.ProductoExterno),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'VENTA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(venta_entity_1.Venta),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ITEM_VENTA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(item_venta_entity_1.ItemVenta),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=repository.providers.js.map