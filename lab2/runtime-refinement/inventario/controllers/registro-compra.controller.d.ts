import { CreateRegistroCompraDto, QueryRegistroCompraDto, RegistroCompraResponseDto, UpdateRegistroCompraDto } from '../dtos';
import { RegistroCompraService } from '../services/registro-compra.service';
export declare class RegistroCompraController {
    private readonly registroService;
    constructor(registroService: RegistroCompraService);
    create(dto: CreateRegistroCompraDto): Promise<RegistroCompraResponseDto>;
    findAll(query: QueryRegistroCompraDto): Promise<RegistroCompraResponseDto[]>;
    findById(id: string): Promise<RegistroCompraResponseDto>;
    update(id: string, dto: UpdateRegistroCompraDto): Promise<RegistroCompraResponseDto>;
    delete(id: string): Promise<void>;
}
