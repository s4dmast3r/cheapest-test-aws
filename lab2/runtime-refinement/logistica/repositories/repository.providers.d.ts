import { DataSource } from 'typeorm';
import { Catalogo, Despacho, DisponibilidadZona, NotaCredito, Pedido, Producto, Promocion } from './entities';
export declare const repositoryProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Catalogo>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Producto>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Promocion>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Pedido>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Despacho>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NotaCredito>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<DisponibilidadZona>;
    inject: string[];
})[];
