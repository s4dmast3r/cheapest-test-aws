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
exports.PromocionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let PromocionRepository = class PromocionRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(promocion) {
        const tiendaIds = this.normalizeTiendaIds(promocion.tiendaIds);
        const newPromocion = this.repository.create({
            ...promocion,
            tiendas: tiendaIds.map((tiendaId) => ({ tiendaId })),
        });
        return this.repository.save(newPromocion);
    }
    async findAll(query) {
        const queryBuilder = this.repository
            .createQueryBuilder('promocion')
            .leftJoinAndSelect('promocion.tiendas', 'tiendas');
        if (query.nombre) {
            queryBuilder.andWhere('promocion.nombre LIKE :nombre', {
                nombre: `%${query.nombre}%`,
            });
        }
        return queryBuilder.getMany();
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['tiendas'],
        });
    }
    async update(id, updates) {
        await this.repository.update(id, updates);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
    normalizeTiendaIds(tiendaIds) {
        return [...new Set(tiendaIds ?? [])];
    }
};
exports.PromocionRepository = PromocionRepository;
exports.PromocionRepository = PromocionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROMOCION_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PromocionRepository);
//# sourceMappingURL=promocion.repository.js.map