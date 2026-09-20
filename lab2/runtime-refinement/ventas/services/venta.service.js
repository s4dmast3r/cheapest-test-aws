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
exports.VentaService = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("../../logistica/services/producto.service");
const clients_1 = require("../clients");
const producto_externo_repository_1 = require("../repositories/producto-externo.repository");
const venta_repository_1 = require("../repositories/venta.repository");
let VentaService = class VentaService {
    ventaRepository;
    productoExternoRepository;
    tiendaClient;
    productoService;
    constructor(ventaRepository, productoExternoRepository, tiendaClient, productoService) {
        this.ventaRepository = ventaRepository;
        this.productoExternoRepository = productoExternoRepository;
        this.tiendaClient = tiendaClient;
        this.productoService = productoService;
    }
    async create(dto) {
        const tiendaExists = await this.tiendaClient.exists(dto.tiendaId);
        if (!tiendaExists) {
            throw new common_1.BadRequestException(`Tienda con id ${dto.tiendaId} no existe`);
        }
        for (const item of dto.items) {
            const productoExists = await this.productoExternoRepository.findById(item.productoExternoId);
            if (!productoExists) {
                throw new common_1.BadRequestException(`ProductoExterno con id ${item.productoExternoId} no existe`);
            }
            if (item.productoId) {
                try {
                    await this.productoService.findById(item.productoId);
                }
                catch {
                    throw new common_1.BadRequestException(`Producto con id ${item.productoId} no existe`);
                }
            }
        }
        const total = dto.items.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);
        const venta = await this.ventaRepository.create({
            tiendaId: dto.tiendaId,
            fechaHora: dto.fechaHora,
            total,
            monedaId: dto.monedaId,
            items: dto.items.map((item) => ({
                productoExternoId: item.productoExternoId || null,
                productoId: item.productoId || null,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
                monedaId: dto.monedaId,
            })),
        });
        return this.mapToResponse(venta);
    }
    async findAll(query) {
        const ventas = await this.ventaRepository.findAll(query);
        return ventas.map((venta) => this.mapToResponse(venta));
    }
    async findById(id) {
        const venta = await this.ventaRepository.findById(id);
        if (!venta) {
            throw new common_1.NotFoundException(`Venta con id ${id} no encontrada`);
        }
        return this.mapToResponse(venta);
    }
    async update(id, dto) {
        const venta = await this.ventaRepository.findById(id);
        if (!venta) {
            throw new common_1.NotFoundException(`Venta con id ${id} no encontrada`);
        }
        if (dto.items) {
            for (const item of dto.items) {
                const productoExists = await this.productoExternoRepository.findById(item.productoExternoId);
                if (!productoExists) {
                    throw new common_1.BadRequestException(`ProductoExterno con id ${item.productoExternoId} no existe`);
                }
                if (item.productoId) {
                    try {
                        await this.productoService.findById(item.productoId);
                    }
                    catch {
                        throw new common_1.BadRequestException(`Producto con id ${item.productoId} no existe`);
                    }
                }
            }
            const newTotal = dto.items.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);
            const updatedVenta = await this.ventaRepository.update(id, {
                ...dto,
                total: newTotal,
                items: dto.items.map((item) => ({
                    productoExternoId: item.productoExternoId,
                    productoId: item.productoId || null,
                    cantidad: item.cantidad,
                    precioUnitario: item.precioUnitario,
                    monedaId: venta.monedaId,
                })),
            });
            return this.mapToResponse(updatedVenta);
        }
        const updatedVenta = await this.ventaRepository.update(id, dto);
        return this.mapToResponse(updatedVenta);
    }
    async delete(id) {
        const venta = await this.ventaRepository.findById(id);
        if (!venta) {
            throw new common_1.NotFoundException(`Venta con id ${id} no encontrada`);
        }
        await this.ventaRepository.delete(id);
    }
    mapToResponse(venta) {
        return {
            id: venta.id,
            tiendaId: venta.tiendaId,
            fechaHora: venta.fechaHora,
            total: parseFloat(venta.total.toString()),
            monedaId: venta.monedaId,
            items: (venta.items || []).map((item) => this.mapItemToResponse(item)),
            createdAt: venta.createdAt,
            updatedAt: venta.updatedAt,
        };
    }
    mapItemToResponse(item) {
        return {
            id: item.id,
            ventaId: item.ventaId,
            productoExternoId: item.productoExternoId || undefined,
            productoId: item.productoId || undefined,
            cantidad: item.cantidad,
            precioUnitario: parseFloat(item.precioUnitario.toString()),
            monedaId: item.monedaId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        };
    }
};
exports.VentaService = VentaService;
exports.VentaService = VentaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [venta_repository_1.VentaRepository,
        producto_externo_repository_1.ProductoExternoRepository,
        clients_1.TiendaClientMock,
        producto_service_1.ProductoService])
], VentaService);
//# sourceMappingURL=venta.service.js.map