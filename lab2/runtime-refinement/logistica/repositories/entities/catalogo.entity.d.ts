import { Producto } from './producto.entity';
export declare class Catalogo {
    id: string;
    tiendaId: string;
    vigenciaDesde: Date;
    vigenciaHasta: Date;
    zona: string;
    createdAt: Date;
    updatedAt: Date;
    productos: Producto[];
}
