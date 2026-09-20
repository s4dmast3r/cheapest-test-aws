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
exports.PedidoService = void 0;
const common_1 = require("@nestjs/common");
const clients_1 = require("../clients");
const repositories_1 = require("../repositories");
let PedidoService = class PedidoService {
    pedidoRepository;
    productoRepository;
    tiendaClient;
    constructor(pedidoRepository, productoRepository, tiendaClient) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
        this.tiendaClient = tiendaClient;
    }
    async create(dto) {
        const tiendaExists = await this.tiendaClient.exists(dto.tiendaId);
        if (!tiendaExists) {
            throw new common_1.BadRequestException(`Tienda con id ${dto.tiendaId} no existe`);
        }
        for (const item of dto.items) {
            const producto = await this.productoRepository.findById(item.productoId);
            if (!producto) {
                throw new common_1.BadRequestException(`Producto con id ${item.productoId} no existe`);
            }
        }
        const pedidoData = {
            identificador: dto.identificador,
            tiendaId: dto.tiendaId,
            fechaHoraCreacion: dto.fechaHoraCreacion,
            montoTotal: dto.montoTotal,
            monedaId: dto.monedaId,
            estado: dto.estado,
            items: dto.items,
        };
        const pedido = await this.pedidoRepository.create(pedidoData);
        return this.mapToResponse(pedido);
    }
    async findAll(query) {
        const pedidos = await this.pedidoRepository.findAll(query);
        return pedidos.map((pedido) => this.mapToResponse(pedido));
    }
    async findById(id) {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        return this.mapToResponse(pedido);
    }
    async update(id, dto) {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        const updatedPedido = await this.pedidoRepository.update(id, dto);
        return this.mapToResponse(updatedPedido);
    }
    async delete(id) {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        await this.pedidoRepository.delete(id);
    }
    mapToResponse(pedido) {
        return {
            id: pedido.id,
            identificador: pedido.identificador,
            tiendaId: pedido.tiendaId,
            fechaHoraCreacion: pedido.fechaHoraCreacion,
            montoTotal: pedido.montoTotal,
            monedaId: pedido.monedaId,
            estado: pedido.estado,
            items: pedido.items?.map((item) => this.mapItemToResponse(item)),
            createdAt: pedido.createdAt,
            updatedAt: pedido.updatedAt,
        };
    }
    mapItemToResponse(item) {
        return {
            id: item.id,
            pedidoId: item.pedidoId,
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento,
            monedaId: item.monedaId,
            lote: item.lote,
            fechaVencimiento: item.fechaVencimiento,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        };
    }
};
exports.PedidoService = PedidoService;
exports.PedidoService = PedidoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.PedidoRepository,
        repositories_1.ProductoRepository,
        clients_1.TiendaClientMock])
], PedidoService);
//# sourceMappingURL=pedido.service.js.map