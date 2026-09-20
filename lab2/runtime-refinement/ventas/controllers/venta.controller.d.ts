import { CreateVentaDto, QueryVentaDto, UpdateVentaDto, VentaResponseDto } from '../dtos';
import { VentaService } from '../services';
export declare class VentaController {
    private readonly ventaService;
    constructor(ventaService: VentaService);
    create(dto: CreateVentaDto): Promise<VentaResponseDto>;
    findAll(query: QueryVentaDto): Promise<VentaResponseDto[]>;
    findById(id: string): Promise<VentaResponseDto>;
    update(id: string, dto: UpdateVentaDto): Promise<VentaResponseDto>;
    delete(id: string): Promise<void>;
}
