import { ItemInventario } from './item-inventario.entity';
export declare class RegistroCompraProductoTienda {
    id: string;
    tiendaId: string;
    productoId: string;
    compraId: string;
    itemInventarioId: string;
    fechaCompra: Date;
    cantidad: number;
    createdAt: Date;
    updatedAt: Date;
    itemInventario: ItemInventario;
}
