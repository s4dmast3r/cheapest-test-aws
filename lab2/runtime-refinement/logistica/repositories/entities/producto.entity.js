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
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const catalogo_entity_1 = require("./catalogo.entity");
const disponibilidad_zona_entity_1 = require("./disponibilidad-zona.entity");
const item_pedido_entity_1 = require("./item-pedido.entity");
const promocion_entity_1 = require("./promocion.entity");
let Producto = class Producto {
    id;
    codigoInterno;
    codigoBarras;
    nombre;
    marca;
    categoria;
    presentacion;
    precioBase;
    monedaId;
    createdAt;
    updatedAt;
    catalogos;
    disponibilidades;
    itemsPedido;
    promociones;
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Producto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Producto.prototype, "codigoInterno", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Producto.prototype, "codigoBarras", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Producto.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Producto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Producto.prototype, "presentacion", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Producto.prototype, "precioBase", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Producto.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => catalogo_entity_1.Catalogo, (catalogo) => catalogo.productos),
    __metadata("design:type", Array)
], Producto.prototype, "catalogos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => disponibilidad_zona_entity_1.DisponibilidadZona, (disponibilidad) => disponibilidad.producto),
    __metadata("design:type", Array)
], Producto.prototype, "disponibilidades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_pedido_entity_1.ItemPedido, (itemPedido) => itemPedido.producto),
    __metadata("design:type", Array)
], Producto.prototype, "itemsPedido", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => promocion_entity_1.Promocion, (promocion) => promocion.producto),
    __metadata("design:type", Array)
], Producto.prototype, "promociones", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)('productos')
], Producto);
//# sourceMappingURL=producto.entity.js.map