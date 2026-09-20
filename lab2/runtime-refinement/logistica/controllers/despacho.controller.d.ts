import { CreateDespachoDto, DespachoResponseDto, QueryDespachoDto, UpdateDespachoDto } from '../dtos';
import { DespachoService } from '../services';
export declare class DespachoController {
    private readonly despachoService;
    constructor(despachoService: DespachoService);
    create(dto: CreateDespachoDto): Promise<DespachoResponseDto>;
    findAll(query: QueryDespachoDto): Promise<DespachoResponseDto[]>;
    findById(id: string): Promise<DespachoResponseDto>;
    update(id: string, dto: UpdateDespachoDto): Promise<DespachoResponseDto>;
    delete(id: string): Promise<void>;
}
