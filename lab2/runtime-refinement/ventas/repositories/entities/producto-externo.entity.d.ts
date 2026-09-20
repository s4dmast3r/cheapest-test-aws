import { ItemVenta } from './item-venta.entity';
export declare class ProductoExterno {
    id: string;
    tiendaId: string;
    codigoBarras: string;
    nombre: string;
    categoria: string;
    precioBase: number;
    monedaId: string;
    cantidad: number;
    createdAt: Date;
    updatedAt: Date;
    itemsVenta: ItemVenta[];
}
