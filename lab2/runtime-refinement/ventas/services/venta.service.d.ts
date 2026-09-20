import { ProductoService } from '../../logistica/services/producto.service';
import { TiendaClientMock } from '../clients';
import { CreateVentaDto, QueryVentaDto, UpdateVentaDto, VentaResponseDto } from '../dtos';
import { ProductoExternoRepository } from '../repositories/producto-externo.repository';
import { VentaRepository } from '../repositories/venta.repository';
export declare class VentaService {
    private readonly ventaRepository;
    private readonly productoExternoRepository;
    private readonly tiendaClient;
    private readonly productoService;
    constructor(ventaRepository: VentaRepository, productoExternoRepository: ProductoExternoRepository, tiendaClient: TiendaClientMock, productoService: ProductoService);
    create(dto: CreateVentaDto): Promise<VentaResponseDto>;
    findAll(query: QueryVentaDto): Promise<VentaResponseDto[]>;
    findById(id: string): Promise<VentaResponseDto>;
    update(id: string, dto: UpdateVentaDto): Promise<VentaResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
    private mapItemToResponse;
}
