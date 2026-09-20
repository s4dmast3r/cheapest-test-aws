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
exports.DisponibilidadZonaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DisponibilidadZonaRepository = class DisponibilidadZonaRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(disponibilidad) {
        const newDisponibilidad = this.repository.create({
            ...disponibilidad,
            ultimaActualizacion: new Date(),
        });
        return this.repository.save(newDisponibilidad);
    }
    async findAll(query) {
        const queryBuilder = this.repository.createQueryBuilder('disponibilidadZona');
        if (query.catalogoId) {
            queryBuilder.andWhere('disponibilidadZona.catalogoId = :catalogoId', {
                catalogoId: query.catalogoId,
            });
        }
        if (query.productoId) {
            queryBuilder.andWhere('disponibilidadZona.productoId = :productoId', {
                productoId: query.productoId,
            });
        }
        return queryBuilder.getMany();
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findByCatalogoAndProducto(catalogoId, productoId) {
        return this.repository.findOne({ where: { catalogoId, productoId } });
    }
    async update(id, updates) {
        await this.repository.update(id, {
            ...updates,
            ultimaActualizacion: new Date(),
        });
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.DisponibilidadZonaRepository = DisponibilidadZonaRepository;
exports.DisponibilidadZonaRepository = DisponibilidadZonaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DISPONIBILIDAD_ZONA_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DisponibilidadZonaRepository);
//# sourceMappingURL=disponibilidad-zona.repository.js.map