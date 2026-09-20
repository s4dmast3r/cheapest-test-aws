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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoProductoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
let CatalogoProductoRepository = class CatalogoProductoRepository {
    catalogoRepository;
    constructor(catalogoRepository) {
        this.catalogoRepository = catalogoRepository;
    }
    async addProductoToCatalogo(catalogoId, productoId) {
        await this.catalogoRepository.manager
            .createQueryBuilder()
            .relation(entities_1.Catalogo, 'productos')
            .of(catalogoId)
            .add(productoId);
    }
    async findByCatalogoId(catalogoId) {
        const catalogo = await this.catalogoRepository.findOne({
            where: { id: catalogoId },
            relations: ['productos'],
        });
        return catalogo?.productos ?? [];
    }
    async removeProductoFromCatalogo(catalogoId, productoId) {
        await this.catalogoRepository.manager
            .createQueryBuilder()
            .relation(entities_1.Catalogo, 'productos')
            .of(catalogoId)
            .remove(productoId);
    }
    async exists(catalogoId, productoId) {
        const count = await this.catalogoRepository
            .createQueryBuilder('catalogo')
            .innerJoin('catalogo.productos', 'producto')
            .where('catalogo.id = :catalogoId', { catalogoId })
            .andWhere('producto.id = :productoId', { productoId })
            .getCount();
        return count > 0;
    }
};
exports.CatalogoProductoRepository = CatalogoProductoRepository;
exports.CatalogoProductoRepository = CatalogoProductoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CATALOGO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CatalogoProductoRepository);
//# sourceMappingURL=catalogo-producto.repository.js.map