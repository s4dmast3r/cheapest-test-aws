import { Producto } from './producto.entity';
import { PromocionTienda } from './promocion-tienda.entity';
export declare class Promocion {
    id: string;
    nombre: string;
    precioPromocional: number;
    monedaId: string;
    productoId: string;
    inicio: Date;
    fin: Date;
    restricciones: number;
    createdAt: Date;
    updatedAt: Date;
    producto: Producto;
    tiendas: PromocionTienda[];
}
