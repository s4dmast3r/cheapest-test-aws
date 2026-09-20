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
exports.Pedido = exports.EstadoPedido = void 0;
const typeorm_1 = require("typeorm");
const despacho_entity_1 = require("./despacho.entity");
const item_pedido_entity_1 = require("./item-pedido.entity");
const nota_credito_entity_1 = require("./nota-credito.entity");
var EstadoPedido;
(function (EstadoPedido) {
    EstadoPedido["CREADO"] = "creado";
    EstadoPedido["APROBADO"] = "aprobado";
    EstadoPedido["EN_ALISTAMIENTO"] = "enAlistamiento";
    EstadoPedido["ALISTADO"] = "alistado";
    EstadoPedido["DESPACHADO"] = "despachado";
    EstadoPedido["ENTREGADO"] = "entregado";
    EstadoPedido["CANCELADO"] = "cancelado";
    EstadoPedido["DEVUELTO"] = "devuelto";
})(EstadoPedido || (exports.EstadoPedido = EstadoPedido = {}));
let Pedido = class Pedido {
    id;
    identificador;
    tiendaId;
    fechaHoraCreacion;
    montoTotal;
    monedaId;
    estado;
    createdAt;
    updatedAt;
    items;
    despachos;
    notasCredito;
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Pedido.prototype, "identificador", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Pedido.prototype, "tiendaId", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaHoraCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "montoTotal", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Pedido.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoPedido,
        default: EstadoPedido.CREADO,
    }),
    __metadata("design:type", String)
], Pedido.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pedido.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Pedido.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_pedido_entity_1.ItemPedido, (itemPedido) => itemPedido.pedido, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Pedido.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => despacho_entity_1.Despacho, (despacho) => despacho.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "despachos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nota_credito_entity_1.NotaCredito, (notaCredito) => notaCredito.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "notasCredito", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)('pedidos')
], Pedido);
//# sourceMappingURL=pedido.entity.js.map