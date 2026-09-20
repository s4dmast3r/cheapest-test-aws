import { TiendaClientMock } from '../clients';
import { CatalogoResponseDto, CreateCatalogoDto, QueryCatalogoDto, UpdateCatalogoDto } from '../dtos';
import { CatalogoRepository } from '../repositories';
export declare class CatalogoService {
    private readonly catalogoRepository;
    private readonly tiendaClient;
    constructor(catalogoRepository: CatalogoRepository, tiendaClient: TiendaClientMock);
    create(dto: CreateCatalogoDto): Promise<CatalogoResponseDto>;
    findAll(query: QueryCatalogoDto): Promise<CatalogoResponseDto[]>;
    findById(id: string): Promise<CatalogoResponseDto>;
    update(id: string, dto: UpdateCatalogoDto): Promise<CatalogoResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
