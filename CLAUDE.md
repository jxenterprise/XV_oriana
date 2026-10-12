# CLAUDE.md · Invitación web XV de Oriana Sofía

## Qué es
Invitación digital (una sola página) para los XV años de **Oriana Sofía**, domingo 1 de noviembre de 2026,
Cartagena. Encargo de **Moisés Escalante** (cliente de JX, tienda Presencia). Se comparte por WhatsApp con
enlaces personalizados por invitado. Hosting: Cloudflare Pages (cuenta de JX), dirección **confirmada**
`https://mis-xv-de-oriana-sofia.pages.dev/` (proyecto de Cloudflare `mis-xv-de-oriana-sofia`).

Estado (11/10/2026): versión completa entregada (ZIP + vista previa + tarjeta cuadrada en WebP) y publicada.

## Repositorio y publicación
- GitHub: `https://github.com/jxenterprise/XV_oriana` (público), rama `main`. Commits como `JX Code <jxenterpriseshop@gmail.com>`.
- Cloudflare Pages está **conectado al repo**: cada `push` a `main` publica en producción en 1–2 minutos
  (lo confirma el check "Cloudflare Pages" del commit en GitHub). Una rama distinta de `main` genera una
  vista previa en `https://<rama>.mis-xv-de-oriana-sofia.pages.dev` sin tocar producción.
- Sin paso de compilación: Cloudflare sirve la raíz del repo tal cual.
- Push desde este PC: si la cuenta activa de `gh` no es `jxenterprise` (solo tiene lectura), subir con
  `GH_TOKEN="$(gh auth token --user jxenterprise)" git push`.
- `evento-xv-oriana-sofia.ics` va con saltos de línea CRLF (estándar de calendarios) y el repo local usa
  `core.autocrlf=input`: no convertirlo a LF.

## Decisiones tomadas (respuestas de Oriana, vía JX, 10/10/2026)
- Estilo: **Princesa lila y dorado** (corona, flores en acuarela, filetes dorados). Modo de diseño 2 (libre),
  paleta lila tomada de la referencia de Canva que mandó la familia.
- Plan: **pasadía con piscina**; punto de encuentro antes de las 7:00 a. m. (el destino no se publica).
- Invitación personalizada: **nombre + número de pases** (parámetros `?para=` y `&pases=`), con generador.
- Confirmaciones al WhatsApp **573157800663** (315 780 0663). **Sin fecha límite** para confirmar.
- Música: **instrumental suave tipo vals** → vals original compuesto para el proyecto (sin derechos de terceros).
- Fotos: **una foto en la portada** (la selfie de las 12:04; recortada 678×904, sin retoques).
  Mandaron 8 fotos (varias de bebé/niña): no se usaron porque escogió solo una; se puede ofrecer
  una sección "Así he crecido" si la quieren.
- Secciones extra elegidas: **agregar al calendario** y **mensajito para Oriana**. No eligieron itinerario,
  padres/padrinos, hashtag ni "qué llevar" (el recordatorio del traje de baño se mantiene en el vestuario,
  porque venía en la invitación original).
- Tarjeta en imagen: **cuadrada** (1080×1080, WebP), se entrega aparte (no va dentro del sitio).
- Entrega: **versión invitación** en Cloudflare Pages gratis, aprobada por JX: privada (noindex), sin páginas
  legales, sin banner de cookies, sin GA4, sin versión en inglés, sin sitemap ni llms.txt, sin JSON-LD.
  La confirmación va en su propia sección (no hay botón flotante de WhatsApp); el flotante es el de la música.
- Dirección: la de la invitación de Canva, tal cual: "Barrio España, TR 44 calle 26D12".
- Textos corregidos de la versión de Canva: "sin embargos" → "sin embargo, si", "a travez" → "a través",
  "Semi- formal" → "semiformal", "7am" → "7:00 a. m.".

## {POR CONFIRMAR} pendientes
1. **Pin exacto del punto de encuentro**: el mapa busca "Transversal 44 #26D-12, España, Cartagena".
   Verificar que Google Maps/Waze caigan en la casa correcta; si no, pedir a la familia el enlace de
   Google Maps y ponerlo en `data-direccion-mapa` (zona CONTACTO).
2. ~~Dirección final del sitio~~ ✅ resuelto el 11/10/2026: `https://mis-xv-de-oriana-sofia.pages.dev/`, ya puesta en
   `canonical`, `og:url`, `og:image` y `twitter:image` del `<head>` de `index.html`. El `UID` del `.ics` conserva
   el dominio viejo a propósito: es solo un identificador y cambiarlo duplicaría el evento a quien ya lo guardó.

## Estructura de secciones (index.html)
1. Portal / sobre animado (`#portal`) — sello de cera, nombre y pases del invitado.
2. Portada (`.portada`) — corona, "Mis XV años", foto en arco, nombre (único `<h1>`), fecha.
3. Mensaje de Oriana (`#mensaje`).
4. Cuenta regresiva + Guarda la fecha (`#cuenta`).
5. El gran día: fecha, hora, plan, punto de encuentro y mapa (`#detalles`).
6. Código de vestuario (`#vestuario`).
7. Lluvia de sobres (`#regalo`).
8. Confirmación por WhatsApp (`#confirmar`).
9. Cierre + crédito JX Company (`footer.cierre`).
10. Botón flotante de música (`#boton-musica`) y `<audio id="audio-vals">`.

## Dónde editar cada cosa
- Textos del mensaje → `index.html`, zona TEXTOS.
- Fecha/hora/plan → `index.html`, zona HORARIOS (+ `data-fecha-evento` y `data-fecha-texto` en `#reloj`,
  enlace de Google Calendar, `evento-xv-oriana-sofia.ics`, `<head>`, `img/og-xv-oriana-sofia.webp`, tarjeta).
- Dirección / mapa / WhatsApp → `index.html`, zona CONTACTO (`#datos-evento`: `data-whatsapp`, `data-direccion-mapa`).
- Mensajes de WhatsApp (confirmación) → `js/script.js`, función `iniciarConfirmacion()`.
- Mensaje que envía el generador → `js/generador.js`, función `mensajeSugerido()`.
- Colores, tipografías, tamaños → `css/styles.css`, bloque `:root`.
- Foto, acuarelas, imagen de vista previa → `img/` (siempre WebP).
- Música → `musica/vals-xv-oriana-sofia.mp3`.

## 🖼️ REGLA DE IMÁGENES — SIEMPRE WebP
Todas las imágenes de este proyecto van en **WebP**, sin excepción. Cualquier foto nueva que JX entregue (JPG, PNG, HEIC, capturas, lo que sea) se **convierte a WebP de inmediato** antes de meterla al proyecto, conservando resolución y calidad originales, y se guarda en `img/`. Nunca dejar JPG/PNG en el proyecto ni entregar copias de respaldo en otros formatos.
**Única excepción técnica**: `favicon` (`.ico`/`.png`/`.svg`) y `apple-touch-icon.png`, porque ningún navegador soporta favicons en WebP.

## 🎨 REGLA DE DISEÑO — TODO LO NUEVO USA ESTE MISMO DISEÑO
Cualquier sección, componente, botón o página que se agregue a futuro debe usar **exactamente** el diseño de esta web: mismos colores, mismas tipografías, mismos tamaños, radios, sombras y espaciados, y los mismos patrones de componente que ya existen. **Nunca un diseño distinto.** Si algo no alcanza con lo que hay, preguntarle a JX antes de inventar.

**Ficha de diseño de este proyecto:**
- Paleta (variables `:root` de `css/styles.css`):
  - `--papel: #FBF7FC` fondo general (con textura `img/textura-papel-lila.webp`)
  - `--lavanda: #F2E9F9` fondos suaves, chips, opción elegida
  - `--lila: #B99BE0` detalles lila
  - `--lila-medio: #8E6CC4` acentos suaves, íconos
  - `--lila-profundo: #5F3F93` títulos, nombre, botón principal
  - `--tinta: #3B2A50` texto corrido · `--tinta-suave: #6B5B7E` texto secundario
  - `--oro: #B08A3E` filetes, bordes e íconos · `--oro-claro: #E8D29A` · `--oro-oscuro: #8A6A27` textos dorados pequeños
  - `--blanco: #FFFFFF` · `--borde-campo: #D9CCE8` · `--error: #9B2C4F`
  - Degradado dorado de los SVG: `#F7E7B4 → #D8B460 → #B28734 → #E6C77D` (`#g-oro`)
- Tipografías: **Pinyon Script** 400 (nombre, títulos de sección, firmas) y **Cormorant Garamond**
  400/500/600 + itálica 500 (todo lo demás; etiquetas en mayúsculas con letter-spacing .2–.34em).
  Alojadas en `fonts/`. Números con `lining-nums`.
- Tamaños: texto 1.2rem (1.12 en ≤380 px, 1.25 en ≥768, 1.3 en ≥1440); títulos script `clamp(2.6rem, 11vw, 3.6rem)`;
  nombre en portada `clamp(3.4rem, 15vw, 5.4rem)`; etiquetas .8rem.
- Radios: 14px (`--radio`), 22px (`--radio-grande`), tarjetas 26px, botones 999px, arco de la foto
  `50% 50% 0 0 / 37.5% 37.5% 0 0`.
- Sombras: `--sombra` (tarjetas) y `--sombra-suave` (casillas, botones claros).
- Espaciado: secciones `--aire: clamp(3.2rem, 10vw, 4.75rem)` arriba y abajo; margen lateral `--lado: 20px`
  (16px en ≤380); columna de lectura `--ancho: 34rem`.
- Patrones de componente: filete dorado (`<use href="#filete">`) arriba de cada sección; títulos en Pinyon
  Script lila profundo; íconos de línea dorados dentro de círculos con borde dorado (`.dato__icono`);
  tarjetas blancas con doble filete dorado (`.tarjeta`); botones píldora (`.boton--principal` lila con filete
  dorado interior, `.boton--linea` borde dorado, `.boton--claro` blanco); manchas de acuarela detrás de secciones
  clave (`img/mancha-acuarela-lila.webp`); ramos en esquinas (`img/ramo-acuarela-lila-*.webp`).
- Modo de diseño usado: **2 — libre, con la paleta de la imagen de referencia** (Canva de la familia).

## 🗂️ ÍNDICE DE ZONAS EDITABLES
- `ZONA EDITABLE · TEXTOS` (index.html, sección `#mensaje`): intro, mensaje de Oriana, remate y firma. No se repite.
- `ZONA EDITABLE · HORARIOS` (index.html, sección `#detalles`): fecha, hora y plan. ⚠ Se repite en portada,
  `#reloj` (`data-fecha-evento`, `data-fecha-texto`), botón de Google Calendar, `evento-xv-oriana-sofia.ics`,
  description/og:description del `<head>`, `img/og-xv-oriana-sofia.webp` y la tarjeta cuadrada.
- `ZONA EDITABLE · CONTACTO` (index.html, `.encuentro`): dirección visible, `data-direccion-mapa` y
  `data-whatsapp` de `#datos-evento`. ⚠ Se repite en Google Calendar, `.ics` y la tarjeta. Los enlaces de
  Google Maps/Waze se reconstruyen solos desde `data-direccion-mapa` (los `href` del HTML son respaldo sin JS).
Al ampliar la página se respetan estos nombres: nunca inventar marcadores nuevos ni duplicar una zona.

## 🧭 MAPA DEL CÓDIGO
### 11/10/2026 — versión 1 (entrega completa)
- **index.html**: sprite SVG oculto (`.sprite`) con degradados y símbolos `#corona`, `#sello`, `#filete` e íconos
  `#i-*`, reutilizados con `<use>`. Ojo: el sprite no puede llevar `display:none` (se pierden los degradados).
  Portal del sobre, portada, 7 secciones, cierre, botón de música y `<audio>`. Los datos del evento que usa
  el JS viven en atributos `data-*` (no en el JS) para editarlos en un solo lugar.
- **js/arranque.js**: cambia `no-js` por `js` en `<html>` antes de pintar. Sin él, el sobre aparecería tarde
  (parpadeo). Va en el `<head>` sin `defer`.
- **js/script.js** (IIFE, sin dependencias):
  - `leerInvitado()` / `personalizar()`: lee `?para=` (máx. 60 caracteres, limpiado) y `?pases=` (1–20);
    pone nombre y pases en el sobre y el formulario con `textContent` (nunca `innerHTML`: evita inyección).
    Si `window.__VISTA_PREVIA__` es `true` y no hay parámetros, usa "Familia Pérez · 3 pases" de ejemplo.
  - `iniciarMusica()`: `play()` dentro del toque del sello (política de autoplay), fundido de volumen
    (en iPhone el volumen es fijo), pausa al ocultar la pestaña y retoma al volver; el MP3 se precarga
    en el evento `load`.
  - `iniciarSobre()`: secuencia de clases `.portal--abriendo` (720 ms) → `.portal--carta` → `.portal--saliendo`
    (2150 ms) → `terminar()` (2800 ms). Mientras el sobre está abierto, portada/main/cierre quedan `inert`.
    "Saltar al contenido" abre sin animación ni música.
  - `lanzarPetalos()`: 26 `<span class="petalo">` con variables `--dx`/`--r`; se borran al terminar.
  - `iniciarCuenta()`: cuenta hasta `data-fecha-evento` (`2026-11-01T07:00:00-05:00`); el día del evento
    muestra "¡Llegó el gran día!" y después "Gracias por acompañarme en mis XV."
  - `iniciarMapa()`: arma los enlaces de Google Maps/Waze; el iframe de Google solo se crea al tocar
    "Ver mapa aquí" (pone cookies de terceros). En vista previa abre Google Maps en otra pestaña.
  - `iniciarConfirmacion()`: valida nombre, contador limitado a los pases, oculta personas si "No podré ir",
    arma el mensaje (con `data-fecha-texto`) y abre `wa.me/<data-whatsapp>` con un `<a>` real; deja un enlace
    de respaldo y guarda en localStorage `xv-oriana-confirmacion` para avisar que ya confirmó.
- **js/generador.js**: `crearEnlace()` (usa `new URL('./', location.href)`, sirve en cualquier dominio),
  `mensajeSugerido()`, `numeroWhatsApp()` (acepta 10 dígitos colombianos), lista en localStorage
  `xv-oriana-invitaciones` con copiar/quitar y total de pases.
- **css/styles.css**: tokens `:root`; sobre con z-index delicados (dorso 0 < carta 1 < frente 2 < solapa 3 <
  sello 4; al abrir la solapa baja a 0); `[hidden]` con `!important` (los campos con `display:grid` lo
  necesitan); `.cuenta` y `.confirmar` con `overflow:hidden` porque la mancha mide 150% del ancho;
  animación de entrada de la portada al abrir el sobre y movimiento al hacer scroll con
  `animation-timeline: view()` (solo se mueve, nunca queda transparente); todo se apaga con
  `prefers-reduced-motion`. Breakpoints: ≤380, ≤480, ≥600, ≥768, ≥901, ≥1440 y pantallas bajas (≤560 px de alto).
- **img/**: ilustraciones en acuarela generadas por código para el proyecto (ramos, mancha, textura de papel),
  foto de portada, `og-xv-oriana-sofia.webp` (1200×630) para la vista previa de WhatsApp, `favicon.svg` y
  `apple-touch-icon.png` (excepción técnica).
- **musica/vals-xv-oriana-sofia.mp3**: vals original en Sol mayor, 3/4, 104 bpm, timbre de cajita musical,
  ~116 s en bucle, 112 kbps (~1,6 MB).
- **evento-xv-oriana-sofia.ics**: evento de día completo el 1/11/2026 con recordatorio a las 8:00 p. m. del día
  anterior; `_headers` lo sirve como `text/calendar`.
- **Fuentes**: alojadas en `fonts/` en vez de Google Fonts (sin peticiones a terceros, más privacidad y carga
  más rápida en datos móviles). Licencias OFL incluidas.

## Auditoría de 24 puntos (versión invitación)
1. ❌ Dominio propio — no aplica: JX eligió `pages.dev` gratis; canonical/og apuntan a `mis-xv-de-oriana-sofia.pages.dev` (confirmado).
2. ✅ HTML real en el view-source (todo el contenido está en `index.html`).
3. ✅ `404.html` con el diseño de la invitación y botón de regreso.
4. ✅ `<title>` real: "Mis XV años · Oriana Sofía".
5. ✅ Títulos distintos en index, generador y 404.
6. ✅ Meta description propia (~145 caracteres).
7. ✅ Open Graph completo + Twitter Card, `og:image` absoluta 1200×630 en WebP (63 KB).
8. ➖ JSON-LD — no aplica a propósito: es una invitación privada (no se publican datos estructurados de una menor).
9. ✅ Un solo `<h1>` (nombre de la quinceañera).
10. ✅ El `<h1>` existe y describe la página ("Mis XV años · Oriana Sofía").
11. ✅ `<link rel="canonical">` absoluto a `https://mis-xv-de-oriana-sofia.pages.dev/`.
12. ➖ `llms.txt` — no aplica: invitación privada, aprobado por JX.
13. ➖ `robots.txt` bloquea buscadores y bots de IA a propósito (privacidad); permite WhatsApp/Facebook/Telegram para la vista previa.
14. ✅ `favicon.svg` + `apple-touch-icon.png` + `theme-color`.
15. ➖ `sitemap.xml` — no aplica: no debe indexarse.
16. ✅ `lang="es"`, charset UTF-8 y viewport.
17. ✅ `alt` en la foto; las acuarelas son decorativas (`alt=""` + `aria-hidden`).
18. ✅ Sin sourcemaps, `.git`, `node_modules`, `.env` ni archivos de prueba.
19. ✅ Cero errores y cero advertencias en consola (probado con Chromium en 360, 390 y 1440 px).
20. ✅ JS propio mínimo, CSS puro para animaciones, imágenes WebP, foto con `fetchpriority="high"`, resto `lazy`, scripts con `defer`, fuentes con `font-display: swap`.
21. ➖ Páginas legales y banner de cookies — no aplica: versión invitación aprobada por JX (sin analítica ni formularios que guarden datos; el mapa solo carga si el invitado lo pide).
22. ➖ GA4 — no se instala (decisión de la versión invitación).
23. ✅ Panel: opción (c) sin panel + zonas editables (TEXTOS, HORARIOS, CONTACTO) + README/CLAUDE.md + código comentado.
24. ✅ Código fuente completo y sin minificar; README explica propiedad (de la familia), hosting en la cuenta de Cloudflare de JX y cómo transferir.
