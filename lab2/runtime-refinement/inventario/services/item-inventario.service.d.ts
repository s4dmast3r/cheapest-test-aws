import { ProductoService } from '../../logistica/services/producto.service';
import { TiendaClientMock } from '../clients/tienda.client.mock';
import { CreateItemInventarioDto, ItemInventarioResponseDto, QueryItemInventarioDto, UpdateItemInventarioDto } from '../dtos';
import { ItemInventarioRepository } from '../repositories/item-inventario.repository';
export declare class ItemInventarioService {
    private readonly itemRepository;
    private readonly productoService;
    private readonly tiendaClient;
    constructor(itemRepository: ItemInventarioRepository, productoService: ProductoService, tiendaClient: TiendaClientMock);
    create(dto: CreateItemInventarioDto): Promise<ItemInventarioResponseDto>;
    findAll(query: QueryItemInventarioDto): Promise<ItemInventarioResponseDto[]>;
    findById(id: string): Promise<ItemInventarioResponseDto>;
    update(id: string, dto: UpdateItemInventarioDto): Promise<ItemInventarioResponseDto>;
    delete(id: string): Promise<void>;
    checkDisponibilidad(itemInventarioId: string, cantidadRequerida: number): Promise<boolean>;
    private mapToResponse;
}
