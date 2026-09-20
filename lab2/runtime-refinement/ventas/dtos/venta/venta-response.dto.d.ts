import { ItemVentaResponseDto } from '../item-venta';
export declare class VentaResponseDto {
    id: string;
    tiendaId: string;
    fechaHora: Date;
    total: number;
    monedaId: string;
    items: ItemVentaResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
