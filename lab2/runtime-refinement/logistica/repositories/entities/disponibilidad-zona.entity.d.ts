import { Catalogo } from './catalogo.entity';
import { Producto } from './producto.entity';
export declare class DisponibilidadZona {
    id: string;
    catalogoId: string;
    productoId: string;
    cantidadDisponible: number;
    ultimaActualizacion: Date;
    createdAt: Date;
    updatedAt: Date;
    catalogo: Catalogo;
    producto: Producto;
}
