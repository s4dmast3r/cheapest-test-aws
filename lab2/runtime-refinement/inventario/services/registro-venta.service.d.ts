import { ProductoService } from '../../logistica/services/producto.service';
import { TiendaClientMock } from '../clients/tienda.client.mock';
import { CreateRegistroVentaDto, QueryRegistroVentaDto, RegistroVentaResponseDto, UpdateRegistroVentaDto } from '../dtos';
import { ItemInventarioRepository } from '../repositories/item-inventario.repository';
import { RegistroVentaRepository } from '../repositories/registro-venta.repository';
export declare class RegistroVentaService {
    private readonly registroRepository;
    private readonly itemRepository;
    private readonly productoService;
    private readonly tiendaClient;
    constructor(registroRepository: RegistroVentaRepository, itemRepository: ItemInventarioRepository, productoService: ProductoService, tiendaClient: TiendaClientMock);
    create(dto: CreateRegistroVentaDto): Promise<RegistroVentaResponseDto>;
    findAll(query: QueryRegistroVentaDto): Promise<RegistroVentaResponseDto[]>;
    findById(id: string): Promise<RegistroVentaResponseDto>;
    update(id: string, dto: UpdateRegistroVentaDto): Promise<RegistroVentaResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
