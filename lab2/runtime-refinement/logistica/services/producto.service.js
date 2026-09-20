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
exports.ProductoService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
let ProductoService = class ProductoService {
    productoRepository;
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async create(dto) {
        const producto = await this.productoRepository.create(dto);
        return this.mapToResponse(producto);
    }
    async findAll(query) {
        const productos = await this.productoRepository.findAll(query);
        return productos.map((producto) => this.mapToResponse(producto));
    }
    async findById(id) {
        const producto = await this.productoRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return this.mapToResponse(producto);
    }
    async update(id, dto) {
        const producto = await this.productoRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        }
        const updatedProducto = await this.productoRepository.update(id, dto);
        return this.mapToResponse(updatedProducto);
    }
    async delete(id) {
        const producto = await this.productoRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        }
        await this.productoRepository.delete(id);
    }
    async exists(id) {
        const producto = await this.productoRepository.findById(id);
        return producto !== null;
    }
    mapToResponse(producto) {
        return {
            id: producto.id,
            codigoInterno: producto.codigoInterno,
            codigoBarras: producto.codigoBarras,
            nombre: producto.nombre,
            marca: producto.marca,
            categoria: producto.categoria,
            presentacion: producto.presentacion,
            precioBase: producto.precioBase,
            monedaId: producto.monedaId,
            createdAt: producto.createdAt,
            updatedAt: producto.updatedAt,
        };
    }
};
exports.ProductoService = ProductoService;
exports.ProductoService = ProductoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.ProductoRepository])
], ProductoService);
//# sourceMappingURL=producto.service.js.map