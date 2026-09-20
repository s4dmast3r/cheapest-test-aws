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
exports.RegistroCompraProductoTienda = void 0;
const typeorm_1 = require("typeorm");
const item_inventario_entity_1 = require("./item-inventario.entity");
let RegistroCompraProductoTienda = class RegistroCompraProductoTienda {
    id;
    tiendaId;
    productoId;
    compraId;
    itemInventarioId;
    fechaCompra;
    cantidad;
    createdAt;
    updatedAt;
    itemInventario;
};
exports.RegistroCompraProductoTienda = RegistroCompraProductoTienda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RegistroCompraProductoTienda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], RegistroCompraProductoTienda.prototype, "tiendaId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], RegistroCompraProductoTienda.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], RegistroCompraProductoTienda.prototype, "compraId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], RegistroCompraProductoTienda.prototype, "itemInventarioId", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], RegistroCompraProductoTienda.prototype, "fechaCompra", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RegistroCompraProductoTienda.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RegistroCompraProductoTienda.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RegistroCompraProductoTienda.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_inventario_entity_1.ItemInventario, (item) => item.registrosCompra),
    (0, typeorm_1.JoinColumn)({ name: 'itemInventarioId' }),
    __metadata("design:type", item_inventario_entity_1.ItemInventario)
], RegistroCompraProductoTienda.prototype, "itemInventario", void 0);
exports.RegistroCompraProductoTienda = RegistroCompraProductoTienda = __decorate([
    (0, typeorm_1.Entity)('registros_compra_producto_tienda')
], RegistroCompraProductoTienda);
//# sourceMappingURL=registro-compra-producto-tienda.entity.js.map