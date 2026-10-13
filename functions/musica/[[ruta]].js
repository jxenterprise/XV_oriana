/* ===========================================================
   PROYECTO: Invitación web · Mis XV años de Oriana Sofía
   Archivo: functions/musica/[[ruta]].js — Pages Function de Cloudflare
   Qué hace: sirve los archivos de musica/ con soporte de "Range"
     (peticiones por partes). Cloudflare Pages entrega los archivos
     estáticos siempre completos (200) aunque el navegador pida un trozo,
     y Safari de iPhone pide el audio por partes: si no le responden 206,
     puede no reproducir la canción, no saber cuánto dura o no repetirla.
   Cómo: pide el archivo a los estáticos (env.ASSETS) y, si llega la
     cabecera Range, responde 206 con solo el trozo pedido.
   Solo corre en /musica/* (Cloudflare arma las rutas solo); el resto del
   sitio sigue siendo estático. No necesita paso de compilación.
   Diseño y desarrollo: JX Company.
   =========================================================== */

export async function onRequest({ request, env }) {
  const respuesta = await env.ASSETS.fetch(request);
  const rango = request.headers.get('Range');
  const metodo = request.method;
  if (!rango || respuesta.status !== 200 || (metodo !== 'GET' && metodo !== 'HEAD')) return conRangos(respuesta);

  // Un solo rango: "bytes=inicio-fin", "bytes=inicio-" o "bytes=-últimos". Otros casos: archivo completo.
  const partes = /^bytes=(\d*)-(\d*)$/.exec(rango.trim());
  if (!partes || (partes[1] === '' && partes[2] === '')) return conRangos(respuesta);
  const siRango = request.headers.get('If-Range');
  if (siRango && siRango !== respuesta.headers.get('ETag')) return conRangos(respuesta);   // cambió el archivo

  const datos = await respuesta.arrayBuffer();
  const total = datos.byteLength;
  let inicio, fin;
  if (partes[1] === '') { inicio = Math.max(0, total - Number(partes[2])); fin = total - 1; }
  else { inicio = Number(partes[1]); fin = partes[2] === '' ? total - 1 : Math.min(Number(partes[2]), total - 1); }

  const cabeceras = new Headers(respuesta.headers);
  cabeceras.set('Accept-Ranges', 'bytes');
  if (inicio > fin || inicio >= total) {
    cabeceras.set('Content-Range', 'bytes */' + total);
    cabeceras.delete('Content-Length');
    return new Response(null, { status: 416, headers: cabeceras });
  }
  cabeceras.set('Content-Range', 'bytes ' + inicio + '-' + fin + '/' + total);
  cabeceras.set('Content-Length', String(fin - inicio + 1));
  return new Response(metodo === 'HEAD' ? null : datos.slice(inicio, fin + 1), { status: 206, headers: cabeceras });
}

/** Misma respuesta, anunciando que se aceptan rangos (así Safari los pide). */
function conRangos(respuesta) {
  const copia = new Response(respuesta.body, respuesta);
  if (respuesta.status === 200) copia.headers.set('Accept-Ranges', 'bytes');
  return copia;
}
