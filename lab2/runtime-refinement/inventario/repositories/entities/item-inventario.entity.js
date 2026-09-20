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
exports.ItemInventario = void 0;
const typeorm_1 = require("typeorm");
const registro_compra_producto_tienda_entity_1 = require("./registro-compra-producto-tienda.entity");
const registro_venta_producto_tienda_entity_1 = require("./registro-venta-producto-tienda.entity");
let ItemInventario = class ItemInventario {
    id;
    productoId;
    tiendaId;
    cantidad;
    precioVenta;
    monedaId;
    createdAt;
    updatedAt;
    registrosVenta;
    registrosCompra;
};
exports.ItemInventario = ItemInventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemInventario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ItemInventario.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ItemInventario.prototype, "tiendaId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ItemInventario.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ItemInventario.prototype, "precioVenta", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ItemInventario.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ItemInventario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ItemInventario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registro_venta_producto_tienda_entity_1.RegistroVentaProductoTienda, (registro) => registro.itemInventario),
    __metadata("design:type", Array)
], ItemInventario.prototype, "registrosVenta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registro_compra_producto_tienda_entity_1.RegistroCompraProductoTienda, (registro) => registro.itemInventario),
    __metadata("design:type", Array)
], ItemInventario.prototype, "registrosCompra", void 0);
exports.ItemInventario = ItemInventario = __decorate([
    (0, typeorm_1.Entity)('items_inventario')
], ItemInventario);
//# sourceMappingURL=item-inventario.entity.js.map