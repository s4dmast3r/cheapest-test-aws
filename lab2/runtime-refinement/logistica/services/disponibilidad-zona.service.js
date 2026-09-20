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
exports.DisponibilidadZonaService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
let DisponibilidadZonaService = class DisponibilidadZonaService {
    disponibilidadZonaRepository;
    catalogoRepository;
    productoRepository;
    constructor(disponibilidadZonaRepository, catalogoRepository, productoRepository) {
        this.disponibilidadZonaRepository = disponibilidadZonaRepository;
        this.catalogoRepository = catalogoRepository;
        this.productoRepository = productoRepository;
    }
    async create(dto) {
        const catalogo = await this.catalogoRepository.findById(dto.catalogoId);
        if (!catalogo) {
            throw new common_1.BadRequestException(`Catalogo con id ${dto.catalogoId} no existe`);
        }
        const producto = await this.productoRepository.findById(dto.productoId);
        if (!producto) {
            throw new common_1.BadRequestException(`Producto con id ${dto.productoId} no existe`);
        }
        const exists = await this.disponibilidadZonaRepository.findByCatalogoAndProducto(dto.catalogoId, dto.productoId);
        if (exists) {
            throw new common_1.BadRequestException(`Ya existe una disponibilidad para el catalogo ${dto.catalogoId} y producto ${dto.productoId}`);
        }
        const disponibilidad = await this.disponibilidadZonaRepository.create(dto);
        return this.mapToResponse(disponibilidad);
    }
    async findAll(query) {
        const disponibilidades = await this.disponibilidadZonaRepository.findAll(query);
        return disponibilidades.map((disponibilidad) => this.mapToResponse(disponibilidad));
    }
    async findById(id) {
        const disponibilidad = await this.disponibilidadZonaRepository.findById(id);
        if (!disponibilidad) {
            throw new common_1.NotFoundException(`DisponibilidadZona con id ${id} no encontrada`);
        }
        return this.mapToResponse(disponibilidad);
    }
    async update(id, dto) {
        const disponibilidad = await this.disponibilidadZonaRepository.findById(id);
        if (!disponibilidad) {
            throw new common_1.NotFoundException(`DisponibilidadZona con id ${id} no encontrada`);
        }
        const updatedDisponibilidad = await this.disponibilidadZonaRepository.update(id, dto);
        return this.mapToResponse(updatedDisponibilidad);
    }
    async delete(id) {
        const disponibilidad = await this.disponibilidadZonaRepository.findById(id);
        if (!disponibilidad) {
            throw new common_1.NotFoundException(`DisponibilidadZona con id ${id} no encontrada`);
        }
        await this.disponibilidadZonaRepository.delete(id);
    }
    mapToResponse(disponibilidad) {
        return {
            id: disponibilidad.id,
            catalogoId: disponibilidad.catalogoId,
            productoId: disponibilidad.productoId,
            cantidadDisponible: disponibilidad.cantidadDisponible,
            ultimaActualizacion: disponibilidad.ultimaActualizacion,
            createdAt: disponibilidad.createdAt,
            updatedAt: disponibilidad.updatedAt,
        };
    }
};
exports.DisponibilidadZonaService = DisponibilidadZonaService;
exports.DisponibilidadZonaService = DisponibilidadZonaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.DisponibilidadZonaRepository,
        repositories_1.CatalogoRepository,
        repositories_1.ProductoRepository])
], DisponibilidadZonaService);
//# sourceMappingURL=disponibilidad-zona.service.js.map