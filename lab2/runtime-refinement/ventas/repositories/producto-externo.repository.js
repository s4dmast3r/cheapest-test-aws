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
exports.ProductoExternoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ProductoExternoRepository = class ProductoExternoRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const productoExterno = this.repository.create(data);
        return this.repository.save(productoExterno);
    }
    async findAll(query) {
        const queryBuilder = this.repository.createQueryBuilder('productoExterno');
        if (query.tiendaId) {
            queryBuilder.andWhere('productoExterno.tiendaId = :tiendaId', {
                tiendaId: query.tiendaId,
            });
        }
        if (query.codigoBarras) {
            queryBuilder.andWhere('productoExterno.codigoBarras = :codigoBarras', {
                codigoBarras: query.codigoBarras,
            });
        }
        if (query.categoria) {
            queryBuilder.andWhere('productoExterno.categoria = :categoria', {
                categoria: query.categoria,
            });
        }
        if (query.nombre) {
            queryBuilder.andWhere('productoExterno.nombre LIKE :nombre', {
                nombre: `%${query.nombre}%`,
            });
        }
        return queryBuilder.getMany();
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async update(id, updates) {
        await this.repository.update(id, updates);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.ProductoExternoRepository = ProductoExternoRepository;
exports.ProductoExternoRepository = ProductoExternoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCTO_EXTERNO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductoExternoRepository);
//# sourceMappingURL=producto-externo.repository.js.map