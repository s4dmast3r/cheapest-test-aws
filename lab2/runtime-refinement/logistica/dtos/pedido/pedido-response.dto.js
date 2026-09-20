"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoResponseDto = exports.ItemPedidoResponseDto = void 0;
class ItemPedidoResponseDto {
    id;
    pedidoId;
    productoId;
    cantidad;
    precioUnitario;
    descuento;
    monedaId;
    lote;
    fechaVencimiento;
    createdAt;
    updatedAt;
}
exports.ItemPedidoResponseDto = ItemPedidoResponseDto;
class PedidoResponseDto {
    id;
    identificador;
    tiendaId;
    fechaHoraCreacion;
    montoTotal;
    monedaId;
    estado;
    items;
    createdAt;
    updatedAt;
}
exports.PedidoResponseDto = PedidoResponseDto;
//# sourceMappingURL=pedido-response.dto.js.map