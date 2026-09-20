import { MotivoNotaCredito } from '../../repositories/entities';
export declare class NotaCreditoResponseDto {
    id: string;
    pedidoId: string;
    numeroDocumento: string;
    fecha: Date;
    motivo: MotivoNotaCredito;
    monto: number;
    monedaId: string;
    evidencia?: string;
    createdAt: Date;
    updatedAt: Date;
}
