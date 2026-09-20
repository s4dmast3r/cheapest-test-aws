import { CreateDisponibilidadZonaDto, DisponibilidadZonaResponseDto, QueryDisponibilidadZonaDto, UpdateDisponibilidadZonaDto } from '../dtos';
import { CatalogoRepository, DisponibilidadZonaRepository, ProductoRepository } from '../repositories';
export declare class DisponibilidadZonaService {
    private readonly disponibilidadZonaRepository;
    private readonly catalogoRepository;
    private readonly productoRepository;
    constructor(disponibilidadZonaRepository: DisponibilidadZonaRepository, catalogoRepository: CatalogoRepository, productoRepository: ProductoRepository);
    create(dto: CreateDisponibilidadZonaDto): Promise<DisponibilidadZonaResponseDto>;
    findAll(query: QueryDisponibilidadZonaDto): Promise<DisponibilidadZonaResponseDto[]>;
    findById(id: string): Promise<DisponibilidadZonaResponseDto>;
    update(id: string, dto: UpdateDisponibilidadZonaDto): Promise<DisponibilidadZonaResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
