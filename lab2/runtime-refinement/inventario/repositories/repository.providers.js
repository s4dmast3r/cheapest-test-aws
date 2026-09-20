"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryProviders = void 0;
const entities_1 = require("./entities");
exports.repositoryProviders = [
    {
        provide: 'ITEM_INVENTARIO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.ItemInventario),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'REGISTRO_COMPRA_PRODUCTO_TIENDA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.RegistroCompraProductoTienda),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'REGISTRO_VENTA_PRODUCTO_TIENDA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(entities_1.RegistroVentaProductoTienda),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=repository.providers.js.map