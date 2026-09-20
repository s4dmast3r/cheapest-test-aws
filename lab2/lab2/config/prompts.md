# Registro del uso de IA

## Instrucción recibida
El usuario pidió continuar el laboratorio desde su repositorio local y su rama propia; seguir `lab_2_pruebas_carga.md` y `lab_2_warmup.md`; revisar YAML y seeder; diseñar datos no uniformes para GET/ASR1 y POST/ASR2; levantar PostgreSQL/NestJS; verificar health; ejecutar JMeter hasta 450 y Python por encima; conservar CSV/logs/capturas; analizar los cuatro archivos reales de endpoints/proveedor; responder preguntas 1 a 4 y producir DOCX y ZIP.

## Especificación aplicada por el agente al generar el script
Generar un cliente Python async con una sola dependencia aiohttp. Permitir endpoint GET o POST, users, ramp-up, duration, body, timeout y output. Cada usuario comienza escalonadamente dentro del ramp-up y repite hasta terminar una meseta adicional de 60 segundos. POST debe usar más de 20 ítems y un identificador único por solicitud. Registrar timestamp UTC, método, endpoint, código HTTP, latencia, error, fase, usuario y bytes. Exportar CSV por corrida y JSON con conteo, promedio, p95, p99, throughput y error. Incluir errores HTTP, timeouts y conexiones. Medir retraso del event loop y concurrencia observada para detectar límites del generador. No confundir incorporación de usuarios con requests/s. Validar el registro de errores contra un servidor local controlado.

Esta especificación documenta las decisiones de generación del asistente en esta conversación; no se presenta como una conversación adicional con Copilot. Las mediciones se obtienen de ejecuciones reales, no de respuestas del modelo.
