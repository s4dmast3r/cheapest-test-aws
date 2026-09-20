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
exports.PromocionTienda = void 0;
const typeorm_1 = require("typeorm");
const promocion_entity_1 = require("./promocion.entity");
let PromocionTienda = class PromocionTienda {
    id;
    promocionId;
    tiendaId;
    promocion;
};
exports.PromocionTienda = PromocionTienda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PromocionTienda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PromocionTienda.prototype, "promocionId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PromocionTienda.prototype, "tiendaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => promocion_entity_1.Promocion, (promocion) => promocion.tiendas, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'promocionId' }),
    __metadata("design:type", promocion_entity_1.Promocion)
], PromocionTienda.prototype, "promocion", void 0);
exports.PromocionTienda = PromocionTienda = __decorate([
    (0, typeorm_1.Entity)('promocion_tiendas'),
    (0, typeorm_1.Index)(['promocionId', 'tiendaId'], { unique: true })
], PromocionTienda);
//# sourceMappingURL=promocion-tienda.entity.js.map