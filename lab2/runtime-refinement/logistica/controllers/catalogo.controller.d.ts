import { CatalogoResponseDto, CreateCatalogoDto, QueryCatalogoDto, UpdateCatalogoDto } from '../dtos';
import { CatalogoService } from '../services';
export declare class CatalogoController {
    private readonly catalogoService;
    constructor(catalogoService: CatalogoService);
    create(dto: CreateCatalogoDto): Promise<CatalogoResponseDto>;
    findAll(query: QueryCatalogoDto): Promise<CatalogoResponseDto[]>;
    findById(id: string): Promise<CatalogoResponseDto>;
    update(id: string, dto: UpdateCatalogoDto): Promise<CatalogoResponseDto>;
    delete(id: string): Promise<void>;
}
