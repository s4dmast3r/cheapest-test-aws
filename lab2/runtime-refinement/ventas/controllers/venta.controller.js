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
exports.VentaController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let VentaController = class VentaController {
    ventaService;
    constructor(ventaService) {
        this.ventaService = ventaService;
    }
    async create(dto) {
        return this.ventaService.create(dto);
    }
    async findAll(query) {
        return this.ventaService.findAll(query);
    }
    async findById(id) {
        return this.ventaService.findById(id);
    }
    async update(id, dto) {
        return this.ventaService.update(id, dto);
    }
    async delete(id) {
        return this.ventaService.delete(id);
    }
};
exports.VentaController = VentaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateVentaDto]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryVentaDto]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateVentaDto]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "delete", null);
exports.VentaController = VentaController = __decorate([
    (0, common_1.Controller)('ventas/ventas'),
    __metadata("design:paramtypes", [services_1.VentaService])
], VentaController);
//# sourceMappingURL=venta.controller.js.map