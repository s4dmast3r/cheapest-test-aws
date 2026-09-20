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
exports.TenderoController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let TenderoController = class TenderoController {
    tenderoService;
    constructor(tenderoService) {
        this.tenderoService = tenderoService;
    }
    async getProductosDisponibles(query) {
        return await this.tenderoService.getProductosDisponibles(query);
    }
};
exports.TenderoController = TenderoController;
__decorate([
    (0, common_1.Get)('productos-disponibles'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryProductosDisponiblesDto]),
    __metadata("design:returntype", Promise)
], TenderoController.prototype, "getProductosDisponibles", null);
exports.TenderoController = TenderoController = __decorate([
    (0, common_1.Controller)('/logistics/tenderos'),
    __metadata("design:paramtypes", [services_1.TenderoService])
], TenderoController);
//# sourceMappingURL=tendero.controller.js.map