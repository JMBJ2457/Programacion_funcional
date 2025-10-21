# Reporte rápido del proyecto (tienda_autos)

## Qué construí

- **Página front** en `HTML + CSS + JS` que simula una tienda de autos.
- **Búsqueda** por texto (marca o modelo).
- **Filtro por precio** con **doble slider** (mín/máx) basado en los precios reales de los datos.
- **Tarjetas** con tamaño uniforme, imágenes recortadas a 16:9 y responsive.
- **Disclaimer** en el footer sobre uso educativo de imágenes.

## Estructura del proyecto

```
/tienda_autos/
  ├─ index.html
  ├─ styles/
  │   └─ styles.css
  ├─ js/
  │   ├─ app.js
  │   └─ data.js
  └─ static/
      └─ img/  (imágenes de los autos)
```

## Cosas técnicas que toqué

- **Modularidad**: Separé datos (`data.js`), lógica/UI (`app.js`) y estilos (`styles.css`).
- **Filtro de precio**:
  - Doble slider (`#minRange` y `#maxRange`) con límites dinámicos (se calculan desde `data.js`).
  - Se muestra el rango en vivo (`#minVal` y `#maxVal`) y se evita que las manijas se crucen.
  - Visual: pista con gradiente + glow y manijas sobre la pista (z-index) y centradas.
- **Tarjetas**:
  - Altura consistente con variables CSS: `--card-height` y `--media-height`.
  - Imágenes con `object-fit: cover` y `loading="lazy"`.
- **Accesibilidad** básica: etiquetas `label`, foco visible, semántica en títulos.
- **Footer**: texto de uso educativo y derechos.

## Cómo correrlo

1. Desde la carpeta del repo, lanza un server estático (opciones):
   - Python: `python3 -m http.server 8080 --directory tienda_autos`
2. Abre `http://127.0.0.1:8080` y listo.

## Cómo usar la página

- En “Buscar por marca o modelo” escribe por ejemplo: `Toyota` o `Civic`.
- Ajusta el **rango de precio** moviendo las dos manijas. Las etiquetas de abajo te muestran el valor exacto.
- “Limpiar filtros” resetea todo a valores iniciales.

## Decisiones de diseño

- Fui por un **look oscuro** y limpio, con grilla de 3 columnas (2 y 1 en viewports más pequeños).
- El slider tenía temas de alineación: ajusté centrado vertical y z-index para que las manijas queden **encima** de la pista.
- Mantengo variables CSS para facilitar cambios globales (`--card-height`, `--media-height`, colores, etc.).

## Limitaciones / pendientes

- No hay paginación ni ordenamiento (por precio/año).
- Las imágenes son estáticas y no tienen optimización por tamaño.
- Falta internacionalización completa (solo UI en español y precios en USD formato ES).
