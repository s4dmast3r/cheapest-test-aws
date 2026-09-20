"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticaModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../datasources/database.module");
const clients_1 = require("./clients");
const repositories_1 = require("./repositories");
const services_1 = require("./services");
const controllers_1 = require("./controllers");
const repository_providers_1 = require("./repositories/repository.providers");
let LogisticaModule = class LogisticaModule {
};
exports.LogisticaModule = LogisticaModule;
exports.LogisticaModule = LogisticaModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            controllers_1.CatalogoController,
            controllers_1.ProductoController,
            controllers_1.PromocionController,
            controllers_1.PedidoController,
            controllers_1.DespachoController,
            controllers_1.NotaCreditoController,
            controllers_1.DisponibilidadZonaController,
            controllers_1.CatalogoProductoController,
            controllers_1.TenderoController,
        ],
        providers: [
            ...repository_providers_1.repositoryProviders,
            clients_1.TiendaClientMock,
            repositories_1.CatalogoRepository,
            repositories_1.ProductoRepository,
            repositories_1.PromocionRepository,
            repositories_1.PedidoRepository,
            repositories_1.DespachoRepository,
            repositories_1.NotaCreditoRepository,
            repositories_1.DisponibilidadZonaRepository,
            repositories_1.CatalogoProductoRepository,
            services_1.CatalogoService,
            services_1.ProductoService,
            services_1.PromocionService,
            services_1.PedidoService,
            services_1.DespachoService,
            services_1.NotaCreditoService,
            services_1.DisponibilidadZonaService,
            services_1.CatalogoProductoService,
            services_1.TenderoService,
            clients_1.TiendaClientMock,
        ],
        exports: [
            services_1.CatalogoService,
            services_1.ProductoService,
            services_1.PromocionService,
            services_1.PedidoService,
            services_1.DespachoService,
            services_1.NotaCreditoService,
            services_1.DisponibilidadZonaService,
            services_1.CatalogoProductoService,
            services_1.TenderoService,
        ],
    })
], LogisticaModule);
//# sourceMappingURL=logistica.module.js.map