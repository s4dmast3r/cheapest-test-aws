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
exports.CatalogoProductoController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let CatalogoProductoController = class CatalogoProductoController {
    catalogoProductoService;
    constructor(catalogoProductoService) {
        this.catalogoProductoService = catalogoProductoService;
    }
    async addProductoToCatalogo(catalogoId, dto) {
        await this.catalogoProductoService.addProductoToCatalogo(catalogoId, dto.productoId);
        return { message: 'Producto agregado al catalogo exitosamente' };
    }
    async getProductosByCatalogo(catalogoId) {
        return this.catalogoProductoService.getProductosByCatalogo(catalogoId);
    }
    async removeProductoFromCatalogo(catalogoId, productoId) {
        await this.catalogoProductoService.removeProductoFromCatalogo(catalogoId, productoId);
        return { message: 'Producto removido del catalogo exitosamente' };
    }
};
exports.CatalogoProductoController = CatalogoProductoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('catalogoId')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.AddProductoToCatalogoDto]),
    __metadata("design:returntype", Promise)
], CatalogoProductoController.prototype, "addProductoToCatalogo", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('catalogoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogoProductoController.prototype, "getProductosByCatalogo", null);
__decorate([
    (0, common_1.Delete)(':productoId'),
    __param(0, (0, common_1.Param)('catalogoId')),
    __param(1, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CatalogoProductoController.prototype, "removeProductoFromCatalogo", null);
exports.CatalogoProductoController = CatalogoProductoController = __decorate([
    (0, common_1.Controller)('logistics/catalogos/:catalogoId/productos'),
    __metadata("design:paramtypes", [services_1.CatalogoProductoService])
], CatalogoProductoController);
//# sourceMappingURL=catalogo-producto.controller.js.map