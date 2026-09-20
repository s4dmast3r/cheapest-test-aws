"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiendaClientMock = void 0;
const common_1 = require("@nestjs/common");
let TiendaClientMock = class TiendaClientMock {
    async exists(_tiendaId) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return true;
    }
    async findById(tiendaId) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return {
            id: tiendaId,
            nombreComercial: 'Tienda Mock',
            rut: '123456789',
        };
    }
    async findByIds(tiendaIds) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return tiendaIds.map((id) => ({
            id,
            nombreComercial: `Tienda Mock ${id}`,
            rut: '123456789',
        }));
    }
};
exports.TiendaClientMock = TiendaClientMock;
exports.TiendaClientMock = TiendaClientMock = __decorate([
    (0, common_1.Injectable)()
], TiendaClientMock);
//# sourceMappingURL=tienda.client.mock.js.map