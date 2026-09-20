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
    tiendas = new Map([
        [
            '9a2f2e7b-40c4-4c5f-a37c-baf722e18ab9',
            {
                id: '9a2f2e7b-40c4-4c5f-a37c-baf722e18ab9',
                nombre: 'Tienda Central',
                direccion: 'Calle Principal 123',
            },
        ],
        [
            '9a2f2e7b-40c4-4c5f-a37c-baf722e18aba',
            {
                id: '9a2f2e7b-40c4-4c5f-a37c-baf722e18aba',
                nombre: 'Tienda Norte',
                direccion: 'Avenida Norte 456',
            },
        ],
        [
            '9a2f2e7b-40c4-4c5f-a37c-baf722e18abb',
            {
                id: '9a2f2e7b-40c4-4c5f-a37c-baf722e18abb',
                nombre: 'Tienda Sur',
                direccion: 'Boulevard Sur 789',
            },
        ],
    ]);
    async findById(id) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return this.tiendas.get(id) || null;
    }
    async exists(id) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return this.tiendas.has(id);
    }
};
exports.TiendaClientMock = TiendaClientMock;
exports.TiendaClientMock = TiendaClientMock = __decorate([
    (0, common_1.Injectable)()
], TiendaClientMock);
//# sourceMappingURL=tienda.client.mock.js.map