# Qué falta en el Informe del Laboratorio 2 y qué debes hacer

Este documento resume los ajustes que faltan para que el informe del **Laboratorio 2 — Pruebas de carga al monolito de Cheapest** quede alineado con la guía del laboratorio y con la evidencia que ya aparece en `Informe_Lab2.docx`.

---

## 1. Completar todas las corridas experimentales

### Problema actual
La tabla de resultados del informe está incompleta.

En el documento aparecen resultados principalmente del **GET**, pero la guía exige evaluar **GET y POST por separado** y completar la matriz mínima de pruebas.

### Qué debes hacer

Debes tener, por cada endpoint:

| Escenario | Repeticiones mínimas |
|---|---:|
| Smoke test | 1 |
| Baja carga | 1 |
| Carga media | 1 |
| Operación normal | 5 |
| Alta carga | 3 |
| Muy alta carga | 3 |
| Estrés | 3 |
| Estrés fuerte / pico | 5 |

Esto implica aproximadamente:

- **22 corridas GET**
- **22 corridas POST**
- **44 corridas totales**

### En tu informe actual falta especialmente

- Completar las 3 corridas de **Muy alta carga GET**.
- Agregar las corridas de **Estrés GET**.
- Agregar las corridas de **Estrés fuerte GET**.
- Agregar toda la evidencia y resultados del **POST**.
- Verificar que cada corrida tenga resultados consistentes y comparables.

---

## 2. Agregar p95 a la tabla de resultados

### Problema actual
La tabla actual incluye:

- p99
- throughput
- Error %

pero no incluye **p95**.

### Qué debes hacer

La tabla final debe tener como mínimo:

| Escenario | Endpoint | Corrida | Threads / users | Ramp-up | Duración | p99 (ms) | p95 (ms) | Throughput | Error % |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|

Para JMeter, obtén p95 y p99 desde:

- `Aggregate Report`
- `Percentiles de Latencia`

Para Python, el script debe calcular ambos percentiles.

---

## 3. Incluir resultados completos del POST

### Problema actual
El informe analiza bien el POST a nivel de código, pero no muestra una tabla experimental suficiente para comprobar cómo se comportó realmente bajo carga.

### Qué debes hacer

Para cada escenario POST registra:

- número de usuarios;
- ramp-up;
- duración;
- p95;
- p99;
- throughput;
- Error %.

El criterio principal del ASR 2 es:

> **Error % ≤ 2 %**

Por tanto debes determinar exactamente:

- cuándo empieza a acercarse al 2 %;
- cuándo supera el 2 %;
- si el throughput sigue creciendo o se estanca;
- si el fallo ocurre por timeouts, errores HTTP, conexión, etc.

---

## 4. Corregir la gráfica de errores del POST

### Problema actual
La gráfica `Errores del POST` aparece prácticamente vacía.

Visualmente parece que no existen datos experimentales.

### Qué debes hacer

Regenera la gráfica usando los resultados reales de todas las corridas POST.

Debe mostrar claramente:

- eje X: escenario/carga;
- eje Y: Error %;
- línea de referencia del **2 %**;
- puntos por corrida o mediana/promedio claramente identificados.

Si todos los errores fueran 0 %, igualmente deben aparecer los puntos sobre 0.

---

## 5. Determinar mejor el punto de inflexión

### Problema actual
Actualmente puede afirmarse que:

- con 450 usuarios el GET cumple;
- con 1500 usuarios el GET incumple.

Eso solo demuestra que el quiebre está **entre 450 y 1500 usuarios**.

### Qué debes hacer

Si quieres ubicar mejor el punto de inflexión, agrega pruebas intermedias, por ejemplo:

```text
600
800
1000
1200
1400
```

No tienen que ser exactamente esos valores, pero sí debes reducir el intervalo.

### Qué debes reportar

Algo del estilo:

> El GET cumplió el ASR hasta X usuarios, pero en Y usuarios el p99 superó 1000 ms. Por tanto, el punto de inflexión se ubica entre X y Y usuarios.

Para POST:

> El POST mantuvo Error % por debajo de 2 % hasta X usuarios y lo superó en Y.

Finalmente compara ambos y establece:

> **qué ASR se incumplió primero.**

---

## 6. Agregar evidencia más clara de JMeter

### Problema actual
El informe tiene evidencia útil de JMeter, pero debe quedar más explícitamente alineada con lo que pide la guía.

### Qué debes capturar

#### Configuración
Una captura donde se vea:

- Number of Threads
- Ramp-Up Period
- Loop Count

#### Resultados
Una captura del:

- Summary Report
- Aggregate Report / Percentiles de Latencia

Debe ser legible.

### Importante
No basta con poner la captura.

Cada figura debe tener:

- número;
- título;
- explicación de qué demuestra.

Ejemplo:

> **Figura 4. Aggregate Report del GET en operación normal.** Se observa un p99 de X ms, por debajo del límite de 1000 ms definido por el ASR 1.

---

## 7. Agregar evidencia del script de Python

### Problema actual
El informe menciona las pruebas de Python, pero la evidencia debe quedar más clara.

### Qué debes incluir

Captura del comando utilizado, por ejemplo:

```bash
python load_test.py --endpoint GET --users 1500 --ramp-up 75 --duration 60
```

y captura del resumen final mostrando:

- total requests;
- throughput;
- latencia promedio;
- p95;
- p99;
- Error %.

Haz lo mismo para al menos una corrida significativa de POST.

También conserva:

```text
results_get.csv
results_post.csv
```

y los resultados separados por escenario/corrida.

---

## 8. Separar mejor resultados, análisis y respuestas

### Problema actual
La sección `Análisis y respuestas` mezcla:

- preguntas 1–4;
- análisis experimental;
- cuello de botella;
- arquitectura.

El contenido es bueno, pero estructuralmente puede ser más claro.

### Estructura recomendada

```text
1. Introducción y objetivos
2. ASR evaluados
3. Entorno y reproducibilidad
4. Diseño y distribución de datos
5. Diseño experimental
6. Resultados
7. Análisis de resultados
8. Análisis del cuello de botella
9. Respuestas a las preguntas 1–4
10. Propuestas arquitectónicas
11. Conclusiones
12. Prompts utilizados
13. Anexos
```

---

## 9. Crear una sección formal de análisis de resultados

Debe responder directamente:

### Punto de inflexión
- ¿En qué nivel de carga ocurrió?
- ¿Qué valor lo demuestra?
- ¿Qué ASR se rompió primero?

### Degradación
- ¿Fue gradual?
- ¿Fue abrupta?
- ¿Hubo estabilización del throughput?

### Comparación GET vs POST
- ¿Cuál degradó primero?
- ¿Por qué?

### Distribución de datos
- ¿Qué seed se utilizó para GET?
- ¿Qué seed se utilizó para POST?
- ¿Por qué esas distribuciones eran adecuadas?

---

## 10. Fortalecer el análisis del cuello de botella con evidencia

Tu análisis conceptual ya va bien, pero debes conectar cada afirmación con los resultados.

### GET

Explicar:

- el trabajo principal se ejecuta dentro de PostgreSQL;
- existen tres `EXISTS`;
- faltan índices relevantes;
- el crecimiento del histórico aumenta el costo;
- el pool de conexiones también puede introducir espera.

No debes afirmar automáticamente que los `EXISTS` son el único cuello de botella.

### POST

Explicar:

- se realiza validación secuencial de productos;
- existe una lectura por cada ítem antes del guardado;
- un pedido de 24 ítems genera 24 lecturas secuenciales de validación;
- el pool por defecto de `pg` tiene 10 conexiones;
- la alta concurrencia puede producir espera de conexión.

Distingue siempre entre:

- lo confirmado por el código;
- lo observado experimentalmente;
- lo que es una hipótesis.

---

## 11. Agregar una sección formal de conclusiones

Actualmente falta una conclusión claramente separada.

### La conclusión debe responder

1. ¿Cuál fue el punto de inflexión?
2. ¿Qué ASR falló primero?
3. ¿Qué endpoint degradó primero?
4. ¿Cuál fue el cuello de botella dominante?
5. ¿Qué mejora implementarías primero?
6. ¿El monolito favoreció o perjudicó los ASR?
7. ¿Qué limitaciones tuvo el experimento local?

No repitas simplemente los resultados.

La conclusión debe interpretar la evidencia.

---

## 12. Incluir explícitamente los prompts usados

### Problema actual
El informe menciona que los prompts están en la carpeta de entrega, pero la guía pide incluirlos también en el informe.

### Qué debes hacer

Crear una sección como:

```text
12. Prompts utilizados
```

o:

```text
Anexo A — Prompt para generación del script de carga
```

Pega el prompt completo utilizado para producir `load_test.py`.

Si utilizaste prompts adicionales relevantes para:

- análisis;
- gráficas;
- modificación del script;

puedes incluirlos también.

---

## 13. Mejorar el formato de las tablas

### Problema actual
La tabla de resultados se está partiendo visualmente.

Ejemplos:

```text
Escenari
o
```

o valores divididos en dos líneas.

### Qué debes hacer

Para la tabla principal:

- usar página horizontal;
- reducir márgenes;
- ajustar anchos;
- usar fuente ligeramente menor;
- evitar saltos dentro de números;
- repetir encabezado si la tabla ocupa varias páginas.

Si es necesario, divide en:

- Tabla resultados GET
- Tabla resultados POST

Eso probablemente será más legible.

---

## 14. Mejorar las gráficas

Las gráficas deben permitir comparar claramente los ASR.

### GET

Gráfica:

```text
p99 vs carga
```

Debe incluir línea horizontal:

```text
1000 ms
```

### POST

Gráfica:

```text
Error % vs carga
```

Debe incluir línea horizontal:

```text
2 %
```

### Throughput

Úsala para mostrar:

- crecimiento;
- saturación;
- caída;
- estabilización.

Evita mezclar modelos de carga distintos sin explicarlo claramente.

---

## 15. Verificar consistencia entre texto y resultados

Antes de entregar revisa afirmaciones como:

> “El POST se ejecutó…”

y verifica que efectivamente aparezcan sus resultados.

También evita escribir:

> “El punto de inflexión fue 1500”

si solo sabes que:

```text
450 cumple
1500 incumple
```

En ese caso escribe:

> “El punto de inflexión se encuentra entre 450 y 1500 usuarios.”

---

# Checklist final del informe

Antes de entregar, todo esto debe quedar en `Sí`.

| Elemento | Listo |
|---|---|
| Objetivo del laboratorio | ☐ |
| ASR 1 documentado | ☐ |
| ASR 2 documentado | ☐ |
| Seed GET documentado | ☐ |
| Seed POST documentado | ☐ |
| Distribución Pareto justificada | ☐ |
| Smoke GET | ☐ |
| Baja GET | ☐ |
| Media GET | ☐ |
| Normal GET ×5 | ☐ |
| Alta GET ×3 | ☐ |
| Muy alta GET ×3 | ☐ |
| Estrés GET ×3 | ☐ |
| Pico GET ×5 | ☐ |
| Smoke POST | ☐ |
| Baja POST | ☐ |
| Media POST | ☐ |
| Normal POST ×5 | ☐ |
| Alta POST ×3 | ☐ |
| Muy alta POST ×3 | ☐ |
| Estrés POST ×3 | ☐ |
| Pico POST ×5 | ☐ |
| p95 reportado | ☐ |
| p99 reportado | ☐ |
| Throughput reportado | ☐ |
| Error % reportado | ☐ |
| Capturas JMeter configuración | ☐ |
| Capturas Summary Report | ☐ |
| Capturas Aggregate Report | ☐ |
| Capturas script Python | ☐ |
| CSV de resultados | ☐ |
| Gráfica p99 GET | ☐ |
| Gráfica Error % POST | ☐ |
| Gráfica throughput | ☐ |
| Punto de inflexión identificado | ☐ |
| Comparación GET vs POST | ☐ |
| Cuello de botella explicado | ☐ |
| Pregunta 1 respondida | ☐ |
| Pregunta 2 respondida | ☐ |
| Pregunta 3 respondida | ☐ |
| Pregunta 4 respondida | ☐ |
| Propuestas arquitectónicas | ☐ |
| Conclusiones | ☐ |
| Prompts incluidos | ☐ |
| Referencias | ☐ |

---

# Archivos que debe contener el ZIP final

La entrega debería quedar aproximadamente así:

```text
Lab2_Entrega/
│
├── Informe_Lab2.pdf
│
├── seeds/
│   ├── load-seed-get.yaml
│   └── load-seed-post.yaml
│
├── scripts/
│   ├── load_test.py
│   └── sample_body.json
│
├── resultados/
│   ├── GET/
│   │   └── ...
│   └── POST/
│       └── ...
│
├── graficas/
│   ├── latencia_get.png
│   ├── errores_post.png
│   └── throughput.png
│
└── evidencias/
    ├── jmeter/
    └── python/
```

---

# Prioridad de trabajo

No intentes corregir todo al mismo tiempo.

Hazlo en este orden:

1. **Completar todas las corridas faltantes.**
2. **Completar POST.**
3. **Agregar p95.**
4. **Identificar el punto de inflexión.**
5. **Regenerar gráficas.**
6. **Agregar capturas faltantes.**
7. **Completar análisis de resultados.**
8. **Agregar conclusiones.**
9. **Agregar prompts.**
10. **Arreglar formato del documento.**
11. **Armar el ZIP final.**

La prioridad debe ser la evidencia experimental. El análisis escrito ya está bastante avanzado; lo que más falta actualmente son resultados completos, evidencias y cierre formal del informe.
