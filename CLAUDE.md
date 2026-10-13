# CLAUDE.md · Invitación web XV de Oriana Sofía

## Qué es
Invitación digital (una sola página) para los XV años de **Oriana Sofía**, domingo 1 de noviembre de 2026,
Cartagena. Encargo de **Moisés Escalante** (cliente de JX, tienda Presencia). Se comparte por WhatsApp con
enlaces personalizados por invitado. Hosting: Cloudflare Pages (cuenta de JX), dirección **confirmada**
`https://mis-xv-de-oriana-sofia.pages.dev/` (proyecto de Cloudflare `mis-xv-de-oriana-sofia`).

Estado (12/10/2026, 11:03 p. m., hora de Colombia): versión 1.4 publicada: **canción nueva completa** (*Lavender's Blue*
en piano, 2:32, en bucle), **fotos en orden de bebé a grande** y **pin exacto del punto de encuentro** (el enlace de
Google Maps que mandó la familia), más una revisión completa de la web. Lo que queda está en "Pendiente", abajo.

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

### Hecho el 12/10/2026 (noche) — versión 1.3: las fotos y la música
5. JX mandó el material en un ZIP (`Fotos y musica.zip`: 8 JPG de WhatsApp + 1 MP4) a la sesión en la nube de
   Claude Code. Los originales se trabajaron en una carpeta temporal y **no están en el repo** (regla).
6. **Las 8 fotos en el carrusel** (orden de la v1.3; **en la v1.4 cambió**, ver punto 10):
   | # | Archivo en `img/` | Tamaño | Arreglo |
   |---|---|---|---|
   | 1 | `oriana-sofia-vestido-gris.webp` | 1200×1600 | ninguno (es la imagen principal: `src` + `fetchpriority="high"`) |
   | 2 | `oriana-sofia-bebe-vestido-verde.webp` | 1080×1443 | ninguno |
   | 3 | `oriana-sofia-bebe-sombrero-2012.webp` | 1080×722 | ninguno (horizontal; la fecha impresa se ve en el visor) |
   | 4 | `oriana-sofia-nina-galletas.webp` | 552×738 | captura de Samsung: recorte de la interfaz (y 524–1076) y giro 90° a la izquierda |
   | 5 | `oriana-sofia-grado-preescolar.webp` | 738×984 | captura: recorte de las barras negras (y 308–1292) |
   | 6 | `oriana-sofia-selfie-rizos.webp` | 1502×1073 | giro 90° a la izquierda (estaba de lado); `--enfoque: 10% 50%` |
   | 7 | `oriana-sofia-vestido-beige.webp` | 960×1280 | ninguno |
   | 8 | `oriana-sofia-selfie-xv.webp` | 900×1600 | original completo de la selfie de las 12:04; `--enfoque: 50% 5%` |
   - Reemplaza a `oriana-sofia-portada-xv.webp` (el recorte 678×904 de la foto 8), que se borró.
   - WebP calidad 86 con Pillow, resolución original, sin retoques. Pesan de 43 KB a 229 KB (la primera, 73 KB).
     Los JPG de WhatsApp no traían orientación EXIF: los giros se decidieron mirando cada foto.
   - Las capturas 4 y 5 son de baja resolución (vienen de pantallazos). Si la familia tiene los archivos
     originales, se cambian por los mismos nombres.
7. **Música nueva**: `musica/cancion-xv-oriana-sofia.mp3` reemplaza al vals (`vals-xv-oriana-sofia.mp3`, borrado).
   - Solo la pista de audio del MP4 (sin imagen ni metadatos): 31,3 s, MP3 128 kbps estéreo 44,1 kHz, 490 KB
     (el vals pesaba 1,6 MB). No tenía silencios: el video empieza y termina cortado en plena canción.
   - `loudnorm` a −14 LUFS / pico −1,5 dBTP (el vals estaba en −13,6: suena igual de fuerte), entrada suave de
     1,2 s y salida en fundido de 3 s, para que al repetirse (`loop`) no haya un corte seco.
   - `<audio id="audio-musica">` (antes `audio-vals`), también en `iniciarMusica()`.
   - JX dio permiso de publicar directo ("automáticamente todo"). Si al escucharla quieren otro corte, más
     duración o más volumen, se rehace desde el MP4 con el mismo comando (ver MAPA DEL CÓDIGO → 1.3).
8. Probado con Playwright en Chromium (≈ Android) en los 12 perfiles: 8 puntos, pasa sola a la 2.ª a los 5,5 s, el
   visor recorre las 8 (todas caben en pantalla), X y "atrás" cierran sin salir, desborde 0, consola limpia,
   la música carga y suena (31,3 s) y antes de abrir el sobre solo se descarga la foto 1. Encuadre del arco
   revisado foto por foto. **WebKit (≈ iPhone) no se pudo probar**: la sesión en la nube solo trae Chromium; el
   JS y el CSS del carrusel no cambiaron desde la v1.2, que sí se probó en WebKit.

### Hecho el 12/10/2026 (11:03 p. m., hora de Colombia) — versión 1.4: canción completa, orden de fotos y mapa
9. **Canción nueva** (la clienta prefirió otra): *Cinderella – Lavender's Blue (Piano Cover by Riyandi Kusuma)*, que JX
   mandó en M4A (AAC 128 kbps, 2:33). Pidieron que suene **completa** y que al terminar vuelva a empezar normal.
   - Mismo archivo `musica/cancion-xv-oriana-sofia.mp3` (Cloudflare sirve con `max-age=0, must-revalidate`: nadie se
     queda con la versión vieja). 2:32 (151,95 s), MP3 128 kbps estéreo 44,1 kHz, 2,4 MB.
   - Solo se quitó el 1,5 s de silencio digital del inicio, para que suene apenas se abre el sobre. **Nada más se
     cortó**: la pausa de ~2 s cerca del final (137–139,6 s) y los 14 s suaves que siguen son el final del arreglo (mismo
     piano y tonalidad, comprobado por análisis de notas) y termina desvaneciéndose solo. Sin fundidos agregados.
   - Volumen: venía en −21,5 LUFS (muy bajo). Ganancia fija +6 dB y limitador suave de picos (`alimiter`), **sin
     comprimir**: quedó en −16 LUFS, pico −2,3 dBFS, sin recortes, conservando la dinámica del piano (LRA 10,8 LU).
     Se descartó `loudnorm` dinámico porque aplastaba la dinámica (LRA 8,5).
   - El `<audio>` ya tenía `loop`: al terminar vuelve a empezar solo.
10. **Orden de las fotos** (pedido de JX: de bebé hasta grandecita y al final las mejores de ya grande). La primera es
    la que se ve al abrir y la única que baja antes del sobre (`src` + `fetchpriority="high"`):
    1) `bebe-vestido-verde` · 2) `bebe-sombrero-2012` · 3) `nina-galletas` · 4) `grado-preescolar` · 5) `selfie-rizos`
    · 6) `selfie-xv` · 7) `vestido-beige` · 8) `vestido-gris` (cierra). Los `--enfoque` de cada foto no cambiaron.
    Tiempos (JX preguntó si pasan cada ~2 s): cada foto se queda **5,5 s** y el fundido entre una y otra dura **1,8 s**;
    a JX le parece bien así, no se cambió.
11. **Punto de encuentro exacto**: la familia mandó `https://maps.app.goo.gl/hCto2jpUpXJwgqsP7`, que es el lugar de
    Google **"Tienda Brisas Del Sur", Cra. 46, Las Lomas, Cartagena** (coordenadas **10.4020598, −75.5113218**, sacadas
    de la búsqueda de Google Maps). La búsqueda vieja por texto ("Transversal 44 #26D-12, España") caía ~425 m más allá.
    - `#datos-evento` (zona CONTACTO) tiene ahora `data-mapa-coordenadas` y `data-mapa-enlace`; `iniciarMapa()` arma con
      ellos el iframe (`q=lat,lng&z=17`), Waze (`ll=lat,lng`) y "Abrir en Google Maps" (el enlace de la familia, que abre
      la ficha del lugar con su nombre). Los `href` del HTML (respaldo sin JS) también apuntan al punto exacto.
    - Texto visible: se dejó la dirección de la invitación ("Barrio España, TR 44 calle 26D12, Cartagena") y se agregó
      debajo "Referencia: Tienda Brisas del Sur" (`.encuentro__ref`: cursiva 500, `--tinta-suave`, como las demás notas).
      **Falta confirmar con JX** si el encuentro es en la casa o en la tienda (ver {POR CONFIRMAR} 1).
    - Google Calendar y `evento-xv-oriana-sofia.ics`: `location` = la tienda (para que el mapa del calendario caiga bien),
      descripción con la dirección, la referencia y el enlace del mapa. El `.ics` ganó `GEO`, `X-APPLE-STRUCTURED-LOCATION`
      (pin en el calendario de iPhone), `URL`, `SEQUENCE:1` y `DTSTAMP` nuevo; mismo `UID`, CRLF y líneas ≤75 octetos.
12. **Repo de GitHub: queda PÚBLICO por decisión de JX** (12/10/2026: "no lo quiero poner privado"). Ya no es pendiente.
13. **Vista previa de WhatsApp: funciona** (captura de JX del 12/10/2026: sale la tarjeta con imagen, título y fecha,
    en WebP; no hizo falta pasarla a JPG). A las 11:21 p. m. JX pidió cambiar la foto de esa tarjeta por la del **vestido
    beige**: `img/og-xv-oriana-sofia-vestido-beige.webp` (1200×630, 69 KB) reemplaza a `og-xv-oriana-sofia.webp` (borrada).
    Nombre nuevo a propósito: WhatsApp guarda en caché la imagen por dirección. Se rearmó con los mismos estilos de la
    portada (`.arco`, `.arco__marco`, `.arco__ramo`, `.portada__corona`, `.sello-xv`, `.portada__nombre`) y los ramos de
    esquina en la posición exacta de la imagen anterior (ajustada por comparación de píxeles); textos a la misma altura.
    Foto con acercamiento leve (`scale(1.15)`, origen 30% 66%) para que se reconozca en la miniatura.
    Si WhatsApp sigue mostrando la foto vieja: pegar el enlace con `?v=3` al final, o esperar a que renueve su caché.
14. **Revisión completa de la web**: en curso (6 revisores + verificadores); los resultados y arreglos van en el siguiente commit.

### Pendiente (en este orden)
1. **Que JX escuche la canción en el celular** (volumen y que se repita bien). No se puede escuchar desde aquí.
2. **Confirmar el punto de encuentro**: ¿es la casa (Barrio España, TR 44 calle 26D12) o la tienda Brisas del Sur?
   Si es la tienda, cambiar el texto visible (zona CONTACTO) y la descripción del calendario y del `.ics`.
   La tarjeta cuadrada (se entrega aparte) tiene la dirección vieja sin la referencia: revisarla si la van a reenviar.
3. Probar en un iPhone real (o WebKit): la sesión en la nube solo tiene Chromium; v1.3 y v1.4 no se probaron en WebKit.
4. `/CLAUDE.md` y `/README.md` se ven públicamente en el sitio (Cloudflare sirve la raíz del repo tal cual).
   Decidir con JX si se ocultan (por ejemplo con reglas en `_redirects`).

### Cómo probar "en celular" desde el PC
Playwright (`npm i playwright` + `npx playwright install chromium webkit`) con perfiles de dispositivo: WebKit ≈ Safari
de iPhone y Chromium ≈ Android. Perfiles usados: iPhone SE 320×568, SE (3.ª gen.) con barras 375×553, iPhone 15 393×659,
15 Pro Max 430×739, iPhone horizontal 734×343, Galaxy S8 360×740, 360×640, navegador interno 360×600, S9+ 320×658,
Pixel 7 412×839, Fold 280×653 y Android horizontal 740×360. Revisar: sobre sin cortes, desborde lateral 0, toques
≥44 px, consola limpia, Enter no envía, `wa.me` correcto. El banco de pruebas vive **fuera** del repo: no subir
archivos de prueba (punto 18 de la auditoría).
- Ojo con `page.tap('#carrusel-ver')` (o cualquier `tap`/`click` por selector en la portada): si el elemento se está
  moviendo por la animación de scroll, Playwright reintenta con un `scrollIntoView` forzado que desplaza
  `header.portada` (tiene `overflow-x: hidden` por los ramos) y la portada queda corrida ~50 px. **No es un error
  de la página**: un dedo no puede desplazar ese contenedor. Usar `page.touchscreen.tap(x, y)` o `el.click()`.
- En la sesión en la nube de Claude Code hay Chromium en `/opt/pw-browsers` y Playwright global en
  `/opt/node-tools/node_modules` (`NODE_PATH=...`); no trae WebKit y no se debe correr `playwright install`.
  ffmpeg sí está instalado.

## Repositorio y publicación
- GitHub: `https://github.com/jxenterprise/XV_oriana` (**público por decisión de JX**, 12/10/2026), rama `main`. Commits como `JX Code <jxenterpriseshop@gmail.com>`.
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
  ⚠ **Cambio 11/10/2026**: no les gustó; mandaron otra canción dentro de un MP4.
  ✅ **12/10/2026 (v1.3)**: suena solo el audio de ese video ("solo el audio, más nada", pidió JX). Si es una
  canción comercial, el derecho de uso corre por cuenta de la familia (lo dice el README).
  ⚠ **Cambio 12/10/2026 (v1.4)**: la clienta prefirió *Lavender's Blue* en piano (Riyandi Kusuma), **completa** y en
  bucle normal. Es una versión de terceros: el derecho de uso corre por cuenta de la familia.
- Fotos: **una foto en la portada** (la selfie de las 12:04; recortada 678×904, sin retoques).
  Mandaron 8 fotos (varias de bebé/niña): no se usaron porque escogió solo una; se puede ofrecer
  una sección "Así he crecido" si la quieren.
  ⚠ **Cambio 11/10/2026**: ahora quieren TODAS las fotos en un carrusel lento dentro del arco y verlas en
  pantalla completa.
  ✅ **12/10/2026 (v1.3)**: las 8 fotos en el carrusel; JX pidió la del vestido gris de primera y luego van de
  bebé a hoy (orden en "ESTADO ACTUAL" → 6). La selfie de las 12:04 quedó de última, completa (900×1600).
  ⚠ **Cambio 12/10/2026 (v1.4)**: orden de bebé a grande y las mejores de ya grande al final (ver "ESTADO ACTUAL" → 10).
- Repositorio de GitHub: **público** (JX, 12/10/2026, no quiere volverlo privado).
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
1. ~~Pin exacto del punto de encuentro~~ ✅ 12/10/2026 (v1.4): la familia mandó el enlace de Google Maps (Tienda Brisas
   del Sur, 10.4020598, −75.5113218). **Queda por confirmar el texto**: ¿el encuentro es en la casa de la dirección de
   la invitación o en la tienda? (ver "Pendiente" 2).
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
11. Botón flotante de música (`#boton-musica`) y `<audio id="audio-musica">`.

## Dónde editar cada cosa
- Textos del mensaje → `index.html`, zona TEXTOS.
- Fecha/hora/plan → `index.html`, zona HORARIOS (+ `data-fecha-evento` y `data-fecha-texto` en `#reloj`,
  enlace de Google Calendar, `evento-xv-oriana-sofia.ics`, `<head>`, `img/og-xv-oriana-sofia-vestido-beige.webp`, tarjeta).
- Dirección / mapa / WhatsApp → `index.html`, zona CONTACTO (`#datos-evento`: `data-whatsapp`, `data-direccion-mapa`,
  `data-mapa-coordenadas` = "lat,lng" del pin y `data-mapa-enlace` = enlace de Google Maps de la familia).
- Mensajes de WhatsApp (confirmación) → `js/script.js`, función `iniciarConfirmacion()`.
- Mensaje que envía el generador → `js/generador.js`, función `mensajeSugerido()`.
- Colores, tipografías, tamaños → `css/styles.css`, bloque `:root`.
- Fotos del carrusel (y del visor) → `index.html`, comentario "CARRUSEL DE FOTOS" en la portada: una
  `<img class="carrusel__foto">` por foto, en orden. El JS no se toca.
- Fotos, acuarelas, imagen de vista previa → `img/` (siempre WebP).
- Música → `musica/cancion-xv-oriana-sofia.mp3` (`src` del `<audio id="audio-musica">` al final de `index.html`).
  Hoy: *Lavender's Blue* en piano, completa (2:32), `loop`.

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
  description/og:description del `<head>`, `img/og-xv-oriana-sofia-vestido-beige.webp` y la tarjeta cuadrada.
- `ZONA EDITABLE · CONTACTO` (index.html, `.encuentro`): dirección visible (+ `.encuentro__ref`), `data-direccion-mapa`,
  `data-mapa-coordenadas`, `data-mapa-enlace` y `data-whatsapp` de `#datos-evento`. ⚠ Se repite en Google Calendar,
  `.ics` y la tarjeta. El iframe y los enlaces de Google Maps/Waze se reconstruyen solos desde esos atributos
  (los `href` del HTML son respaldo sin JS).
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
  foto de portada, `og-xv-oriana-sofia-vestido-beige.webp` (1200×630; antes `og-xv-oriana-sofia.webp`) para la vista previa de WhatsApp, `favicon.svg` y
  `apple-touch-icon.png` (excepción técnica).
- **musica/vals-xv-oriana-sofia.mp3**: vals original en Sol mayor, 3/4, 104 bpm, timbre de cajita musical,
  ~116 s en bucle, 112 kbps (~1,6 MB). *Reemplazado en la v1.3 por la canción de la familia.*
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

### 12/10/2026 — versión 1.3 (las 8 fotos + música nueva)
- **index.html**: 8 `img.carrusel__foto` en `#carrusel` (tabla en "ESTADO ACTUAL" → 6); `--enfoque` solo en la
  selfie de rizos (`10% 50%`, es horizontal y la cara está a la izquierda) y en la selfie de las 12:04 (`50% 5%`,
  es 9:16 y si no se cortaba el pelo). Las otras son 3:4 como el arco o centradas. Comentarios del encabezado y
  de MÚSICA sin "vals". `<audio id="audio-musica" src="musica/cancion-xv-oriana-sofia.mp3" loop preload="none">`.
- **js/script.js**: solo el selector `#audio-musica` en `iniciarMusica()` (antes `#audio-vals`).
- **img/**: 8 WebP nuevos (`oriana-sofia-*.webp`), se borró `oriana-sofia-portada-xv.webp`.
- **musica/**: `cancion-xv-oriana-sofia.mp3` nuevo, se borró `vals-xv-oriana-sofia.mp3`. Se hizo así (ffmpeg):
  1. Medir: `ffmpeg -i VIDEO.mp4 -vn -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null -`
  2. Exportar solo el audio con esos valores (`measured_I`, `measured_TP`, `measured_LRA`, `measured_thresh`,
     `offset`, `linear=true`), `afade=t=in:st=0:d=1.2`, `afade=t=out:st=(duración − 3):d=3`, `-map 0:a:0 -vn
     -map_metadata -1 -ar 44100 -ac 2 -c:a libmp3lame -b:a 128k`.
- **CSS**: sin cambios.

### 12/10/2026 — versión 1.4 (canción completa, orden de fotos, mapa exacto y revisión completa)
- **musica/cancion-xv-oriana-sofia.mp3**: *Lavender's Blue* (piano, Riyandi Kusuma), 2:32. Comando:
  `ffmpeg -ss 1.5 -i ORIGINAL.m4a -map 0:a:0 -vn -map_metadata -1 -af "volume=6dB,alimiter=limit=0.79:attack=5:release=80:level=false" -ar 44100 -ac 2 -c:a libmp3lame -b:a 128k musica/cancion-xv-oriana-sofia.mp3`
  (medir antes con `ebur128`: el objetivo es ≈ −16 LUFS sin recortes).
- **index.html**: nuevo orden de las 8 `img.carrusel__foto` (la primera con `src`/`fetchpriority`, ahora la bebé de
  verde); `#datos-evento` con `data-mapa-coordenadas` y `data-mapa-enlace`; `.encuentro__ref` en la dirección; enlaces
  de respaldo de Maps (enlace de la familia) y Waze (`ll=`); botón de Google Calendar con el lugar exacto.
- **js/script.js** → `iniciarMapa()`: usa `data-mapa-coordenadas` (iframe `q=lat,lng&z=17`, Waze `ll=`) y
  `data-mapa-enlace` (Google Maps); si faltan, vuelve a la búsqueda por texto de `data-direccion-mapa`.
- **css/styles.css**: `.encuentro__ref`.
- **evento-xv-oriana-sofia.ics**: `LOCATION`, `GEO`, `X-APPLE-STRUCTURED-LOCATION`, `URL`, `DESCRIPTION`, `SEQUENCE:1`.
## Auditoría de 24 puntos (versión invitación)
1. ❌ Dominio propio — no aplica: JX eligió `pages.dev` gratis; canonical/og apuntan a `mis-xv-de-oriana-sofia.pages.dev` (confirmado).
2. ✅ HTML real en el view-source (todo el contenido está en `index.html`).
3. ✅ `404.html` con el diseño de la invitación y botón de regreso.
4. ✅ `<title>` real: "Mis XV años · Oriana Sofía".
5. ✅ Títulos distintos en index, generador y 404.
6. ✅ Meta description propia (~145 caracteres).
7. ✅ Open Graph completo + Twitter Card, `og:image` absoluta 1200×630 en WebP (69 KB, foto del vestido beige desde la v1.4; WhatsApp la muestra bien).
8. ➖ JSON-LD — no aplica a propósito: es una invitación privada (no se publican datos estructurados de una menor).
9. ✅ Un solo `<h1>` (nombre de la quinceañera).
10. ✅ El `<h1>` existe y describe la página ("Mis XV años · Oriana Sofía").
11. ✅ `<link rel="canonical">` absoluto a `https://mis-xv-de-oriana-sofia.pages.dev/`.
12. ➖ `llms.txt` — no aplica: invitación privada, aprobado por JX.
13. ➖ `robots.txt` bloquea buscadores y bots de IA a propósito (privacidad); permite WhatsApp/Facebook/Telegram para la vista previa.
14. ✅ `favicon.svg` + `apple-touch-icon.png` + `theme-color`.
15. ➖ `sitemap.xml` — no aplica: no debe indexarse.
16. ✅ `lang="es"`, charset UTF-8 y viewport.
17. ✅ `alt` descriptivo en cada una de las 8 fotos; las acuarelas son decorativas (`alt=""` + `aria-hidden`).
18. ✅ Sin sourcemaps, `.git`, `node_modules`, `.env` ni archivos de prueba.
19. ✅ Cero errores y cero advertencias en consola (v1: Chromium en 360, 390 y 1440 px; v1.1 y v1.2: Playwright con
    WebKit y Chromium en 12 perfiles de celular, de 280 a 430 px y en horizontal, más pruebas del carrusel y el visor;
    v1.3: Chromium en los mismos 12 perfiles con las 8 fotos y la música nueva).
20. ✅ JS propio mínimo, CSS puro para animaciones, imágenes WebP, foto con `fetchpriority="high"`, resto `lazy`, scripts con `defer`, fuentes con `font-display: swap`.
21. ➖ Páginas legales y banner de cookies — no aplica: versión invitación aprobada por JX (sin analítica ni formularios que guarden datos; el mapa solo carga si el invitado lo pide).
22. ➖ GA4 — no se instala (decisión de la versión invitación).
23. ✅ Panel: opción (c) sin panel + zonas editables (TEXTOS, HORARIOS, CONTACTO) + README/CLAUDE.md + código comentado.
24. ✅ Código fuente completo y sin minificar; README explica propiedad (de la familia), hosting en la cuenta de Cloudflare de JX y cómo transferir.
