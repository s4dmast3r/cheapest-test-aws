import { CreateNotaCreditoDto, NotaCreditoResponseDto, QueryNotaCreditoDto, UpdateNotaCreditoDto } from '../dtos';
import { NotaCreditoRepository, PedidoRepository } from '../repositories';
export declare class NotaCreditoService {
    private readonly notaCreditoRepository;
    private readonly pedidoRepository;
    constructor(notaCreditoRepository: NotaCreditoRepository, pedidoRepository: PedidoRepository);
    create(dto: CreateNotaCreditoDto): Promise<NotaCreditoResponseDto>;
    findAll(query: QueryNotaCreditoDto): Promise<NotaCreditoResponseDto[]>;
    findById(id: string): Promise<NotaCreditoResponseDto>;
    update(id: string, dto: UpdateNotaCreditoDto): Promise<NotaCreditoResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
