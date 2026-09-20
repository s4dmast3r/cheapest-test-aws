import { ItemInventario } from './item-inventario.entity';
export declare class RegistroVentaProductoTienda {
    id: string;
    tiendaId: string;
    productoId: string;
    ventaId: string;
    itemInventarioId: string;
    fechaVenta: Date;
    cantidad: number;
    createdAt: Date;
    updatedAt: Date;
    itemInventario: ItemInventario;
}
