import { MotivoNotaCredito } from '../../repositories/entities';
export declare class UpdateNotaCreditoDto {
    fecha?: Date;
    motivo?: MotivoNotaCredito;
    monto?: number;
    evidencia?: string;
}
