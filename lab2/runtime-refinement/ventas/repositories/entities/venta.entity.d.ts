import { ItemVenta } from './item-venta.entity';
export declare class Venta {
    id: string;
    tiendaId: string;
    fechaHora: Date;
    total: number;
    monedaId: string;
    createdAt: Date;
    updatedAt: Date;
    items: ItemVenta[];
}
