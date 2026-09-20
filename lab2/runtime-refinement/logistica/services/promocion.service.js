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
exports.PromocionService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
let PromocionService = class PromocionService {
    promocionRepository;
    constructor(promocionRepository) {
        this.promocionRepository = promocionRepository;
    }
    async create(dto) {
        const promocion = await this.promocionRepository.create(dto);
        return this.mapToResponse(promocion);
    }
    async findAll(query) {
        const promociones = await this.promocionRepository.findAll(query);
        return promociones.map((promocion) => this.mapToResponse(promocion));
    }
    async findById(id) {
        const promocion = await this.promocionRepository.findById(id);
        if (!promocion) {
            throw new common_1.NotFoundException(`Promocion con id ${id} no encontrada`);
        }
        return this.mapToResponse(promocion);
    }
    async update(id, dto) {
        const promocion = await this.promocionRepository.findById(id);
        if (!promocion) {
            throw new common_1.NotFoundException(`Promocion con id ${id} no encontrada`);
        }
        const updatedPromocion = await this.promocionRepository.update(id, dto);
        return this.mapToResponse(updatedPromocion);
    }
    async delete(id) {
        const promocion = await this.promocionRepository.findById(id);
        if (!promocion) {
            throw new common_1.NotFoundException(`Promocion con id ${id} no encontrada`);
        }
        await this.promocionRepository.delete(id);
    }
    mapToResponse(promocion) {
        return {
            id: promocion.id,
            nombre: promocion.nombre,
            precioPromocional: parseFloat(promocion.precioPromocional.toString()),
            monedaId: promocion.monedaId,
            productoId: promocion.productoId,
            tiendaIds: promocion.tiendas?.map((tienda) => tienda.tiendaId) ?? [],
            inicio: promocion.inicio,
            fin: promocion.fin,
            restricciones: promocion.restricciones,
            createdAt: promocion.createdAt,
            updatedAt: promocion.updatedAt,
        };
    }
};
exports.PromocionService = PromocionService;
exports.PromocionService = PromocionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.PromocionRepository])
], PromocionService);
//# sourceMappingURL=promocion.service.js.map