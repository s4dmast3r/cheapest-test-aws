import { Repository } from 'typeorm';
import { QueryDisponibilidadZonaDto } from '../dtos';
import { DisponibilidadZona } from './entities';
export declare class DisponibilidadZonaRepository {
    private repository;
    constructor(repository: Repository<DisponibilidadZona>);
    create(disponibilidad: Partial<DisponibilidadZona>): Promise<DisponibilidadZona>;
    findAll(query: QueryDisponibilidadZonaDto): Promise<DisponibilidadZona[]>;
    findById(id: string): Promise<DisponibilidadZona | null>;
    findByCatalogoAndProducto(catalogoId: string, productoId: string): Promise<DisponibilidadZona | null>;
    update(id: string, updates: Partial<DisponibilidadZona>): Promise<DisponibilidadZona | null>;
    delete(id: string): Promise<boolean>;
}
