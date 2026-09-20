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
exports.DisponibilidadZonaController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let DisponibilidadZonaController = class DisponibilidadZonaController {
    disponibilidadZonaService;
    constructor(disponibilidadZonaService) {
        this.disponibilidadZonaService = disponibilidadZonaService;
    }
    async create(dto) {
        return this.disponibilidadZonaService.create(dto);
    }
    async findAll(query) {
        return this.disponibilidadZonaService.findAll(query);
    }
    async findById(id) {
        return this.disponibilidadZonaService.findById(id);
    }
    async update(id, dto) {
        return this.disponibilidadZonaService.update(id, dto);
    }
    async delete(id) {
        return this.disponibilidadZonaService.delete(id);
    }
};
exports.DisponibilidadZonaController = DisponibilidadZonaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateDisponibilidadZonaDto]),
    __metadata("design:returntype", Promise)
], DisponibilidadZonaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryDisponibilidadZonaDto]),
    __metadata("design:returntype", Promise)
], DisponibilidadZonaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisponibilidadZonaController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateDisponibilidadZonaDto]),
    __metadata("design:returntype", Promise)
], DisponibilidadZonaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisponibilidadZonaController.prototype, "delete", null);
exports.DisponibilidadZonaController = DisponibilidadZonaController = __decorate([
    (0, common_1.Controller)('logistics/disponibilidad-zona'),
    __metadata("design:paramtypes", [services_1.DisponibilidadZonaService])
], DisponibilidadZonaController);
//# sourceMappingURL=disponibilidad-zona.controller.js.map