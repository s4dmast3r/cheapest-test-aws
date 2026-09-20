import { CreateDespachoDto, DespachoResponseDto, QueryDespachoDto, UpdateDespachoDto } from '../dtos';
import { DespachoRepository, PedidoRepository } from '../repositories';
export declare class DespachoService {
    private readonly despachoRepository;
    private readonly pedidoRepository;
    constructor(despachoRepository: DespachoRepository, pedidoRepository: PedidoRepository);
    create(dto: CreateDespachoDto): Promise<DespachoResponseDto>;
    findAll(query: QueryDespachoDto): Promise<DespachoResponseDto[]>;
    findById(id: string): Promise<DespachoResponseDto>;
    update(id: string, dto: UpdateDespachoDto): Promise<DespachoResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
