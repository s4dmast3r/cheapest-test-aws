import { CreateItemInventarioDto, ItemInventarioResponseDto, QueryItemInventarioDto, UpdateItemInventarioDto } from '../dtos';
import { ItemInventarioService } from '../services';
export declare class ItemInventarioController {
    private readonly itemService;
    constructor(itemService: ItemInventarioService);
    create(dto: CreateItemInventarioDto): Promise<ItemInventarioResponseDto>;
    findAll(query: QueryItemInventarioDto): Promise<ItemInventarioResponseDto[]>;
    findById(id: string): Promise<ItemInventarioResponseDto>;
    update(id: string, dto: UpdateItemInventarioDto): Promise<ItemInventarioResponseDto>;
    delete(id: string): Promise<void>;
}
