import { RegistroCompraProductoTienda } from './registro-compra-producto-tienda.entity';
import { RegistroVentaProductoTienda } from './registro-venta-producto-tienda.entity';
export declare class ItemInventario {
    id: string;
    productoId: string;
    tiendaId: string;
    cantidad: number;
    precioVenta: number;
    monedaId: string;
    createdAt: Date;
    updatedAt: Date;
    registrosVenta: RegistroVentaProductoTienda[];
    registrosCompra: RegistroCompraProductoTienda[];
}
