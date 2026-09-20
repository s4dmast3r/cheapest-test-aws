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
exports.Promocion = void 0;
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("./producto.entity");
const promocion_tienda_entity_1 = require("./promocion-tienda.entity");
let Promocion = class Promocion {
    id;
    nombre;
    precioPromocional;
    monedaId;
    productoId;
    inicio;
    fin;
    restricciones;
    createdAt;
    updatedAt;
    producto;
    tiendas;
};
exports.Promocion = Promocion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Promocion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], Promocion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Promocion.prototype, "precioPromocional", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Promocion.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Promocion.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Promocion.prototype, "inicio", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Promocion.prototype, "fin", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Promocion.prototype, "restricciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Promocion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Promocion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.promociones),
    (0, typeorm_1.JoinColumn)({ name: 'productoId' }),
    __metadata("design:type", producto_entity_1.Producto)
], Promocion.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => promocion_tienda_entity_1.PromocionTienda, (promocionTienda) => promocionTienda.promocion, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Promocion.prototype, "tiendas", void 0);
exports.Promocion = Promocion = __decorate([
    (0, typeorm_1.Entity)('promociones')
], Promocion);
//# sourceMappingURL=promocion.entity.js.map