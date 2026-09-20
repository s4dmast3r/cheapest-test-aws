import { EstadoPedido } from '../../repositories/entities';
export declare class CreateItemPedidoDto {
    productoId: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    monedaId: string;
    lote?: string;
    fechaVencimiento?: string;
}
export declare class CreatePedidoDto {
    identificador: string;
    tiendaId: string;
    fechaHoraCreacion: Date;
    montoTotal: number;
    monedaId: string;
    estado?: EstadoPedido;
    items: CreateItemPedidoDto[];
}
