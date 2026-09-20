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
exports.DespachoService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
let DespachoService = class DespachoService {
    despachoRepository;
    pedidoRepository;
    constructor(despachoRepository, pedidoRepository) {
        this.despachoRepository = despachoRepository;
        this.pedidoRepository = pedidoRepository;
    }
    async create(dto) {
        const pedido = await this.pedidoRepository.findById(dto.pedidoId);
        if (!pedido) {
            throw new common_1.BadRequestException(`Pedido con id ${dto.pedidoId} no existe`);
        }
        const despacho = await this.despachoRepository.create(dto);
        return this.mapToResponse(despacho);
    }
    async findAll(query) {
        const despachos = await this.despachoRepository.findAll(query);
        return despachos.map((despacho) => this.mapToResponse(despacho));
    }
    async findById(id) {
        const despacho = await this.despachoRepository.findById(id);
        if (!despacho) {
            throw new common_1.NotFoundException(`Despacho con id ${id} no encontrado`);
        }
        return this.mapToResponse(despacho);
    }
    async update(id, dto) {
        const despacho = await this.despachoRepository.findById(id);
        if (!despacho) {
            throw new common_1.NotFoundException(`Despacho con id ${id} no encontrado`);
        }
        const updatedDespacho = await this.despachoRepository.update(id, dto);
        return this.mapToResponse(updatedDespacho);
    }
    async delete(id) {
        const despacho = await this.despachoRepository.findById(id);
        if (!despacho) {
            throw new common_1.NotFoundException(`Despacho con id ${id} no encontrado`);
        }
        await this.despachoRepository.delete(id);
    }
    mapToResponse(despacho) {
        return {
            id: despacho.id,
            pedidoId: despacho.pedidoId,
            bodega: despacho.bodega,
            horaSalida: despacho.horaSalida,
            ventanaPrometidaInicio: despacho.ventanaPrometidaInicio,
            ventanaPrometidaFin: despacho.ventanaPrometidaFin,
            createdAt: despacho.createdAt,
            updatedAt: despacho.updatedAt,
        };
    }
};
exports.DespachoService = DespachoService;
exports.DespachoService = DespachoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.DespachoRepository,
        repositories_1.PedidoRepository])
], DespachoService);
//# sourceMappingURL=despacho.service.js.map