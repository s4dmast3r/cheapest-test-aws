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
exports.ProductoExternoService = void 0;
const common_1 = require("@nestjs/common");
const clients_1 = require("../clients");
const producto_externo_repository_1 = require("../repositories/producto-externo.repository");
let ProductoExternoService = class ProductoExternoService {
    productoExternoRepository;
    tiendaClient;
    constructor(productoExternoRepository, tiendaClient) {
        this.productoExternoRepository = productoExternoRepository;
        this.tiendaClient = tiendaClient;
    }
    async create(dto) {
        const tiendaExists = await this.tiendaClient.exists(dto.tiendaId);
        if (!tiendaExists) {
            throw new common_1.BadRequestException(`Tienda con id ${dto.tiendaId} no existe`);
        }
        const productoExterno = await this.productoExternoRepository.create(dto);
        return this.mapToResponse(productoExterno);
    }
    async findAll(query) {
        const productos = await this.productoExternoRepository.findAll(query);
        return productos.map((producto) => this.mapToResponse(producto));
    }
    async findById(id) {
        const producto = await this.productoExternoRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`ProductoExterno con id ${id} no encontrado`);
        }
        return this.mapToResponse(producto);
    }
    async update(id, dto) {
        const producto = await this.productoExternoRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`ProductoExterno con id ${id} no encontrado`);
        }
        if (dto.tiendaId && dto.tiendaId !== producto.tiendaId) {
            const tiendaExists = await this.tiendaClient.exists(dto.tiendaId);
            if (!tiendaExists) {
                throw new common_1.BadRequestException(`Tienda con id ${dto.tiendaId} no existe`);
            }
        }
        const updatedProducto = await this.productoExternoRepository.update(id, dto);
        return this.mapToResponse(updatedProducto);
    }
    async delete(id) {
        const producto = await this.productoExternoRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`ProductoExterno con id ${id} no encontrado`);
        }
        await this.productoExternoRepository.delete(id);
    }
    async exists(id) {
        const producto = await this.productoExternoRepository.findById(id);
        return !!producto;
    }
    mapToResponse(producto) {
        return {
            id: producto.id,
            tiendaId: producto.tiendaId,
            codigoBarras: producto.codigoBarras,
            nombre: producto.nombre,
            categoria: producto.categoria,
            precioBase: parseFloat(producto.precioBase.toString()),
            monedaId: producto.monedaId,
            cantidad: parseFloat(producto.cantidad.toString()),
            createdAt: producto.createdAt,
            updatedAt: producto.updatedAt,
        };
    }
};
exports.ProductoExternoService = ProductoExternoService;
exports.ProductoExternoService = ProductoExternoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [producto_externo_repository_1.ProductoExternoRepository,
        clients_1.TiendaClientMock])
], ProductoExternoService);
//# sourceMappingURL=producto-externo.service.js.map