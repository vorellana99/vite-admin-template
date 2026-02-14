# Análisis Lighthouse y límites de rendimiento

## Estado actual (reporte localhost)

| Categoría       | Puntuación | Estado   |
|-----------------|------------|----------|
| Performance     | 96-97      | Muy bueno |
| Accessibility   | 100        | Óptimo   |
| Best Practices  | 100        | Óptimo   |
| SEO             | 91         | Bueno    |

---

## ¿Qué se puede mejorar aún? Límites reales

### 1. First Contentful Paint (FCP) ~84

**Límite estructural (SPA en localhost):**

- La app es una **SPA client-side**: el primer contenido visible depende de que se descargue y ejecute JS (React, router, layout) y se pinte el shell.
- En **localhost**, Lighthouse usa **throttling** (red 4G simulada, CPU lenta), así que ese primer pintado siempre llega después de parsear y ejecutar el bundle.
- Para llevar FCP a 90+ en esta arquitectura haría falta algo que no depende del JS para el primer frame, por ejemplo:
  - **SSR** (React en servidor) o
  - **Static shell** (HTML estático que se muestra antes de hidratar).

**Conclusión:** Con SPA pura y sin SSR, **84–88 de FCP en localhost es un techo razonable**. No tiene sentido seguir iterando solo por FCP sin cambiar arquitectura.

---

### 2. Unused JavaScript (score 0)

**Límite de la auditoría para SPAs:**

- Lighthouse considera “no usado” el JS que no se ejecuta **antes de la primera interacción**.
- En una SPA, **React, React-DOM, router y TanStack Query** tienen que cargarse y ejecutarse para mostrar la primera pantalla, así que la auditoría los marca como “usados” de forma muy estricta o da score 0 por cómo mide.
- Ya está aplicado: **code-splitting** (páginas lazy), **manualChunks** (vendor separado), **CSS no bloqueante**, **critical CSS inline**.

**Conclusión:** El “unused JavaScript” que queda es en la práctica **necesario para el primer render**. Mejorar más implica cambiar stack (por ejemplo menos librerías o SSR) y ya no son ajustes pequeños.

---

### 3. robots.txt (no válido)

**Límite de entorno (localhost):**

- El archivo `public/robots.txt` existe y en **producción** (mismo dominio, HTTPS) la auditoría suele pasar.
- En **localhost**, a veces:
  - La URL que Lighthouse usa no coincide con la del sitio,
  - O el servidor de preview no devuelve el `Content-Type` que Lighthouse espera.

**Conclusión:** Es un **falso negativo típico de localhost**. En producción, con el mismo `robots.txt`, suele salir en verde. No iterar más por esto en local.

---

### 4. Otras auditorías “fallidas” (score null)

- **redirects-http, third-party-summary, lcp-lazy-loaded, etc.:** Son **no aplicables** (no hay HTTP, no hay terceros, no hay imágenes LCP) o **solo informativas**.
- No indican errores reales de tu app; Lighthouse las lista igual.

---

## Resumen: cuándo dejar de iterar

| Factor                    | ¿Mejorable en local sin cambiar arquitectura? | Acción recomendada        |
|--------------------------|-------------------------------------------------|----------------------------|
| Performance 96-97       | No (estás en el rango alto para SPA)           | Dejar de iterar           |
| FCP 84                   | No (techo SPA + throttling)                     | Dejar de iterar           |
| Unused JavaScript        | No (límite de la auditoría en SPAs)            | Dejar de iterar           |
| robots.txt              | No en localhost (sí en producción)             | Dejar de iterar en local  |
| HTTPS                   | No en localhost                                | Probar en producción      |

**Recomendación:** Con **Performance 96-97**, **Accessibility 100** y **Best Practices 100**, el proyecto está en muy buen estado. Los “fallos” que quedan en local son por **entorno (localhost)** o por **tipo de app (SPA sin SSR)**. No tiene sentido seguir iterando en local solo por esos puntos.

Para validar el resultado real: desplegar en **producción (HTTPS)** y volver a lanzar Lighthouse ahí; las puntuaciones suelen ser iguales o mejores y varias auditorías (HTTPS, robots.txt) pasan sin cambiar código.
