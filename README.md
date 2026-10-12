# Invitación web · Mis XV años de Oriana Sofía

Invitación digital para los XV años de **Oriana Sofía** (domingo 1 de noviembre de 2026, Cartagena).
Se envía por WhatsApp como un enlace: el invitado abre un sobre lila con sello de cera, suena la canción que eligió la familia,
ve la información del día, el punto de encuentro con mapa y confirma su asistencia por WhatsApp.

Encargo de Moisés Escalante. Diseño y desarrollo: **JX Company**.

---

## Zonas editables (para cambios rápidos)

| Zona | Qué cambia | Archivo | ¿Se repite? |
|---|---|---|---|
| `ZONA EDITABLE · TEXTOS` | Mensaje de Oriana y su firma | `index.html` | No |
| `ZONA EDITABLE · HORARIOS` | Fecha, hora de llegada y plan del día | `index.html` | **Sí**: portada, cuenta regresiva, Google Calendar, `evento-xv-oriana-sofia.ics`, `<head>`, imagen de vista previa y tarjeta |
| `ZONA EDITABLE · CONTACTO` | Dirección del punto de encuentro, búsqueda del mapa y WhatsApp que recibe las confirmaciones | `index.html` | **Sí**: Google Calendar, `.ics` y tarjeta |

Cómo llegar a una zona:
1. Abre `index.html` y busca `ZONA EDITABLE` con Ctrl+F.
2. Cambia solo lo que dice el comentario de esa zona (el texto entre `>` y `<`, o el valor entre comillas que indica).
3. Guarda y sube el cambio a GitHub (rama `main`): Cloudflare Pages lo publica solo en 1–2 minutos.

> Fecha, hora, dirección y WhatsApp los cambia JX: viven en varios lugares a la vez (lo dice el aviso `⚠ SE REPITE EN`).

---

## Qué tiene la invitación

- **Sobre animado** con sello de cera lila (iniciales OS): al tocarlo se abre, sale la tarjeta, caen pétalos y arranca la música.
- **Enlace personal por invitado**: el sobre dice "Para Familia Pérez · 3 pases" y la confirmación queda limitada a esos pases.
- **Portada**: corona dorada, "Mis XV años", **carrusel de fotos de Oriana** dentro de un arco dorado con flores en
  acuarela (pasan solas y despacio, se pueden deslizar con el dedo), nombre y fecha.
- **Fotos en pantalla completa**: al tocar una foto se abre en grande; se pasa con flechas o deslizando, y el botón
  "atrás" del celular la cierra sin salir de la invitación.
- **Mensaje de Oriana** con su firma.
- **Cuenta regresiva** (días, horas, minutos y segundos) hasta las 7:00 a. m. del 1 de noviembre.
- **Guarda la fecha**: botón de Google Calendar y archivo para iPhone u otro calendario (con recordatorio la noche anterior).
- **El gran día**: fecha, hora, plan (pasadía con piscina) y punto de encuentro con mapa, Google Maps y Waze.
- **Código de vestuario**: semiformal, morado y lila reservados para la quinceañera y recordatorio del traje de baño.
- **Lluvia de sobres** explicada con cariño.
- **Confirmación por WhatsApp**: nombre, si asiste, cuántas personas y un mensajito para Oriana; abre WhatsApp con el mensaje listo.
- **Música**: la canción que eligió la familia (el audio del video que enviaron, unos 31 s que se repiten con
  entrada y salida suaves) con botón para pausar.
- **Privada**: no aparece en Google ni en buscadores (noindex + robots.txt), pero al pegar el enlace en WhatsApp sí sale la vista previa con imagen.
- Hecha primero para celular; probada de 360 px a pantallas grandes.

---

## Estructura de archivos

```
invitacion-xv-oriana-sofia/
├── index.html                  ← la invitación
├── generador.html              ← herramienta PRIVADA para crear los enlaces de cada invitado
├── 404.html                    ← página de error con el mismo diseño
├── evento-xv-oriana-sofia.ics  ← evento para "iPhone u otro calendario"
├── _headers                    ← cabeceras de Cloudflare (noindex, sin caché en CSS/JS)
├── robots.txt                  ← bloquea buscadores; permite la vista previa de WhatsApp
├── site.webmanifest            ← nombre, ícono y color si la guardan en la pantalla de inicio
├── README.md / CLAUDE.md       ← documentación
├── css/styles.css              ← todo el diseño
├── js/arranque.js              ← activa el sobre antes de pintar (evita parpadeos)
├── js/script.js                ← sobre, música, invitado, cuenta regresiva, mapa y confirmación
├── js/generador.js             ← lógica del generador de enlaces
├── img/                        ← 8 fotos del carrusel, acuarelas, textura e imagen de vista previa (WebP) + íconos
├── fonts/                      ← Pinyon Script y Cormorant Garamond (licencia OFL incluida)
└── musica/cancion-xv-oriana-sofia.mp3
```

---

## Dónde está publicada y cómo actualizarla

- **Dirección**: `https://mis-xv-de-oriana-sofia.pages.dev/` (Cloudflare Pages gratis, proyecto `mis-xv-de-oriana-sofia`).
- **Código**: `https://github.com/jxenterprise/XV_oriana` (rama `main`).
- Cloudflare Pages está conectado al repositorio: **cada cambio que se sube a `main` se publica solo** en 1–2 minutos.
  No hay que subir ZIP ni carpetas a Cloudflare.
- Para probar algo sin tocar la invitación real: súbelo a otra rama (por ejemplo `pruebas`) y Cloudflare
  crea una copia de prueba en `https://pruebas.mis-xv-de-oriana-sofia.pages.dev`.

Desde la terminal, dentro de la carpeta del proyecto:

```
git add -A
git commit -m "Qué cambió"
git push
```

**Si algún día cambia la dirección** (dominio propio u otro proyecto), cambia
`https://mis-xv-de-oriana-sofia.pages.dev/` por la nueva en estas 4 etiquetas del `<head>` de `index.html`:
`canonical`, `og:url`, `og:image` y `twitter:image`. Sin eso, la vista previa de WhatsApp no muestra la imagen.

---

## Cómo crear y enviar las invitaciones

1. Abre `https://mis-xv-de-oriana-sofia.pages.dev/generador` (esta página es privada: no se la mandes a los invitados).
2. Escribe el nombre del invitado ("Familia Pérez", "Tía Luz y Carlos"…) y cuántos pases tiene.
3. Opcional: su número de WhatsApp para abrirle el chat directo.
4. Toca **Crear enlace** → **Enviar por WhatsApp** (el mensaje se puede editar antes) o **Copiar enlace**.
5. La lista de abajo lleva la cuenta de invitaciones y pases creados en ese celular.

El enlace general (sin nombre) también sirve: `https://mis-xv-de-oriana-sofia.pages.dev/`.

Las confirmaciones llegan al WhatsApp **315 780 0663**.

---

## Cómo probarla en el computador

Abre la carpeta con un servidor local (las fuentes y la música cargan mejor así):

- VS Code → extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*.
- O en una terminal dentro de la carpeta: `python3 -m http.server 8000` y abre `http://localhost:8000`.

Para ver el sobre personalizado: `http://localhost:8000/?para=Familia%20P%C3%A9rez&pases=3`.

---

## Cambios frecuentes

- **Fotos del carrusel**: en `index.html`, dentro del comentario "CARRUSEL DE FOTOS" de la portada, hay una línea
  `<img class="carrusel__foto">` por foto, en el orden en que pasan. Para agregar una: guardarla en `img/` en WebP
  (JX la convierte) y copiar una línea con `data-src="img/NOMBRE.webp"`, su ancho, alto y una descripción en `alt`.
  Solo la primera lleva `src`. Si el arco corta la cara, se ajusta con `style="--enfoque: 50% 15%"`.
- **Música**: reemplaza `musica/cancion-xv-oriana-sofia.mp3` por otro MP3 con el mismo nombre (que la familia tenga derecho a usarlo).
- **Textos**: zona `TEXTOS` en `index.html`.
- **Fecha, hora, dirección o WhatsApp**: zonas `HORARIOS` y `CONTACTO` + los lugares que indica `⚠ SE REPITE EN`.
- **Colores**: variables al inicio de `css/styles.css` (`:root`).

**Vista previa de WhatsApp desactualizada**: WhatsApp guarda en caché la imagen. Prueba el enlace con `?v=2` al final o
revísalo en el *Sharing Debugger* de Facebook.

---

## Privacidad

La invitación lleva fotos de Oriana (también de bebé), su nombre y la dirección del punto de encuentro, por eso:
- No se indexa en Google ni en buscadores de IA (`noindex`, `X-Robots-Tag` y `robots.txt`).
- Solo la ve quien tenga el enlace.
- El mapa de Google solo se carga si el invitado toca "Ver mapa aquí".
- No hay analítica ni cookies propias. El navegador guarda solo si ya confirmaste (para recordártelo).

---

## Créditos y licencias

- Diseño, ilustraciones en acuarela, corona y sello: creados para este proyecto por JX Company.
- Fotos de Oriana: enviadas por la familia.
- Música: canción elegida por la familia (tomada del audio de un video que enviaron). El derecho de uso corre por
  cuenta de la familia.
- Tipografías: Pinyon Script y Cormorant Garamond, licencia SIL Open Font License (archivos en `fonts/`).

---

## Propiedad, hosting y respaldo

- El código fuente y el contenido son de la familia de Oriana Sofía; se entregan completos y sin minificar.
- Hosting: cliente básico → el sitio queda en la **cuenta de Cloudflare de JX**. Si la familia quiere tenerlo en su
  propia cuenta, JX crea el proyecto allá y sube la misma carpeta (no hay base de datos ni configuración extra).
- Respaldo: el repositorio de GitHub (`jxenterprise/XV_oriana`) guarda todo el historial de cambios; una copia
  de esta carpeta (o del ZIP) también sirve para volver a publicar en cualquier momento.

---

Diseño y desarrollo: **JX Company**
