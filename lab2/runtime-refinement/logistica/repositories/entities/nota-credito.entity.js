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
exports.NotaCredito = exports.MotivoNotaCredito = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("./pedido.entity");
var MotivoNotaCredito;
(function (MotivoNotaCredito) {
    MotivoNotaCredito["PRODUCTO_VENCIDO"] = "productoVencido";
    MotivoNotaCredito["PRODUCTO_EQUIVOCADO"] = "productoEquivocado";
    MotivoNotaCredito["DANO_EN_TRANSPORTE"] = "danoEnTransporte";
})(MotivoNotaCredito || (exports.MotivoNotaCredito = MotivoNotaCredito = {}));
let NotaCredito = class NotaCredito {
    id;
    pedidoId;
    numeroDocumento;
    fecha;
    motivo;
    monto;
    monedaId;
    evidencia;
    createdAt;
    updatedAt;
    pedido;
};
exports.NotaCredito = NotaCredito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotaCredito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], NotaCredito.prototype, "pedidoId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], NotaCredito.prototype, "numeroDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], NotaCredito.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MotivoNotaCredito,
    }),
    __metadata("design:type", String)
], NotaCredito.prototype, "motivo", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], NotaCredito.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], NotaCredito.prototype, "monedaId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], NotaCredito.prototype, "evidencia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotaCredito.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NotaCredito.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, (pedido) => pedido.notasCredito),
    (0, typeorm_1.JoinColumn)({ name: 'pedidoId' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], NotaCredito.prototype, "pedido", void 0);
exports.NotaCredito = NotaCredito = __decorate([
    (0, typeorm_1.Entity)('notas_credito')
], NotaCredito);
//# sourceMappingURL=nota-credito.entity.js.map