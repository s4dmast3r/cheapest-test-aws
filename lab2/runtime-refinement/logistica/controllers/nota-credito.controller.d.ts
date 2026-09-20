import { CreateNotaCreditoDto, NotaCreditoResponseDto, QueryNotaCreditoDto, UpdateNotaCreditoDto } from '../dtos';
import { NotaCreditoService } from '../services';
export declare class NotaCreditoController {
    private readonly notaCreditoService;
    constructor(notaCreditoService: NotaCreditoService);
    create(dto: CreateNotaCreditoDto): Promise<NotaCreditoResponseDto>;
    findAll(query: QueryNotaCreditoDto): Promise<NotaCreditoResponseDto[]>;
    findById(id: string): Promise<NotaCreditoResponseDto>;
    update(id: string, dto: UpdateNotaCreditoDto): Promise<NotaCreditoResponseDto>;
    delete(id: string): Promise<void>;
}
