# CLAUDE.md · Invitación web XV de Oriana Sofía

## Qué es
Invitación digital (una sola página) para los XV años de **Oriana Sofía**, domingo 1 de noviembre de 2026,
Cartagena. Encargo de **Moisés Escalante** (cliente de JX, tienda Presencia). Se comparte por WhatsApp con
enlaces personalizados por invitado. Hosting: Cloudflare Pages (cuenta de JX), dirección **confirmada**
`https://mis-xv-de-oriana-sofia.pages.dev/` (proyecto de Cloudflare `mis-xv-de-oriana-sofia`).

Estado (12/10/2026): versión 1.2 publicada (v1.1 + **carrusel de fotos y visor a pantalla completa ya
programados**). Por ahora el carrusel solo tiene la foto actual: **faltan las otras 7 fotos y la música nueva**,
que JX aún no ha enviado → ver la sección siguiente.

## 🚦 ESTADO ACTUAL Y QUÉ SIGUE (leer primero en cada sesión)
### Hecho el 11/10/2026
1. La carpeta local quedó conectada al repo de GitHub (`main`) y Cloudflare Pages publica solo al subir a `main`.
2. Dominio final en `canonical`, `og:url`, `og:image` y `twitter:image`. Era la causa de que WhatsApp no mostrara
   la vista previa: apuntaban a `xv-oriana-sofia.pages.dev`, que **no existe**.
3. Versión 1.1, arreglos para celular, probados con Playwright en WebKit (≈ Safari iPhone) y Chromium (≈ Android)
   en 12 perfiles (detalle en el MAPA DEL CÓDIGO → 1.1):
   - Confirmación: la tecla Enter/"Ir" del teclado **ya no envía ni abre WhatsApp antes de tiempo** (pasa al
     siguiente campo); nombres con mayúscula inicial, sin autocorrector.
   - Sobre de entrada: ya no se corta con el celular en horizontal ni en pantallas bajas (si no cabe, se desplaza).
   - Sin zoom accidental por doble toque, sin recuadro gris/azul al tocar y con respuesta visual al presionar.
   - Botón de música sincronizado si el celular pausa el audio (llamada, otra app).
   - Red de seguridad: si `js/script.js` no carga o falla, el sobre se quita solo y la invitación se ve igual.
   - Generador: Enter pasa nombre → pases → WhatsApp; "Copiar" funciona en navegadores internos y ya no deja
     seleccionado el enlace de OTRO invitado cuando falla el portapapeles.

### Hecho el 12/10/2026
4. **Versión 1.2: carrusel de fotos en el arco + visor a pantalla completa**, programado y probado (detalle en el
   MAPA DEL CÓDIGO → 1.2). Se probó con 5 fotos de relleno, solo en una copia fuera del repo, en WebKit y Chromium:
   - Las fotos pasan solas cada 5,5 s con fundido y un acercamiento muy lento; los puntos dorados las siguen.
   - Se puede deslizar con el dedo. Con "reducir movimiento" no pasan solas.
   - Ahorro de datos: antes de abrir el sobre solo baja la primera foto; las demás se piden de a una.
   - Visor: flechas, deslizar, contador, Esc, X, tocar el fondo y el botón "atrás" del celular lo cierran sin
     salir de la invitación. Un doble toque rápido en la X no saca de la página.
   - Hoy tiene **una sola foto** (la actual): no hay puntos ni flechas y la ayuda dice "Toca la foto para verla
     en grande".
   - Sin regresiones en los 12 perfiles de celular.

### Pendiente (en este orden)
1. **Agregar las fotos al carrusel**. El código ya está (v1.2); solo falta el material. Fue un pedido de JX y la
   familia el 11/10/2026: "no una sola foto", que pasen solas y despacio y que se puedan ver en grande.
   - Material: JX lo copia en `C:\Users\jampi\Documents\JX COMPANY\PAGINAS WEBS JX\Material_XV_Oriana` (FUERA del
     proyecto: los JPG/MP4 originales nunca van al repo). Preguntar si ya está. Al 12/10/2026 aún no existe.
   - **Cómo agregarlas** (no hay que tocar el JS):
     1. Convertir cada foto a WebP en `img/` con nombre descriptivo (p. ej. `oriana-sofia-bebe-2011.webp`),
        corrigiendo rotación y recortes.
     2. Agregar en `index.html`, dentro de `#carrusel` y después de la primera foto, una línea por foto en el orden
        en que deben pasar:
        `<img class="carrusel__foto" data-src="img/NOMBRE.webp" width="ANCHO" height="ALTO" alt="DESCRIPCIÓN" decoding="async">`
        Solo la primera lleva `src`, `fetchpriority="high"` y la clase `es-actual`.
     3. Si el arco corta la cara, agregar `style="--enfoque: 50% 15%"` (x% y%; por defecto 50% 30%).
     4. Revisar en celular con el banco de pruebas: arco, visor y que la foto quede entera en el visor.
     Opcional: reemplazar la primera foto (hoy un recorte de 678×904) por la original completa, porque en el visor
     se ve entera.
   - Las 8 fotos (también las pegó en el chat): 1) selfie actual de la portada (original 900×1600); 2) niña
     pequeña sentada con galletas: es una **captura de la galería de Samsung**, hay que recortar la interfaz y
     **rotar 90°** (la foto está de lado); 3) graduación de preescolar con toga azul: **captura con barras negras**
     arriba y abajo, hay que recortarlas; 4) adolescente con vestido gris de lentejuelas, cuerpo entero (1200×1600);
     5) selfie en espejo con vestido beige (960×1280); 6) selfie muy cercana **de lado, hay que rotarla**;
     7) bebé con sombrero blanco con flores, horizontal 1080×722, con fecha impresa 19/10/2012;
     8) bebé de meses con vestido verde y balaca rosada (1080×1443).
   - Diseño (ya implementado en v1.2, mismo diseño de la web): carrusel dentro del arco dorado, puntos dorados y
     ayuda debajo de las flores, visor `<dialog>` con fondo color tinta y botones redondos como el de la música.
     Orden propuesto a JX: primero la foto actual de Oriana y luego de bebé a hoy.
   - Técnica: convertir a WebP en `img/` (regla), conservando la resolución original (para el visor). Usar
     `ImageOps.exif_transpose` de Pillow para corregir la rotación y calidad ~86. `alt` descriptivo por foto, y
     actualizar README y el decision log.
2. **Música nueva** (no les gustó el vals): viene dentro de un **video MP4** en la misma carpeta. Extraer el audio
   con ffmpeg (no hay ffmpeg instalado en el PC; funciona `npm i ffmpeg-static` en una carpeta temporal), quitar
   silencios, fundido de entrada y salida, normalizar volumen (`loudnorm`), MP3 de ~112–128 kbps, reemplazar
   `musica/vals-xv-oriana-sofia.mp3` (o usar un nombre nuevo y actualizar el `src` del `<audio>`). No se puede
   "escuchar": JX la valida en una vista previa (rama distinta de `main`) antes de pasarla a producción.
   Si es una canción comercial, el uso corre por cuenta de la familia (ya lo dice el README). Actualizar los
   textos que hablan del "vals original" (README, CLAUDE.md).
3. **Volver privado el repo de GitHub**: está PÚBLICO y ya tiene la foto de una menor; pronto tendría fotos de
   bebé. Se le propuso a JX el 11/10/2026 y **falta su OK**. Cloudflare sigue publicando con el repo privado.
   Hacerlo ANTES de subir las fotos nuevas:
   `GH_TOKEN="$(gh auth token --user jxenterprise)" gh repo edit jxenterprise/XV_oriana --visibility private --accept-visibility-change-consequences`
4. **Vista previa de WhatsApp**: ya con el dominio correcto, el WhatsApp de JX guardó en caché la tarjeta vacía de
   la dirección raíz. Probar pegando `https://mis-xv-de-oriana-sofia.pages.dev/?v=2` y esperar 5–10 s. Si aun así
   no sale la imagen, hacer una excepción técnica documentada (como el favicon): `og:image` en JPG.
5. Auditoría móvil a fondo: el workflow de 6 revisores del 11/10/2026 **se cortó por el límite de sesión** antes de
   entregar resultados. Lo urgente ya se había corregido en v1.1. Quedan por revisar: modo oscuro forzado (Samsung
   Internet o navegadores internos: probar `color-scheme: only light`), enlace de respaldo de WhatsApp en la misma
   pestaña (navegadores internos), rendimiento en 3G y foco/lectores de pantalla.
6. Pin exacto del punto de encuentro (ver {POR CONFIRMAR} 1).
7. `/CLAUDE.md` y `/README.md` se ven públicamente en el sitio (Cloudflare sirve la raíz del repo tal cual).
   Decidir con JX si se ocultan (por ejemplo con reglas en `_redirects`).

### Cómo probar "en celular" desde el PC
Playwright (`npm i playwright` + `npx playwright install chromium webkit`) con perfiles de dispositivo: WebKit ≈ Safari
de iPhone y Chromium ≈ Android. Perfiles usados: iPhone SE 320×568, SE (3.ª gen.) con barras 375×553, iPhone 15 393×659,
15 Pro Max 430×739, iPhone horizontal 734×343, Galaxy S8 360×740, 360×640, navegador interno 360×600, S9+ 320×658,
Pixel 7 412×839, Fold 280×653 y Android horizontal 740×360. Revisar: sobre sin cortes, desborde lateral 0, toques
≥44 px, consola limpia, Enter no envía, `wa.me` correcto. El banco de pruebas vive **fuera** del repo: no subir
archivos de prueba (punto 18 de la auditoría).

## Repositorio y publicación
- GitHub: `https://github.com/jxenterprise/XV_oriana` (hoy **público**; ver pendiente 3), rama `main`. Commits como `JX Code <jxenterpriseshop@gmail.com>`.
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
  ⚠ **Cambio 11/10/2026**: no les gustó; mandan otra canción dentro de un MP4 (ver pendiente 2).
- Fotos: **una foto en la portada** (la selfie de las 12:04; recortada 678×904, sin retoques).
  Mandaron 8 fotos (varias de bebé/niña): no se usaron porque escogió solo una; se puede ofrecer
  una sección "Así he crecido" si la quieren.
  ⚠ **Cambio 11/10/2026**: ahora quieren TODAS las fotos en un carrusel lento dentro del arco y verlas en
  pantalla completa (ver pendiente 1).
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
2. Portada (`.portada`) — corona, "Mis XV años", carrusel de fotos en el arco (`#carrusel`) con puntos y ayuda
   (`#carrusel-pie`), nombre (único `<h1>`), fecha.
3. Mensaje de Oriana (`#mensaje`).
4. Cuenta regresiva + Guarda la fecha (`#cuenta`).
5. El gran día: fecha, hora, plan, punto de encuentro y mapa (`#detalles`).
6. Código de vestuario (`#vestuario`).
7. Lluvia de sobres (`#regalo`).
8. Confirmación por WhatsApp (`#confirmar`).
9. Cierre + crédito JX Company (`footer.cierre`).
10. Visor de fotos a pantalla completa (`<dialog id="visor">`), cerrado hasta que tocan una foto.
11. Botón flotante de música (`#boton-musica`) y `<audio id="audio-vals">`.

## Dónde editar cada cosa
- Textos del mensaje → `index.html`, zona TEXTOS.
- Fecha/hora/plan → `index.html`, zona HORARIOS (+ `data-fecha-evento` y `data-fecha-texto` en `#reloj`,
  enlace de Google Calendar, `evento-xv-oriana-sofia.ics`, `<head>`, `img/og-xv-oriana-sofia.webp`, tarjeta).
- Dirección / mapa / WhatsApp → `index.html`, zona CONTACTO (`#datos-evento`: `data-whatsapp`, `data-direccion-mapa`).
- Mensajes de WhatsApp (confirmación) → `js/script.js`, función `iniciarConfirmacion()`.
- Mensaje que envía el generador → `js/generador.js`, función `mensajeSugerido()`.
- Colores, tipografías, tamaños → `css/styles.css`, bloque `:root`.
- Fotos del carrusel (y del visor) → `index.html`, comentario "CARRUSEL DE FOTOS" en la portada: una
  `<img class="carrusel__foto">` por foto, en orden. El JS no se toca.
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

### 11/10/2026 — versión 1.1 (ajustes para celular)
- **js/arranque.js**: además de `no-js` → `js`, tiene una red de seguridad. En el evento `load`, si
  `window.__XV_SOBRE_LISTO__` no es `true` (script.js no cargó o falló antes de preparar el sobre), vuelve a
  `no-js`, quita `body.con-portal` y el `inert` de portada/main/cierre: la invitación se ve completa sin sobre.
- **js/script.js**:
  - Arranque: `document` escucha `touchstart` (pasivo); sin eso iPhone no pinta los `:active`. Después de
    `iniciarSobre()` marca `window.__XV_SOBRE_LISTO__ = true`; cuenta, mapa y confirmación arrancan cada uno
    con su propio `try/catch` (si uno falla, los demás siguen).
  - `iniciarMusica()`: escucha `play`/`pause` del `<audio>`. Si el sistema pausa con la página visible
    (llamada, otra app), `quiereSonar = false` y el botón pasa a "Reproducir"; con la página oculta no cambia,
    para que al volver retome.
  - `iniciarConfirmacion()`: `alPulsarEnter(campo, siguiente)`. Enter en `#nombre` enfoca la opción marcada
    de "¿Asistirás?" y Enter en `#personas` ajusta el número y enfoca `#mensajito`. Solo el botón envía.
    Antes, la tecla "Ir" del celular enviaba el formulario y abría WhatsApp a medio llenar.
- **index.html**: `#nombre` con `autocapitalize="words" autocorrect="off" spellcheck="false" enterkeyhint="next"`;
  `#personas` con `enterkeyhint="next"`.
- **css/styles.css**:
  - `html { touch-action: manipulation }`: sin zoom por doble toque; el zoom con dos dedos sigue.
  - `-webkit-tap-highlight-color: transparent` en `a, button, label, input, textarea`, compensado con `:active`
    en `.boton*`, `.sello`, `.contador__boton`, `.opcion`, `.musica`, `.gen__mini` y `.desliza`. Usa los mismos
    colores del `:hover`, más un `scale(.95–.98)`.
  - Sobre: `.js .portal` con `overflow-y: auto` + `overscroll-behavior: contain` + `user-select: none` (sin
    `place-items: center`), y `.portal__marco { margin: auto }`. Así centra si cabe y, si no, empieza arriba y
    se desplaza, sin cortar el título.
  - `.sobre`: ancho con respaldo en `vh` antes de la regla con `svh`; sin respaldo, en navegadores viejos el
    sobre medía 0.
  - `@media (max-height: 560px)` (horizontal o navegador interno bajo): columna de 620 px, nombre más pequeño,
    sobre a `40svh × 1.45` y menos relleno. Probado sin cortes en 734×343 y 740×360.
- **generador.html / js/generador.js**:
  - Enter pasa nombre → pases → WhatsApp, y desde el WhatsApp crea el enlace (`enterkeyhint` next/next/go).
    Antes se creaba con los pases sin revisar y quedaba repetido en la lista.
  - `copiar(texto)`: primero el portapapeles moderno; si no, un `<textarea>` temporal + `execCommand('copy')`
    (navegadores internos); si tampoco, selecciona el enlace de arriba solo si es el mismo texto y, si no,
    usa `prompt()` con el enlace correcto.

### 12/10/2026 — versión 1.2 (carrusel de fotos + visor a pantalla completa)
- **index.html**:
  - Sprite con `#i-cerrar`, `#i-anterior` e `#i-siguiente`.
  - En la portada, `.arco__foto` ahora es `#carrusel` (`role="group"`, `aria-roledescription="carrusel"`) con las
    `img.carrusel__foto` y un botón transparente `#carrusel-ver` encima, que abre el visor.
  - Debajo de la figura está `#carrusel-pie` (`hidden` sin JS), con `#carrusel-puntos` (los crea el JS) y la
    ayuda `#carrusel-ayuda`.
  - Antes de la música está el `<dialog id="visor">`: `#visor-foto`, `#visor-contador` (aria-live) y los botones
    `#visor-cerrar`, `#visor-anterior` y `#visor-siguiente`.
- **js/script.js**:
  - `iniciarSobre().terminar()` dispara `document` → `invitacion:abierta`.
  - Módulo nuevo `iniciarFotos()`, con try/catch propio en el arranque. Lee las fotos del HTML.
  - `cargar(img)`: pasa `data-src` a `src` solo cuando hace falta. Si una foto falla, `quitarRota()` la saca del
    carrusel, salvo la primera.
  - `mostrar(i)`: fundido, `aria-hidden` en las fotos que no se ven y precarga la siguiente.
  - `programar()`: avanza cada `PASO_MS` = 5500 solo si hay más de una foto, ya se abrió el sobre, la portada se ve
    (IntersectionObserver), la pestaña está visible, el visor está cerrado y no se pidió `reducirMovimiento`.
  - `alDeslizar(el, fn)`: gesto lateral de más de 40 px, que debe ser más horizontal que vertical.
  - Visor: `showModal()` + `history.pushState({visorXV})`. `cerrarVisor()` hace `history.back()` y `popstate`
    cierra el visor, así la X, Esc, tocar el fondo y "atrás" hacen lo mismo. La bandera `cerrando` evita dos
    `back()` seguidos. El respaldo `esperaCierre` (700 ms) se cancela en `close`: si no, cerraba el visor cuando
    lo volvían a abrir rápido (bug encontrado en las pruebas).
  - Al cerrar el visor, el arco sigue desde la foto que estaban viendo y el foco vuelve a `#carrusel-ver`.
  - `touchmove` de un dedo bloqueado dentro del visor, para que no se mueva la página de atrás; el zoom con dos
    dedos sigue. Si el navegador no tiene `<dialog>`, abre la foto sola con `abrirEnlace`.
- **css/styles.css**:
  - `:root --velo-tinta` (fondo del visor).
  - `.portada__contenido { --arco-ancho }` reemplaza los `width` sueltos de `.arco` en los breakpoints. Con esa
    variable, `.carrusel__pie` queda justo bajo las flores (`margin-top: --arco-ancho × .17`).
  - `.carrusel__foto` va apilada con `opacity` (1,8 s). La primera queda en el flujo para dar el alto aunque el
    navegador no conozca `aspect-ratio`. `object-position: var(--enfoque, 50% 30%)`.
  - `.carrusel--anima` hace un acercamiento lento (`@keyframes acercar`) solo sin "reducir movimiento".
  - `.arco__foto::after` lleva `pointer-events: none` para no tapar el botón.
  - Sección "VISOR DE FOTOS": botones de 54 px como `.musica` y `.visor--una`, que oculta flechas y contador con
    una sola foto. `nth-child(7)` tiene retraso en la animación de entrada de la portada (el pie es un hijo nuevo).

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
19. ✅ Cero errores y cero advertencias en consola (v1: Chromium en 360, 390 y 1440 px; v1.1 y v1.2: Playwright con
    WebKit y Chromium en 12 perfiles de celular, de 280 a 430 px y en horizontal, más pruebas del carrusel y el visor).
20. ✅ JS propio mínimo, CSS puro para animaciones, imágenes WebP, foto con `fetchpriority="high"`, resto `lazy`, scripts con `defer`, fuentes con `font-display: swap`.
21. ➖ Páginas legales y banner de cookies — no aplica: versión invitación aprobada por JX (sin analítica ni formularios que guarden datos; el mapa solo carga si el invitado lo pide).
22. ➖ GA4 — no se instala (decisión de la versión invitación).
23. ✅ Panel: opción (c) sin panel + zonas editables (TEXTOS, HORARIOS, CONTACTO) + README/CLAUDE.md + código comentado.
24. ✅ Código fuente completo y sin minificar; README explica propiedad (de la familia), hosting en la cuenta de Cloudflare de JX y cómo transferir.
