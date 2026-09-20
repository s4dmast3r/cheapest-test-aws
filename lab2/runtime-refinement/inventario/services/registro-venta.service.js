"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroVentaService = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("../../logistica/services/producto.service");
const tienda_client_mock_1 = require("../clients/tienda.client.mock");
const item_inventario_repository_1 = require("../repositories/item-inventario.repository");
const registro_venta_repository_1 = require("../repositories/registro-venta.repository");
let RegistroVentaService = class RegistroVentaService {
    registroRepository;
    itemRepository;
    productoService;
    tiendaClient;
    constructor(registroRepository, itemRepository, productoService, tiendaClient) {
        this.registroRepository = registroRepository;
        this.itemRepository = itemRepository;
        this.productoService = productoService;
        this.tiendaClient = tiendaClient;
    }
    async create(dto) {
        const productoExists = await this.productoService.exists(dto.productoId);
        if (!productoExists) {
            throw new common_1.BadRequestException(`Producto con id ${dto.productoId} no existe`);
        }
        const tiendaExists = await this.tiendaClient.exists(dto.tiendaId);
        if (!tiendaExists) {
            throw new common_1.BadRequestException(`Tienda con id ${dto.tiendaId} no existe`);
        }
        const item = await this.itemRepository.findById(dto.itemInventarioId);
        if (!item) {
            throw new common_1.BadRequestException(`ItemInventario con id ${dto.itemInventarioId} no encontrado`);
        }
        if (item.productoId !== dto.productoId) {
            throw new common_1.BadRequestException(`El itemInventario ${dto.itemInventarioId} no pertenece al producto ${dto.productoId}`);
        }
        if (item.tiendaId !== dto.tiendaId) {
            throw new common_1.BadRequestException(`El itemInventario ${dto.itemInventarioId} no pertenece a la tienda ${dto.tiendaId}`);
        }
        if (item.cantidad < dto.cantidad) {
            throw new common_1.BadRequestException(`Cantidad insuficiente en inventario. Disponible: ${item.cantidad}, Requerido: ${dto.cantidad}`);
        }
        const registro = await this.registroRepository.create(dto);
        await this.itemRepository.decrementCantidad(dto.itemInventarioId, dto.cantidad);
        return this.mapToResponse(registro);
    }
    async findAll(query) {
        const registros = await this.registroRepository.findAll(query);
        return registros.map((registro) => this.mapToResponse(registro));
    }
    async findById(id) {
        const registro = await this.registroRepository.findById(id);
        if (!registro) {
            throw new common_1.NotFoundException(`RegistroVenta con id ${id} no encontrado`);
        }
        return this.mapToResponse(registro);
    }
    async update(id, dto) {
        const registro = await this.registroRepository.findById(id);
        if (!registro) {
            throw new common_1.NotFoundException(`RegistroVenta con id ${id} no encontrado`);
        }
        const updatedRegistro = await this.registroRepository.update(id, dto);
        return this.mapToResponse(updatedRegistro);
    }
    async delete(id) {
        const registro = await this.registroRepository.findById(id);
        if (!registro) {
            throw new common_1.NotFoundException(`RegistroVenta con id ${id} no encontrado`);
        }
        await this.itemRepository.incrementCantidad(registro.itemInventarioId, registro.cantidad);
        await this.registroRepository.delete(id);
    }
    mapToResponse(registro) {
        return {
            id: registro.id,
            tiendaId: registro.tiendaId,
            productoId: registro.productoId,
            ventaId: registro.ventaId,
            itemInventarioId: registro.itemInventarioId,
            fechaVenta: registro.fechaVenta,
            cantidad: registro.cantidad,
            createdAt: registro.createdAt,
            updatedAt: registro.updatedAt,
        };
    }
};
exports.RegistroVentaService = RegistroVentaService;
exports.RegistroVentaService = RegistroVentaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [registro_venta_repository_1.RegistroVentaRepository,
        item_inventario_repository_1.ItemInventarioRepository,
        producto_service_1.ProductoService,
        tienda_client_mock_1.TiendaClientMock])
], RegistroVentaService);
//# sourceMappingURL=registro-venta.service.js.map