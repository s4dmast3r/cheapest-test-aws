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
exports.VentaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
let VentaRepository = class VentaRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const venta = this.repository.create(data);
        return this.repository.save(venta);
    }
    async findAll(query) {
        const queryBuilder = this.repository
            .createQueryBuilder('venta')
            .leftJoinAndSelect('venta.items', 'items');
        if (query.tiendaId) {
            queryBuilder.andWhere('venta.tiendaId = :tiendaId', {
                tiendaId: query.tiendaId,
            });
        }
        if (query.fechaDesde) {
            queryBuilder.andWhere('venta.fechaHora >= :fechaDesde', {
                fechaDesde: query.fechaDesde,
            });
        }
        if (query.fechaHasta) {
            queryBuilder.andWhere('venta.fechaHora <= :fechaHasta', {
                fechaHasta: query.fechaHasta,
            });
        }
        if (query.productoExternoId) {
            queryBuilder.andWhere('items.productoExternoId = :productoExternoId', {
                productoExternoId: query.productoExternoId,
            });
        }
        if (query.productoId) {
            queryBuilder.andWhere('items.productoId = :productoId', {
                productoId: query.productoId,
            });
        }
        return queryBuilder.getMany();
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['items'],
        });
    }
    async update(id, updates) {
        const venta = await this.findById(id);
        if (!venta)
            return null;
        if (updates.items) {
            if (venta.items && venta.items.length > 0) {
                await this.repository.manager.delete(entities_1.ItemVenta, { ventaId: id });
            }
            updates.items.forEach((item) => {
                item.ventaId = id;
            });
        }
        Object.assign(venta, updates);
        const saved = await this.repository.save(venta);
        return this.findById(saved.id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.VentaRepository = VentaRepository;
exports.VentaRepository = VentaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VENTA_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], VentaRepository);
//# sourceMappingURL=venta.repository.js.map