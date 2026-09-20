import { MotivoNotaCredito } from '../../repositories/entities';
export declare class CreateNotaCreditoDto {
    pedidoId: string;
    numeroDocumento: string;
    fecha: Date;
    motivo: MotivoNotaCredito;
    monto: number;
    monedaId: string;
    evidencia?: string;
}
