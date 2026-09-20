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
exports.NotaCreditoController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let NotaCreditoController = class NotaCreditoController {
    notaCreditoService;
    constructor(notaCreditoService) {
        this.notaCreditoService = notaCreditoService;
    }
    async create(dto) {
        return this.notaCreditoService.create(dto);
    }
    async findAll(query) {
        return this.notaCreditoService.findAll(query);
    }
    async findById(id) {
        return this.notaCreditoService.findById(id);
    }
    async update(id, dto) {
        return this.notaCreditoService.update(id, dto);
    }
    async delete(id) {
        return this.notaCreditoService.delete(id);
    }
};
exports.NotaCreditoController = NotaCreditoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateNotaCreditoDto]),
    __metadata("design:returntype", Promise)
], NotaCreditoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryNotaCreditoDto]),
    __metadata("design:returntype", Promise)
], NotaCreditoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotaCreditoController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateNotaCreditoDto]),
    __metadata("design:returntype", Promise)
], NotaCreditoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotaCreditoController.prototype, "delete", null);
exports.NotaCreditoController = NotaCreditoController = __decorate([
    (0, common_1.Controller)('logistics/notas-credito'),
    __metadata("design:paramtypes", [services_1.NotaCreditoService])
], NotaCreditoController);
//# sourceMappingURL=nota-credito.controller.js.map