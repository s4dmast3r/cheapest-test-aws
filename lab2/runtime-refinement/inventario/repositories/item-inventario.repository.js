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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInventarioRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ItemInventarioRepository = class ItemInventarioRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(item) {
        const newItem = this.repository.create(item);
        return this.repository.save(newItem);
    }
    async findAll(query) {
        const queryBuilder = this.repository.createQueryBuilder('item');
        if (query.tiendaId) {
            queryBuilder.andWhere('item.tiendaId = :tiendaId', {
                tiendaId: query.tiendaId,
            });
        }
        if (query.productoId) {
            queryBuilder.andWhere('item.productoId = :productoId', {
                productoId: query.productoId,
            });
        }
        return queryBuilder.getMany();
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findByProductoAndTienda(productoId, tiendaId) {
        return this.repository.findOne({ where: { productoId, tiendaId } });
    }
    async update(id, updates) {
        await this.repository.update(id, updates);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
    async decrementCantidad(id, cantidad) {
        await this.repository.decrement({ id }, 'cantidad', cantidad);
    }
    async incrementCantidad(id, cantidad) {
        await this.repository.increment({ id }, 'cantidad', cantidad);
    }
};
exports.ItemInventarioRepository = ItemInventarioRepository;
exports.ItemInventarioRepository = ItemInventarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ITEM_INVENTARIO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ItemInventarioRepository);
//# sourceMappingURL=item-inventario.repository.js.map