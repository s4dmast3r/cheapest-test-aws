import { Despacho } from './despacho.entity';
import { ItemPedido } from './item-pedido.entity';
import { NotaCredito } from './nota-credito.entity';
export declare enum EstadoPedido {
    CREADO = "creado",
    APROBADO = "aprobado",
    EN_ALISTAMIENTO = "enAlistamiento",
    ALISTADO = "alistado",
    DESPACHADO = "despachado",
    ENTREGADO = "entregado",
    CANCELADO = "cancelado",
    DEVUELTO = "devuelto"
}
export declare class Pedido {
    id: string;
    identificador: string;
    tiendaId: string;
    fechaHoraCreacion: Date;
    montoTotal: number;
    monedaId: string;
    estado: EstadoPedido;
    createdAt: Date;
    updatedAt: Date;
    items: ItemPedido[];
    despachos: Despacho[];
    notasCredito: NotaCredito[];
}
