import { DataSource } from 'typeorm';
import { ItemVenta } from './entities/item-venta.entity';
import { ProductoExterno } from './entities/producto-externo.entity';
import { Venta } from './entities/venta.entity';
export declare const repositoryProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ProductoExterno>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Venta>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ItemVenta>;
    inject: string[];
})[];
