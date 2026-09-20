import { ProductoService } from '../../logistica/services/producto.service';
import { TiendaClientMock } from '../clients/tienda.client.mock';
import { CreateRegistroCompraDto, QueryRegistroCompraDto, RegistroCompraResponseDto, UpdateRegistroCompraDto } from '../dtos';
import { ItemInventarioRepository } from '../repositories/item-inventario.repository';
import { RegistroCompraRepository } from '../repositories/registro-compra.repository';
export declare class RegistroCompraService {
    private readonly registroRepository;
    private readonly itemRepository;
    private readonly productoService;
    private readonly tiendaClient;
    constructor(registroRepository: RegistroCompraRepository, itemRepository: ItemInventarioRepository, productoService: ProductoService, tiendaClient: TiendaClientMock);
    create(dto: CreateRegistroCompraDto): Promise<RegistroCompraResponseDto>;
    findAll(query: QueryRegistroCompraDto): Promise<RegistroCompraResponseDto[]>;
    findById(id: string): Promise<RegistroCompraResponseDto>;
    update(id: string, dto: UpdateRegistroCompraDto): Promise<RegistroCompraResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
