import { ItemVentaDto } from '../item-venta';
export declare class CreateVentaDto {
    tiendaId: string;
    fechaHora: Date;
    monedaId: string;
    items: ItemVentaDto[];
}
