import { DataSource } from 'typeorm';
import { ItemInventario, RegistroCompraProductoTienda, RegistroVentaProductoTienda } from './entities';
export declare const repositoryProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ItemInventario>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<RegistroCompraProductoTienda>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<RegistroVentaProductoTienda>;
    inject: string[];
})[];
