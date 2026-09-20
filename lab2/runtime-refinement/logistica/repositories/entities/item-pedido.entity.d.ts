import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';
export declare class ItemPedido {
    id: string;
    pedidoId: string;
    productoId: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    monedaId: string;
    lote: string;
    fechaVencimiento: string;
    createdAt: Date;
    updatedAt: Date;
    pedido: Pedido;
    producto: Producto;
}
