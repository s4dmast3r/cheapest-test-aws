import { CreateDisponibilidadZonaDto, DisponibilidadZonaResponseDto, QueryDisponibilidadZonaDto, UpdateDisponibilidadZonaDto } from '../dtos';
import { DisponibilidadZonaService } from '../services';
export declare class DisponibilidadZonaController {
    private readonly disponibilidadZonaService;
    constructor(disponibilidadZonaService: DisponibilidadZonaService);
    create(dto: CreateDisponibilidadZonaDto): Promise<DisponibilidadZonaResponseDto>;
    findAll(query: QueryDisponibilidadZonaDto): Promise<DisponibilidadZonaResponseDto[]>;
    findById(id: string): Promise<DisponibilidadZonaResponseDto>;
    update(id: string, dto: UpdateDisponibilidadZonaDto): Promise<DisponibilidadZonaResponseDto>;
    delete(id: string): Promise<void>;
}
