import { Pedido } from './pedido.entity';
export declare enum MotivoNotaCredito {
    PRODUCTO_VENCIDO = "productoVencido",
    PRODUCTO_EQUIVOCADO = "productoEquivocado",
    DANO_EN_TRANSPORTE = "danoEnTransporte"
}
export declare class NotaCredito {
    id: string;
    pedidoId: string;
    numeroDocumento: string;
    fecha: Date;
    motivo: MotivoNotaCredito;
    monto: number;
    monedaId: string;
    evidencia: string;
    createdAt: Date;
    updatedAt: Date;
    pedido: Pedido;
}
