import { Pedido } from './pedido.entity';
export declare class Despacho {
    id: string;
    pedidoId: string;
    bodega: string;
    horaSalida: Date;
    ventanaPrometidaInicio: Date;
    ventanaPrometidaFin: Date;
    createdAt: Date;
    updatedAt: Date;
    pedido: Pedido;
}
