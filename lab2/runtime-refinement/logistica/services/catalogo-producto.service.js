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
exports.CatalogoProductoService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
let CatalogoProductoService = class CatalogoProductoService {
    catalogoProductoRepository;
    catalogoRepository;
    productoRepository;
    constructor(catalogoProductoRepository, catalogoRepository, productoRepository) {
        this.catalogoProductoRepository = catalogoProductoRepository;
        this.catalogoRepository = catalogoRepository;
        this.productoRepository = productoRepository;
    }
    async addProductoToCatalogo(catalogoId, productoId) {
        const catalogo = await this.catalogoRepository.findById(catalogoId);
        if (!catalogo) {
            throw new common_1.NotFoundException(`Catalogo con id ${catalogoId} no encontrado`);
        }
        const producto = await this.productoRepository.findById(productoId);
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con id ${productoId} no encontrado`);
        }
        const exists = await this.catalogoProductoRepository.exists(catalogoId, productoId);
        if (exists) {
            throw new common_1.BadRequestException(`El producto ${productoId} ya está en el catalogo ${catalogoId}`);
        }
        await this.catalogoProductoRepository.addProductoToCatalogo(catalogoId, productoId);
    }
    async removeProductoFromCatalogo(catalogoId, productoId) {
        const exists = await this.catalogoProductoRepository.exists(catalogoId, productoId);
        if (!exists) {
            throw new common_1.NotFoundException(`El producto ${productoId} no está en el catalogo ${catalogoId}`);
        }
        await this.catalogoProductoRepository.removeProductoFromCatalogo(catalogoId, productoId);
    }
    async getProductosByCatalogo(catalogoId) {
        const catalogo = await this.catalogoRepository.findById(catalogoId);
        if (!catalogo) {
            throw new common_1.NotFoundException(`Catalogo con id ${catalogoId} no encontrado`);
        }
        const relations = await this.catalogoProductoRepository.findByCatalogoId(catalogoId);
        return relations;
    }
};
exports.CatalogoProductoService = CatalogoProductoService;
exports.CatalogoProductoService = CatalogoProductoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.CatalogoProductoRepository,
        repositories_1.CatalogoRepository,
        repositories_1.ProductoRepository])
], CatalogoProductoService);
//# sourceMappingURL=catalogo-producto.service.js.map