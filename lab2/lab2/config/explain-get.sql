EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT producto.* FROM productos producto
WHERE EXISTS (
 SELECT 1 FROM items_pedido ip JOIN pedidos p ON p.id=ip."pedidoId"
 WHERE ip."productoId"=producto.id AND p."tiendaId"='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb')
AND EXISTS (
 SELECT 1 FROM promociones promo JOIN promocion_tiendas pt ON pt."promocionId"=promo.id
 WHERE promo."productoId"=producto.id AND promo.inicio<=now() AND promo.fin>=now()
 AND pt."tiendaId"='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb')
AND EXISTS (
 SELECT 1 FROM disponibilidad_zona dz JOIN catalogos cat ON cat.id=dz."catalogoId"
 WHERE dz."productoId"=producto.id AND dz."cantidadDisponible">0 AND cat.zona='Zona Norte');
