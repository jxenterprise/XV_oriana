/* ===========================================================
   PROYECTO: Invitación web · Mis XV años de Oriana Sofía
   Archivo: js/generador.js — comportamiento de generador.html.
   Qué hace:
     1. Crea el enlace personal de cada invitado:
        https://<sitio>/?para=Familia+P%C3%A9rez&pases=3
        (index.html lo lee y pone el nombre en el sobre y los pases
        en la confirmación).
     2. Prepara un mensaje editable y lo abre en WhatsApp (al número
        del invitado si se escribió, o para escoger el chat).
     3. Guarda en este navegador la lista de invitaciones creadas.
   La dirección del sitio se calcula sola (sirve en pages.dev, en un
   dominio propio o en la vista previa), no hay que configurarla.
   Diseño y desarrollo: JX Company.
   =========================================================== */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var CLAVE = 'xv-oriana-invitaciones';

  var form = $('#form-generador');
  var nombre = $('#g-nombre');
  var error = $('#g-error');
  var pases = $('#g-pases');
  var telefono = $('#g-telefono');
  var resultado = $('#resultado');
  var enlaceTxt = $('#g-enlace');
  var mensaje = $('#g-mensaje');
  var estado = $('#g-estado');
  var ver = $('#g-ver');
  var lista = $('#g-lista');
  var vacio = $('#g-vacio');
  var total = $('#g-total');
  var actual = null;   // invitación que se acaba de crear

  /** Quita caracteres de control y < >, une espacios y recorta. */
  function limpiar(t, max) {
    return String(t || '').replace(/[\u0000-\u001F\u007F<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max || 60);
  }

  /** Lee/guarda la lista sin romper si el navegador bloquea el almacenamiento. */
  function leerLista() {
    try { return JSON.parse(window.localStorage.getItem(CLAVE)) || []; } catch (e) { return []; }
  }
  function guardarLista(items) {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(items)); } catch (e) { /* sin almacenamiento */ }
  }

  /**
   * Arma el enlace personal.
   * Recibe: nombre y pases. Devuelve: URL completa de la invitación.
   * Por qué new URL('./', ...): toma la carpeta donde está este generador,
   * que es la misma de index.html, en cualquier dominio.
   */
  function crearEnlace(quien, n) {
    var u = new URL('./', window.location.href);
    u.searchParams.set('para', quien);
    u.searchParams.set('pases', String(n));
    return u.toString();
  }

  /** Texto sugerido para WhatsApp (el usuario lo puede editar antes de enviar). */
  function mensajeSugerido(quien, url) {
    return '¡Hola, ' + quien + '! 💜 Con mucho cariño te invitamos a celebrar los XV años de Oriana Sofía, el domingo 1 de noviembre.\n\nAbre tu invitación aquí: ' + url;
  }

  /** Número colombiano en formato wa.me (57 + 10 dígitos); vacío si no es válido. */
  function numeroWhatsApp(t) {
    var d = String(t || '').replace(/\D/g, '');
    if (d.length === 10 && d.charAt(0) === '3') d = '57' + d;
    return /^57\d{10}$/.test(d) ? d : '';
  }

  /** Abre un enlace externo con un <a> real (funciona mejor en celulares). */
  function abrirEnlace(url) {
    var a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }

  /**
   * Copia texto al portapapeles.
   * 1) Portapapeles moderno. 2) Si el navegador interno (WhatsApp, Instagram…) no lo permite,
   * copia con un campo temporal + execCommand('copy'). 3) Si tampoco, deja copiarlo a mano.
   * Ojo: copia SIEMPRE el texto recibido (en la lista es el enlace de ESE invitado, no el de arriba).
   */
  function copiar(texto, cuandoListo) {
    function respaldo() {
      var campo = document.createElement('textarea');
      campo.value = texto;
      campo.setAttribute('readonly', '');
      campo.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;';   // 16px: sin zoom en iPhone
      document.body.appendChild(campo);
      campo.select();
      campo.setSelectionRange(0, texto.length);   // iPhone necesita el rango explícito
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      campo.remove();
      if (!ok) {
        if (enlaceTxt.textContent === texto) {   // copia a mano: queda seleccionado el enlace correcto
          var r = document.createRange();
          r.selectNodeContents(enlaceTxt);
          var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        } else {
          window.prompt('Copia este enlace:', texto);
        }
      }
      cuandoListo(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () { cuandoListo(true); }, respaldo);
    } else { respaldo(); }
  }

  /** Pinta la lista de invitaciones creadas y el total de pases. */
  function pintarLista() {
    var items = leerLista();
    lista.textContent = '';
    vacio.hidden = items.length > 0;
    var suma = 0;
    items.slice().reverse().forEach(function (it) {
      suma += it.pases;
      var li = document.createElement('li');
      li.className = 'gen__item';
      var info = document.createElement('div');
      var n = document.createElement('span'); n.className = 'gen__item-nombre'; n.textContent = it.nombre;
      var p = document.createElement('span'); p.className = 'gen__item-pases'; p.textContent = it.pases === 1 ? '1 pase' : it.pases + ' pases';
      info.appendChild(n); info.appendChild(p);
      var botones = document.createElement('div'); botones.className = 'gen__item-botones';
      var bc = document.createElement('button'); bc.type = 'button'; bc.className = 'gen__mini'; bc.textContent = 'Copiar';
      bc.setAttribute('aria-label', 'Copiar el enlace de ' + it.nombre);
      bc.addEventListener('click', function () {
        copiar(it.url, function (ok) { bc.textContent = ok ? '¡Copiado!' : 'Copia manual'; setTimeout(function () { bc.textContent = 'Copiar'; }, 1800); });
      });
      var bb = document.createElement('button'); bb.type = 'button'; bb.className = 'gen__mini'; bb.textContent = 'Quitar';
      bb.setAttribute('aria-label', 'Quitar a ' + it.nombre + ' de la lista');
      bb.addEventListener('click', function () {
        guardarLista(leerLista().filter(function (x) { return x.url !== it.url; }));
        pintarLista();
      });
      botones.appendChild(bc); botones.appendChild(bb);
      li.appendChild(info); li.appendChild(botones);
      lista.appendChild(li);
    });
    total.hidden = items.length === 0;
    total.textContent = items.length === 1
      ? '1 invitación · ' + suma + (suma === 1 ? ' pase' : ' pases')
      : items.length + ' invitaciones · ' + suma + ' pases en total';
  }

  /* --- contador de pases --- */
  function ajustarPases(v) {
    var n = parseInt(v, 10);
    if (isNaN(n)) n = 1;
    n = Math.min(20, Math.max(1, n));
    pases.value = String(n);
    return n;
  }
  Array.prototype.forEach.call(form.querySelectorAll('[data-paso]'), function (b) {
    b.addEventListener('click', function () {
      ajustarPases((parseInt(pases.value, 10) || 1) + parseInt(b.getAttribute('data-paso'), 10));
    });
  });
  pases.addEventListener('change', function () { ajustarPases(pases.value); });
  nombre.addEventListener('input', function () { if (nombre.value.trim()) error.hidden = true; });

  /* --- Enter / "Siguiente" del teclado: nombre → pases → WhatsApp; desde el WhatsApp crea el enlace.
     Así no se crea un enlace con los pases sin revisar (quedaría repetido en la lista). --- */
  [[nombre, pases], [pases, telefono]].forEach(function (par) {
    par[0].addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.isComposing) return;
      e.preventDefault();
      if (par[0] === pases) ajustarPases(pases.value);
      par[1].focus();
    });
  });

  // iPhone solo pinta los estilos :active (respuesta al tocar) si la página escucha toques.
  document.addEventListener('touchstart', function () {}, { passive: true });

  /* --- crear invitación --- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var quien = limpiar(nombre.value, 60);
    if (!quien) { error.hidden = false; nombre.focus(); return; }
    var n = ajustarPases(pases.value);
    var url = crearEnlace(quien, n);
    actual = { nombre: quien, pases: n, url: url, tel: numeroWhatsApp(telefono.value) };

    enlaceTxt.textContent = url;
    mensaje.value = mensajeSugerido(quien, url);
    ver.href = url;
    estado.textContent = '';
    resultado.hidden = false;

    var items = leerLista().filter(function (x) { return x.url !== url; });
    items.push({ nombre: quien, pases: n, url: url, fecha: Date.now() });
    guardarLista(items);
    pintarLista();
    resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* --- enviar por WhatsApp --- */
  $('#g-whatsapp').addEventListener('click', function () {
    if (!actual) return;
    var texto = String(mensaje.value || '').trim() || mensajeSugerido(actual.nombre, actual.url);
    var destino = actual.tel ? 'https://wa.me/' + actual.tel : 'https://wa.me/';
    abrirEnlace(destino + '?text=' + encodeURIComponent(texto));
    estado.textContent = actual.tel
      ? 'Se abrirá el chat del invitado con el mensaje listo.'
      : 'Se abrirá WhatsApp para que escojas a quién enviárselo.';
  });

  /* --- copiar enlace --- */
  $('#g-copiar').addEventListener('click', function () {
    if (!actual) return;
    copiar(actual.url, function (ok) {
      estado.textContent = ok ? 'Enlace copiado. Ya lo puedes pegar en WhatsApp.' : 'Selecciona el enlace de arriba y cópialo.';
    });
  });

  pintarLista();
})();
