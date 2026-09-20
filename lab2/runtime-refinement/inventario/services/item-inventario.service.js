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
exports.ItemInventarioService = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("../../logistica/services/producto.service");
const tienda_client_mock_1 = require("../clients/tienda.client.mock");
const item_inventario_repository_1 = require("../repositories/item-inventario.repository");
let ItemInventarioService = class ItemInventarioService {
    itemRepository;
    productoService;
    tiendaClient;
    constructor(itemRepository, productoService, tiendaClient) {
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
        const item = await this.itemRepository.create(dto);
        return this.mapToResponse(item);
    }
    async findAll(query) {
        const items = await this.itemRepository.findAll(query);
        return items.map((item) => this.mapToResponse(item));
    }
    async findById(id) {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new common_1.NotFoundException(`ItemInventario con id ${id} no encontrado`);
        }
        return this.mapToResponse(item);
    }
    async update(id, dto) {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new common_1.NotFoundException(`ItemInventario con id ${id} no encontrado`);
        }
        const updatedItem = await this.itemRepository.update(id, dto);
        return this.mapToResponse(updatedItem);
    }
    async delete(id) {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new common_1.NotFoundException(`ItemInventario con id ${id} no encontrado`);
        }
        await this.itemRepository.delete(id);
    }
    async checkDisponibilidad(itemInventarioId, cantidadRequerida) {
        const item = await this.itemRepository.findById(itemInventarioId);
        if (!item) {
            return false;
        }
        return item.cantidad >= cantidadRequerida;
    }
    mapToResponse(item) {
        return {
            id: item.id,
            productoId: item.productoId,
            tiendaId: item.tiendaId,
            cantidad: item.cantidad,
            precioVenta: parseFloat(item.precioVenta.toString()),
            monedaId: item.monedaId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        };
    }
};
exports.ItemInventarioService = ItemInventarioService;
exports.ItemInventarioService = ItemInventarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [item_inventario_repository_1.ItemInventarioRepository,
        producto_service_1.ProductoService,
        tienda_client_mock_1.TiendaClientMock])
], ItemInventarioService);
//# sourceMappingURL=item-inventario.service.js.map