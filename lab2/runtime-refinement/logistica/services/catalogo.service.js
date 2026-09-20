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
exports.CatalogoService = void 0;
const common_1 = require("@nestjs/common");
const clients_1 = require("../clients");
const repositories_1 = require("../repositories");
let CatalogoService = class CatalogoService {
    catalogoRepository;
    tiendaClient;
    constructor(catalogoRepository, tiendaClient) {
        this.catalogoRepository = catalogoRepository;
        this.tiendaClient = tiendaClient;
    }
    async create(dto) {
        const tiendaExists = await this.tiendaClient.exists(dto.tiendaId);
        if (!tiendaExists) {
            throw new common_1.BadRequestException(`Tienda con id ${dto.tiendaId} no existe`);
        }
        const catalogo = await this.catalogoRepository.create(dto);
        return this.mapToResponse(catalogo);
    }
    async findAll(query) {
        const catalogos = await this.catalogoRepository.findAll(query);
        return catalogos.map((catalogo) => this.mapToResponse(catalogo));
    }
    async findById(id) {
        const catalogo = await this.catalogoRepository.findById(id);
        if (!catalogo) {
            throw new common_1.NotFoundException(`Catalogo con id ${id} no encontrado`);
        }
        return this.mapToResponse(catalogo);
    }
    async update(id, dto) {
        const catalogo = await this.catalogoRepository.findById(id);
        if (!catalogo) {
            throw new common_1.NotFoundException(`Catalogo con id ${id} no encontrado`);
        }
        const updatedCatalogo = await this.catalogoRepository.update(id, dto);
        return this.mapToResponse(updatedCatalogo);
    }
    async delete(id) {
        const catalogo = await this.catalogoRepository.findById(id);
        if (!catalogo) {
            throw new common_1.NotFoundException(`Catalogo con id ${id} no encontrado`);
        }
        await this.catalogoRepository.delete(id);
    }
    mapToResponse(catalogo) {
        return {
            id: catalogo.id,
            tiendaId: catalogo.tiendaId,
            vigenciaDesde: catalogo.vigenciaDesde,
            vigenciaHasta: catalogo.vigenciaHasta,
            zona: catalogo.zona,
            createdAt: catalogo.createdAt,
            updatedAt: catalogo.updatedAt,
        };
    }
};
exports.CatalogoService = CatalogoService;
exports.CatalogoService = CatalogoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.CatalogoRepository,
        clients_1.TiendaClientMock])
], CatalogoService);
//# sourceMappingURL=catalogo.service.js.map