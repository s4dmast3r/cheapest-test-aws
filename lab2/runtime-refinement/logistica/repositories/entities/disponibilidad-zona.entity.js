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
exports.DisponibilidadZona = void 0;
const typeorm_1 = require("typeorm");
const catalogo_entity_1 = require("./catalogo.entity");
const producto_entity_1 = require("./producto.entity");
let DisponibilidadZona = class DisponibilidadZona {
    id;
    catalogoId;
    productoId;
    cantidadDisponible;
    ultimaActualizacion;
    createdAt;
    updatedAt;
    catalogo;
    producto;
};
exports.DisponibilidadZona = DisponibilidadZona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DisponibilidadZona.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], DisponibilidadZona.prototype, "catalogoId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], DisponibilidadZona.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], DisponibilidadZona.prototype, "cantidadDisponible", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], DisponibilidadZona.prototype, "ultimaActualizacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DisponibilidadZona.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DisponibilidadZona.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catalogo_entity_1.Catalogo),
    (0, typeorm_1.JoinColumn)({ name: 'catalogoId' }),
    __metadata("design:type", catalogo_entity_1.Catalogo)
], DisponibilidadZona.prototype, "catalogo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.disponibilidades),
    (0, typeorm_1.JoinColumn)({ name: 'productoId' }),
    __metadata("design:type", producto_entity_1.Producto)
], DisponibilidadZona.prototype, "producto", void 0);
exports.DisponibilidadZona = DisponibilidadZona = __decorate([
    (0, typeorm_1.Entity)('disponibilidad_zona')
], DisponibilidadZona);
//# sourceMappingURL=disponibilidad-zona.entity.js.map