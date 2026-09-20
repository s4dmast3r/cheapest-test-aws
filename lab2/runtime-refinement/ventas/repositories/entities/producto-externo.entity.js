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
exports.ProductoExterno = void 0;
const typeorm_1 = require("typeorm");
const item_venta_entity_1 = require("./item-venta.entity");
let ProductoExterno = class ProductoExterno {
    id;
    tiendaId;
    codigoBarras;
    nombre;
    categoria;
    precioBase;
    monedaId;
    cantidad;
    createdAt;
    updatedAt;
    itemsVenta;
};
exports.ProductoExterno = ProductoExterno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductoExterno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ProductoExterno.prototype, "tiendaId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], ProductoExterno.prototype, "codigoBarras", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], ProductoExterno.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], ProductoExterno.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductoExterno.prototype, "precioBase", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ProductoExterno.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductoExterno.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductoExterno.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductoExterno.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_venta_entity_1.ItemVenta, (itemVenta) => itemVenta.productoExterno),
    __metadata("design:type", Array)
], ProductoExterno.prototype, "itemsVenta", void 0);
exports.ProductoExterno = ProductoExterno = __decorate([
    (0, typeorm_1.Entity)('productos_externos')
], ProductoExterno);
//# sourceMappingURL=producto-externo.entity.js.map