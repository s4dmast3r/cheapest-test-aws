"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioModule = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("./repositories");
const services_1 = require("./services");
const controllers_1 = require("./controllers");
const database_module_1 = require("../datasources/database.module");
const logistica_module_1 = require("../logistica/logistica.module");
const clients_1 = require("./clients");
const repository_providers_1 = require("./repositories/repository.providers");
let InventarioModule = class InventarioModule {
};
exports.InventarioModule = InventarioModule;
exports.InventarioModule = InventarioModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, logistica_module_1.LogisticaModule],
        controllers: [
            controllers_1.ItemInventarioController,
            controllers_1.RegistroVentaController,
            controllers_1.RegistroCompraController,
        ],
        providers: [
            ...repository_providers_1.repositoryProviders,
            repositories_1.ItemInventarioRepository,
            repositories_1.RegistroVentaRepository,
            repositories_1.RegistroCompraRepository,
            services_1.ItemInventarioService,
            services_1.RegistroVentaService,
            services_1.RegistroCompraService,
            clients_1.TiendaClientMock,
        ],
        exports: [services_1.ItemInventarioService, services_1.RegistroVentaService, services_1.RegistroCompraService],
    })
], InventarioModule);
//# sourceMappingURL=inventario.module.js.map