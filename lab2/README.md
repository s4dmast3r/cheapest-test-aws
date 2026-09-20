# Laboratorio 2 Cheapest

Trabajo sobre la rama `lab2-jose`, commit inicial `32aeb398c41c1a38b0e606b3cb4e6e628c2f846b`.

## Estructura
- seeds: variantes GET/ASR1 y POST/ASR2; el placeholder se conserva solo para trazabilidad.
- scripts: generador Python, ejecución de campañas y auditoría de datos.
- config: plan JMeter, cuerpos POST, versiones y configuración de cada herramienta.
- raw: CSV originales, resúmenes JSON, logs y auditorías PostgreSQL.
- evidence: capturas reales de la interfaz.
- graphs: gráficas derivadas de los CSV.
- report: informe final.
- reference: guías del laboratorio.

## Diseño previo a las mediciones
75 tiendas representan una red urbana acotada con comercios de distinto volumen. Cinco zonas distinguen un corredor comercial dominante y cuatro zonas de menor densidad. 1800 productos representan un catálogo de distribuidor, con 125 catálogos y 22500 asociaciones. Son supuestos experimentales, no estadísticas observadas de una empresa real.

GET usa 18000 pedidos y 126000 ítems (promedio 7 por pedido) para aumentar el costo de las intersecciones históricas. El 20% de las tiendas recibe aproximadamente el 80% de los pedidos. POST parte de 4500 pedidos, 31500 ítems y 5400 promociones, con peso de cabeza 90%, para modelar concentración comercial. Sus pedidos Python tienen 24 productos distintos y cantidades heterogéneas. Los pedidos JMeter conservan 4 ítems según la guía. Este cambio de tamaño es una variable de confusión explícita al comparar herramientas.

El seeder original aplica Pareto a tienda de pedido, tienda/zona de catálogo, tienda de promoción e ítem/producto. NO aplica Pareto al producto de promoción ni a disponibilidad de zona directamente. La disponibilidad recorre productos y catálogos cíclicamente. Las asociaciones catálogo-producto se completan por pares en orden. Aproximadamente 70% de las promociones generadas están activas. La cabeza de productos depende del orden de UUID: no son SKUs estables entre reseeds. Las fechas históricas se extienden un día por pedido; con 18000 pedidos cubren décadas. La consulta GET no filtra fecha histórica, pero esto limita el realismo temporal. El seeder se conserva para evaluar el código entregado.

## Interpretación de la carga
JMeter: un envío por usuario, ramp-up escalonado, 5/30/100/450 usuarios, 1/1/1/5 repeticiones. Python: modelo cerrado, un request pendiente por usuario, sin pausa entre iteraciones; ramp-up completo y después 60 segundos de meseta. Los valores nominales users/ramp-up de la guía son tasas de incorporación de usuarios, no tasas de peticiones sostenidas. Se mide throughput real y se separa fase ramp/steady. El timeout cliente es 30 segundos. Errores del cliente no prueban por sí solos un defecto del servidor.

La base GET se mantiene sin POST durante su campaña. Antes de POST se recrea únicamente la base de este laboratorio y se vuelve a sembrar. Los POST incrementan su histórico entre corridas: se registran los conteos y se debe considerar este crecimiento al interpretar repeticiones. No se modifican consultas, índices ni pool durante la línea base.

El plan JMeter se reconstruyó a partir de la guía porque el recurso relativo `recursos/load_test.jmx` no estaba incluido entre los archivos adjuntos. Contiene los grupos GET/POST y los cuatro listeners solicitados. La carga se ejecuta en modo no gráfico y se cargan los CSV en los listeners para capturar resultados.

## Reproducción
Desde la raíz del repositorio, copiar la variante elegida a `src/datasources/load-seed.yaml`. Crear una base de laboratorio limpia, ejecutar `npm run build` y `node dist/main.js`. Comprobar `/health`. El build copia el YAML a dist; cambiar solo src sin recompilar no cambia los datos del proceso compilado.

Ejemplo Python (instalar aiohttp):

    python lab2/scripts/load_test.py --endpoint POST --users 1500 --ramp-up 75 --duration 60 --body lab2/config/large_order.json --output results_post.csv

Los cuerpos con UUID generados requieren los productos de la misma semilla/base; regenerar `large_order.json` después de recrear la base. El identificador de pedido y su fecha se actualizan en cada request.
