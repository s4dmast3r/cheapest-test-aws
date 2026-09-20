import { Catalogo } from './catalogo.entity';
import { DisponibilidadZona } from './disponibilidad-zona.entity';
import { ItemPedido } from './item-pedido.entity';
import { Promocion } from './promocion.entity';
export declare class Producto {
    id: string;
    codigoInterno: string;
    codigoBarras: string;
    nombre: string;
    marca: string;
    categoria: string;
    presentacion: string;
    precioBase: number;
    monedaId: string;
    createdAt: Date;
    updatedAt: Date;
    catalogos: Catalogo[];
    disponibilidades: DisponibilidadZona[];
    itemsPedido: ItemPedido[];
    promociones: Promocion[];
}
