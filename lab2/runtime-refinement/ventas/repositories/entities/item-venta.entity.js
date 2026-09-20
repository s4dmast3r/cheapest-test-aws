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
exports.ItemVenta = void 0;
const typeorm_1 = require("typeorm");
const producto_externo_entity_1 = require("./producto-externo.entity");
const venta_entity_1 = require("./venta.entity");
let ItemVenta = class ItemVenta {
    id;
    ventaId;
    productoExternoId;
    productoId;
    cantidad;
    precioUnitario;
    monedaId;
    createdAt;
    updatedAt;
    venta;
    productoExterno;
};
exports.ItemVenta = ItemVenta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemVenta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ItemVenta.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], ItemVenta.prototype, "productoExternoId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], ItemVenta.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ItemVenta.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ItemVenta.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ItemVenta.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ItemVenta.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ItemVenta.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venta_entity_1.Venta, (venta) => venta.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ventaId' }),
    __metadata("design:type", venta_entity_1.Venta)
], ItemVenta.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_externo_entity_1.ProductoExterno, (productoExterno) => productoExterno.itemsVenta),
    (0, typeorm_1.JoinColumn)({ name: 'productoExternoId' }),
    __metadata("design:type", producto_externo_entity_1.ProductoExterno)
], ItemVenta.prototype, "productoExterno", void 0);
exports.ItemVenta = ItemVenta = __decorate([
    (0, typeorm_1.Entity)('items_venta')
], ItemVenta);
//# sourceMappingURL=item-venta.entity.js.map