import { CreateRegistroVentaDto, QueryRegistroVentaDto, RegistroVentaResponseDto, UpdateRegistroVentaDto } from '../dtos';
import { RegistroVentaService } from '../services/registro-venta.service';
export declare class RegistroVentaController {
    private readonly registroService;
    constructor(registroService: RegistroVentaService);
    create(dto: CreateRegistroVentaDto): Promise<RegistroVentaResponseDto>;
    findAll(query: QueryRegistroVentaDto): Promise<RegistroVentaResponseDto[]>;
    findById(id: string): Promise<RegistroVentaResponseDto>;
    update(id: string, dto: UpdateRegistroVentaDto): Promise<RegistroVentaResponseDto>;
    delete(id: string): Promise<void>;
}
