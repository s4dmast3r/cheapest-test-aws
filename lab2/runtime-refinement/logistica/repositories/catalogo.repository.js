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
exports.CatalogoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let CatalogoRepository = class CatalogoRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(catalogo) {
        const newCatalogo = this.repository.create(catalogo);
        return this.repository.save(newCatalogo);
    }
    async findAll(query) {
        const queryBuilder = this.repository.createQueryBuilder('catalogo');
        if (query.tiendaId) {
            queryBuilder.andWhere('catalogo.tiendaId = :tiendaId', {
                tiendaId: query.tiendaId,
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
exports.CatalogoRepository = CatalogoRepository;
exports.CatalogoRepository = CatalogoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CATALOGO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CatalogoRepository);
//# sourceMappingURL=catalogo.repository.js.map