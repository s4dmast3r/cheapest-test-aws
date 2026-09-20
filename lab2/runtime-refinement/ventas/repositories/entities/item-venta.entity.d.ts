import { ProductoExterno } from './producto-externo.entity';
import { Venta } from './venta.entity';
export declare class ItemVenta {
    id: string;
    ventaId: string;
    productoExternoId: string | null;
    productoId: string | null;
    cantidad: number;
    precioUnitario: number;
    monedaId: string;
    createdAt: Date;
    updatedAt: Date;
    venta: Venta;
    productoExterno: ProductoExterno;
}
