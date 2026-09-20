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
exports.NotaCreditoService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
let NotaCreditoService = class NotaCreditoService {
    notaCreditoRepository;
    pedidoRepository;
    constructor(notaCreditoRepository, pedidoRepository) {
        this.notaCreditoRepository = notaCreditoRepository;
        this.pedidoRepository = pedidoRepository;
    }
    async create(dto) {
        const pedido = await this.pedidoRepository.findById(dto.pedidoId);
        if (!pedido) {
            throw new common_1.BadRequestException(`Pedido con id ${dto.pedidoId} no existe`);
        }
        const notaCredito = await this.notaCreditoRepository.create(dto);
        return this.mapToResponse(notaCredito);
    }
    async findAll(query) {
        const notasCredito = await this.notaCreditoRepository.findAll(query);
        return notasCredito.map((notaCredito) => this.mapToResponse(notaCredito));
    }
    async findById(id) {
        const notaCredito = await this.notaCreditoRepository.findById(id);
        if (!notaCredito) {
            throw new common_1.NotFoundException(`NotaCredito con id ${id} no encontrada`);
        }
        return this.mapToResponse(notaCredito);
    }
    async update(id, dto) {
        const notaCredito = await this.notaCreditoRepository.findById(id);
        if (!notaCredito) {
            throw new common_1.NotFoundException(`NotaCredito con id ${id} no encontrada`);
        }
        const updatedNotaCredito = await this.notaCreditoRepository.update(id, dto);
        return this.mapToResponse(updatedNotaCredito);
    }
    async delete(id) {
        const notaCredito = await this.notaCreditoRepository.findById(id);
        if (!notaCredito) {
            throw new common_1.NotFoundException(`NotaCredito con id ${id} no encontrada`);
        }
        await this.notaCreditoRepository.delete(id);
    }
    mapToResponse(notaCredito) {
        return {
            id: notaCredito.id,
            pedidoId: notaCredito.pedidoId,
            numeroDocumento: notaCredito.numeroDocumento,
            fecha: notaCredito.fecha,
            motivo: notaCredito.motivo,
            monto: notaCredito.monto,
            monedaId: notaCredito.monedaId,
            evidencia: notaCredito.evidencia,
            createdAt: notaCredito.createdAt,
            updatedAt: notaCredito.updatedAt,
        };
    }
};
exports.NotaCreditoService = NotaCreditoService;
exports.NotaCreditoService = NotaCreditoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.NotaCreditoRepository,
        repositories_1.PedidoRepository])
], NotaCreditoService);
//# sourceMappingURL=nota-credito.service.js.map