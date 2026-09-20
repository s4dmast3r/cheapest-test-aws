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
exports.RegistroVentaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let RegistroVentaRepository = class RegistroVentaRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(registro) {
        const newRegistro = this.repository.create(registro);
        return this.repository.save(newRegistro);
    }
    async findAll(query) {
        const queryBuilder = this.repository.createQueryBuilder('registro');
        if (query.tiendaId) {
            queryBuilder.andWhere('registro.tiendaId = :tiendaId', {
                tiendaId: query.tiendaId,
            });
        }
        if (query.productoId) {
            queryBuilder.andWhere('registro.productoId = :productoId', {
                productoId: query.productoId,
            });
        }
        if (query.fechaDesde && query.fechaHasta) {
            queryBuilder.andWhere('registro.fechaVenta BETWEEN :fechaDesde AND :fechaHasta', {
                fechaDesde: new Date(query.fechaDesde),
                fechaHasta: new Date(query.fechaHasta),
            });
        }
        else if (query.fechaDesde) {
            queryBuilder.andWhere('registro.fechaVenta >= :fechaDesde', {
                fechaDesde: new Date(query.fechaDesde),
            });
        }
        else if (query.fechaHasta) {
            queryBuilder.andWhere('registro.fechaVenta <= :fechaHasta', {
                fechaHasta: new Date(query.fechaHasta),
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
exports.RegistroVentaRepository = RegistroVentaRepository;
exports.RegistroVentaRepository = RegistroVentaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REGISTRO_VENTA_PRODUCTO_TIENDA_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RegistroVentaRepository);
//# sourceMappingURL=registro-venta.repository.js.map