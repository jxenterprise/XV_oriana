/* ===========================================================
   PROYECTO: Invitación web · Mis XV años de Oriana Sofía
   Archivo: js/script.js — comportamiento de index.html.
   Qué hace, en orden:
     1. Lee el invitado del enlace (?para=Nombre&pases=3) y
        personaliza el sobre y el formulario.
     2. Sobre animado: al tocar el sello se abre, caen pétalos,
        arranca la música y aparece la invitación.
     3. Música: botón flotante para pausar/reanudar.
     4. Cuenta regresiva hasta el encuentro.
     5. Mapa: el de Google solo carga si el invitado lo pide.
     6. Confirmación: arma un mensaje bonito y abre WhatsApp.
     7. Fotos: carrusel lento dentro del arco y visor a pantalla completa.
   Datos que lee del HTML (para no repetirlos aquí):
     · #datos-evento  → data-whatsapp y data-direccion-mapa (zona CONTACTO)
     · #reloj         → data-fecha-evento y data-fecha-texto
     · #carrusel      → las fotos (img.carrusel__foto, en orden)
   Sin dependencias externas. Cargado con defer: el DOM ya existe.
   Diseño y desarrollo: JX Company.
   =========================================================== */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var VISTA_PREVIA = window.__VISTA_PREVIA__ === true; // solo lo define la vista previa en claude.ai
  var reducirMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Limpia un texto que viene del enlace o del formulario.
   * Qué hace: quita caracteres de control y < > (por seguridad), une
   * espacios repetidos y recorta al largo máximo.
   * Recibe: texto y largo máximo. Devuelve: texto limpio.
   */
  function limpiar(texto, maximo) {
    return String(texto || '')
      .replace(/[\u0000-\u001F\u007F<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maximo || 60);
  }

  /** Lee y guarda en localStorage sin romper si el navegador lo bloquea. */
  function leerLocal(clave) { try { return window.localStorage.getItem(clave); } catch (e) { return null; } }
  function guardarLocal(clave, valor) { try { window.localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento: no pasa nada */ } }

  /**
   * Abre un enlace externo en otra pestaña/app (WhatsApp, Maps).
   * Por qué así: un <a> real con clic dentro del gesto del usuario es lo que
   * mejor funciona en el navegador interno de WhatsApp y de Instagram.
   */
  function abrirEnlace(url) {
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* ===========================================================
     1. INVITADO DEL ENLACE
     El generador crea enlaces como: /?para=Familia+P%C3%A9rez&pases=3
     =========================================================== */
  /**
   * Lee el nombre y los pases del enlace personalizado.
   * Devuelve: { para: 'Familia Pérez', pases: 3 } (pases 0 = sin límite indicado).
   */
  function leerInvitado() {
    var params = new URLSearchParams(window.location.search);
    var para = limpiar(params.get('para'), 60);
    var pases = parseInt(params.get('pases'), 10);
    if (!(pases >= 1 && pases <= 20)) pases = 0;
    if (!para && VISTA_PREVIA) { para = 'Familia Pérez'; pases = 3; } // ejemplo solo para la vista previa
    return { para: para, pases: pases };
  }

  /**
   * Personaliza el sobre y el formulario con el invitado.
   * Usa textContent (nunca innerHTML) para que nadie pueda inyectar código por el enlace.
   */
  function personalizar(inv) {
    if (inv.para) {
      $('#portal-nombre').textContent = inv.para;
      $('#portal-para').hidden = false;
      $('#nombre').value = inv.para;
    }
    if (inv.pases) {
      var p = $('#portal-pases');
      p.textContent = inv.pases === 1 ? '1 pase' : inv.pases + ' pases';
      p.hidden = false;
      var t = $('#texto-pases');
      t.textContent = inv.pases === 1 ? 'Invitación para 1 persona' : 'Invitación para ' + inv.pases + ' personas';
      t.hidden = false;
      var personas = $('#personas');
      personas.max = String(inv.pases);
      personas.value = String(inv.pases);
    }
  }

  /* ===========================================================
     3. MÚSICA
     El navegador solo deja sonar audio después de un toque del
     usuario: por eso se llama a reproducir() dentro del clic del sello.
     =========================================================== */
  /**
   * Prepara el audio y el botón flotante.
   * Devuelve: { reproducir(), mostrarBoton() }.
   * Depende de: #audio-vals y #boton-musica en el HTML.
   */
  function iniciarMusica() {
    var audio = $('#audio-vals');
    var boton = $('#boton-musica');
    var quiereSonar = false;   // lo que eligió el invitado (para retomar al volver a la pestaña)
    var fundido = null;

    function actualizarBoton(sonando) {
      boton.setAttribute('aria-pressed', sonando ? 'true' : 'false');
      boton.setAttribute('aria-label', sonando ? 'Pausar la música' : 'Reproducir la música');
    }

    function fundirVolumen(destino, ms) {   // en iPhone el volumen es fijo: simplemente suena
      clearInterval(fundido);
      var inicio = audio.volume, pasos = Math.max(1, Math.round(ms / 50)), n = 0;
      fundido = setInterval(function () {
        n++;
        try { audio.volume = Math.min(1, Math.max(0, inicio + (destino - inicio) * (n / pasos))); } catch (e) { /* volumen fijo */ }
        if (n >= pasos) clearInterval(fundido);
      }, 50);
    }

    function reproducir() {
      quiereSonar = true;
      try { audio.volume = 0; } catch (e) { /* iOS */ }
      var promesa = audio.play();
      if (promesa && promesa.then) {
        promesa.then(function () { actualizarBoton(true); fundirVolumen(0.6, 1800); })
          .catch(function () { quiereSonar = false; actualizarBoton(false); });
      } else {
        actualizarBoton(true); fundirVolumen(0.6, 1800);
      }
    }

    function pausar() {
      quiereSonar = false;
      audio.pause();
      actualizarBoton(false);
    }

    boton.addEventListener('click', function () {
      if (audio.paused) reproducir(); else pausar();
    });

    // El botón refleja lo que de verdad pasa: si el celular pausa la música con la página
    // a la vista (una llamada, otra app con sonido), vuelve a "Reproducir" y no se retoma sola.
    audio.addEventListener('play', function () { actualizarBoton(true); });
    audio.addEventListener('pause', function () {
      if (!document.hidden) quiereSonar = false;
      actualizarBoton(false);
    });

    // Al salir de la página (otra app/pestaña) se pausa; al volver, retoma si estaba sonando.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (!audio.paused) audio.pause(); }
      else if (quiereSonar && audio.paused) { audio.play().catch(function () { actualizarBoton(false); }); }
    });

    // Empieza a descargar el MP3 cuando la página ya cargó (no compite con las fotos).
    window.addEventListener('load', function () {
      if (audio.paused && !quiereSonar) audio.preload = 'auto';
    });

    return {
      reproducir: reproducir,
      mostrarBoton: function () { boton.hidden = false; }
    };
  }

  /* ===========================================================
     2. SOBRE ANIMADO
     =========================================================== */
  /**
   * Lanza los pétalos lila y dorados que caen al abrir el sobre.
   * Se eliminan solos al terminar su animación. Respeta "reducir movimiento".
   */
  function lanzarPetalos() {
    if (reducirMovimiento) return;
    var colores = ['#C9AEEB', '#B597DD', '#E5D3F6', '#D7B8E9', '#E8D29A', '#CDB4F0'];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 26; i++) {
      var p = document.createElement('span');
      var tam = 9 + Math.random() * 14;
      p.className = 'petalo';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.width = tam + 'px';
      p.style.height = (tam * 0.82) + 'px';
      p.style.background = colores[i % colores.length];
      p.style.animationDuration = (3.2 + Math.random() * 2.8) + 's';
      p.style.animationDelay = (Math.random() * 0.9) + 's';
      p.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      p.style.setProperty('--r', (Math.random() * 540 + 180) * (Math.random() < 0.5 ? -1 : 1) + 'deg');
      p.addEventListener('animationend', function (e) { e.target.remove(); });
      frag.appendChild(p);
    }
    document.body.appendChild(frag);
  }

  /**
   * Controla la apertura del sobre.
   * Pasos (clases de styles.css): .portal--abriendo → .portal--carta → .portal--saliendo.
   * El enlace "Saltar al contenido" abre todo al instante y sin música.
   */
  function iniciarSobre(musica) {
    var portal = $('#portal');
    var sello = $('#boton-sello');
    var sobre = $('#sobre');
    var abierto = false;
    // Mientras el sobre está abierto, lo de atrás no se puede enfocar con teclado ni lector de pantalla.
    var detras = [document.querySelector('.portada'), document.querySelector('main'), document.querySelector('.cierre')];
    var bloquear = function (si) { detras.forEach(function (el) { if (el) el.inert = si; }); };

    document.body.classList.add('con-portal');
    bloquear(true);

    function terminar() {
      portal.hidden = true;
      bloquear(false);
      document.body.classList.remove('con-portal');
      document.body.classList.add('invitacion-abierta');
      musica.mostrarBoton();
      document.dispatchEvent(new CustomEvent('invitacion:abierta'));   // el carrusel empieza a pasar fotos
    }

    function abrir(conAnimacion, conMusica) {
      if (abierto) return;
      abierto = true;
      if (conMusica) musica.reproducir();   // dentro del gesto del usuario
      if (!conAnimacion || reducirMovimiento) { window.scrollTo(0, 0); terminar(); return; }
      portal.classList.add('portal--abriendo');
      lanzarPetalos();
      setTimeout(function () { portal.classList.add('portal--carta'); }, 720);
      setTimeout(function () {
        window.scrollTo(0, 0);
        portal.classList.add('portal--saliendo');
        document.body.classList.add('invitacion-abierta');
      }, 2150);
      setTimeout(terminar, 2800);
    }

    sello.addEventListener('click', function (e) { e.stopPropagation(); abrir(true, true); });
    sobre.addEventListener('click', function () { abrir(true, true); });  // tocar cualquier parte del sobre también abre
    $('#saltar').addEventListener('click', function () {
      abrir(false, false);
      setTimeout(function () { $('#contenido').focus(); }, 0);
    });
  }

  /* ===========================================================
     4. CUENTA REGRESIVA
     =========================================================== */
  /**
   * Actualiza días/horas/minutos/segundos cada segundo hasta la hora del encuentro.
   * Lee: data-fecha-evento (ISO con zona horaria de Colombia, -05:00).
   * Cuando llega el día cambia el texto; al día siguiente, agradece.
   */
  function iniciarCuenta() {
    var reloj = $('#reloj');
    if (!reloj) return;
    var objetivo = Date.parse(reloj.getAttribute('data-fecha-evento'));
    var finDelDia = objetivo + (17 * 3600 * 1000);   // 7:00 a. m. + 17 h = medianoche del mismo día
    var nota = $('#cuenta-nota');
    var celdas = {};
    ['dias', 'horas', 'minutos', 'segundos'].forEach(function (u) {
      celdas[u] = reloj.querySelector('[data-unidad="' + u + '"]');
    });
    var dos = function (n) { return n < 10 ? '0' + n : String(n); };
    var intervalo;

    function pintar() {
      var ahora = Date.now();
      var dif = Math.max(0, objetivo - ahora);
      var s = Math.floor(dif / 1000);
      celdas.dias.textContent = dos(Math.floor(s / 86400));
      celdas.horas.textContent = dos(Math.floor((s % 86400) / 3600));
      celdas.minutos.textContent = dos(Math.floor((s % 3600) / 60));
      celdas.segundos.textContent = dos(s % 60);
      if (dif === 0) {
        nota.textContent = ahora < finDelDia ? '¡Llegó el gran día!' : 'Gracias por acompañarme en mis XV.';
        clearInterval(intervalo);
      }
    }
    pintar();
    intervalo = setInterval(pintar, 1000);
  }

  /* ===========================================================
     5. MAPA DEL PUNTO DE ENCUENTRO
     El iframe de Google Maps pone cookies de terceros: por eso solo se
     carga cuando el invitado toca "Ver mapa aquí".
     =========================================================== */
  /**
   * Prepara el mapa y los enlaces de Google Maps y Waze a partir de
   * data-direccion-mapa (así la dirección se cambia en un solo lugar).
   */
  function iniciarMapa() {
    var datos = $('#datos-evento');
    var mapa = $('#mapa');
    var boton = $('#boton-mapa');
    if (!datos || !mapa || !boton) return;
    var consulta = datos.getAttribute('data-direccion-mapa');
    var enlaceMaps = $('#enlace-maps');
    var enlaceWaze = $('#enlace-waze');
    enlaceMaps.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(consulta);
    enlaceWaze.href = 'https://waze.com/ul?q=' + encodeURIComponent(consulta) + '&navigate=yes';

    boton.addEventListener('click', function () {
      if (VISTA_PREVIA) { abrirEnlace(enlaceMaps.href); return; } // la vista previa no permite mapas incrustados
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=' + encodeURIComponent(consulta) + '&z=16&output=embed';
      iframe.title = 'Mapa del punto de encuentro: ' + consulta;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      mapa.appendChild(iframe);
      mapa.classList.add('mapa--cargado');
      boton.remove();
    });
  }

  /* ===========================================================
     6. CONFIRMACIÓN POR WHATSAPP
     =========================================================== */
  /**
   * Maneja el formulario: valida el nombre, ajusta el contador de
   * personas (máximo = pases del enlace) y abre WhatsApp con el mensaje.
   * Lee el número de data-whatsapp (#datos-evento).
   */
  function iniciarConfirmacion(inv) {
    var form = $('#form-confirmar');
    if (!form) return;
    var numero = ($('#datos-evento').getAttribute('data-whatsapp') || '').replace(/\D/g, '');
    var fechaTexto = $('#reloj').getAttribute('data-fecha-texto') || '';
    var nombre = $('#nombre');
    var errorNombre = $('#error-nombre');
    var personas = $('#personas');
    var campoPersonas = $('#campo-personas');
    var ayudaPersonas = $('#ayuda-personas');
    var mensajito = $('#mensajito');
    var estado = $('#estado-confirmar');
    var menos = form.querySelector('[data-paso="-1"]');
    var mas = form.querySelector('[data-paso="1"]');
    var maximo = inv.pases || 10;

    function ajustarPersonas(valor) {
      var n = parseInt(valor, 10);
      if (isNaN(n)) n = 1;
      n = Math.min(maximo, Math.max(1, n));
      personas.value = String(n);
      menos.disabled = n <= 1;
      mas.disabled = n >= maximo;
      if (inv.pases && n >= maximo) {
        ayudaPersonas.textContent = maximo === 1 ? 'Tu invitación es para 1 persona.' : 'Tu invitación es para ' + maximo + ' personas.';
        ayudaPersonas.hidden = false;
      } else {
        ayudaPersonas.hidden = true;
      }
      return n;
    }
    ajustarPersonas(personas.value);

    [menos, mas].forEach(function (b) {
      b.addEventListener('click', function () {
        ajustarPersonas((parseInt(personas.value, 10) || 1) + parseInt(b.getAttribute('data-paso'), 10));
      });
    });
    personas.addEventListener('change', function () { ajustarPersonas(personas.value); });

    // Si no asiste, se oculta el contador de personas.
    Array.prototype.forEach.call(form.querySelectorAll('input[name="asiste"]'), function (r) {
      r.addEventListener('change', function () {
        campoPersonas.hidden = form.querySelector('input[name="asiste"]:checked').value !== 'si';
      });
    });

    nombre.addEventListener('input', function () {
      if (nombre.value.trim()) { errorNombre.hidden = true; nombre.removeAttribute('aria-invalid'); }
    });

    // Tecla Enter / "Siguiente" del teclado del celular: pasa al siguiente paso en vez de
    // enviar (antes abría WhatsApp antes de tiempo). Solo el botón "Confirmar" envía.
    function alPulsarEnter(campo, siguiente) {
      campo.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' || e.isComposing) return;
        e.preventDefault();
        siguiente();
      });
    }
    alPulsarEnter(nombre, function () { form.querySelector('input[name="asiste"]:checked').focus(); });
    alPulsarEnter(personas, function () { ajustarPersonas(personas.value); mensajito.focus(); });

    // Recordatorio amable si ya confirmó desde este mismo celular.
    if (leerLocal('xv-oriana-confirmacion')) {
      estado.textContent = 'Ya enviaste tu confirmación desde este celular. Si algo cambió, puedes enviarla de nuevo.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var quien = limpiar(nombre.value, 60);
      if (!quien) {
        errorNombre.hidden = false;
        nombre.setAttribute('aria-invalid', 'true');
        nombre.focus();
        return;
      }
      var asiste = form.querySelector('input[name="asiste"]:checked').value === 'si';
      var cuantos = ajustarPersonas(personas.value);
      var nota = String(mensajito.value || '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, 300);

      var lineas = [];
      if (asiste) {
        lineas.push('¡Hola! 💜 Con mucha alegría confirmo la asistencia a los XV años de Oriana Sofía, ' + fechaTexto + '.');
        lineas.push('');
        lineas.push('Nombre: ' + quien);
        lineas.push('Personas que asistirán: ' + cuantos);
      } else {
        lineas.push('¡Hola! Con mucho cariño te cuento que esta vez no será posible acompañarlos en los XV años de Oriana Sofía. ¡Le deseo un día maravilloso! 💜');
        lineas.push('');
        lineas.push('Nombre: ' + quien);
      }
      if (nota) lineas.push('Mensajito para Oriana: ' + nota);

      var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(lineas.join('\n'));
      abrirEnlace(url);
      guardarLocal('xv-oriana-confirmacion', asiste ? 'si' : 'no');

      // Mensaje de estado + enlace de respaldo por si el celular no abrió WhatsApp.
      estado.textContent = 'Se abrirá WhatsApp con tu mensaje listo; solo falta tocar Enviar. ';
      var respaldo = document.createElement('a');
      respaldo.href = url;
      respaldo.target = '_blank';
      respaldo.rel = 'noopener';
      respaldo.textContent = '¿No se abrió? Toca aquí.';
      estado.appendChild(respaldo);
    });
  }

  /* ===========================================================
     7. FOTOS: CARRUSEL DEL ARCO Y VISOR A PANTALLA COMPLETA
     Las fotos se leen del HTML (#carrusel .carrusel__foto, en orden):
     para agregar o quitar fotos no hay que tocar este archivo.
     =========================================================== */
  /**
   * Llama a haciaLado(1) o haciaLado(-1) cuando se desliza el dedo a un lado
   * (siguiente / anterior) sobre el elemento. Ignora los gestos verticales.
   */
  function alDeslizar(el, haciaLado) {
    var x0 = null, y0 = 0;
    el.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) haciaLado(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /**
   * Carrusel: una foto a la vez con fundido lento. Pasa sola cada PASO_MS solo si hay
   * más de una foto, ya se abrió el sobre, la portada está a la vista, la pestaña está
   * visible, el visor está cerrado y el celular no pide "reducir movimiento".
   * Se desliza con el dedo; al tocar la foto se abre el visor.
   * Ahorro de datos: solo la primera foto viene con la página; las demás se piden
   * (data-src → src) justo antes de que les toque.
   * Visor: <dialog> a pantalla completa con flechas, deslizar, teclado y contador;
   * el botón "atrás" del celular lo cierra sin salir de la invitación (history.pushState).
   */
  function iniciarFotos() {
    var carrusel = $('#carrusel');
    var visor = $('#visor');
    if (!carrusel || !visor) return;
    var fotos = Array.prototype.slice.call(carrusel.querySelectorAll('.carrusel__foto'));
    if (!fotos.length) return;
    var botonVer = $('#carrusel-ver');
    var cajaPuntos = $('#carrusel-puntos');
    var ayuda = $('#carrusel-ayuda');
    var visorFoto = $('#visor-foto');
    var contador = $('#visor-contador');
    var PASO_MS = 5500;
    var actual = 0, enVisor = 0;
    var temporizador = null, aLaVista = true, abierta = false, deslizo = false, cerrando = false, esperaCierre = null;
    var puntos = [];

    /** Pide la foto (data-src → src) si falta; llama a listo() cuando cargó. Si falla, la saca del carrusel. */
    function cargar(img, listo) {
      var pendiente = img.getAttribute('data-src');
      if (pendiente && !img.getAttribute('src')) img.src = pendiente;
      if (img.complete && img.naturalWidth) { if (listo) listo(); return; }
      img.addEventListener('load', function () { if (listo) listo(); }, { once: true });
      img.addEventListener('error', function () { quitarRota(img); }, { once: true });
    }

    function quitarRota(img) {
      var k = fotos.indexOf(img);
      if (k < 1) return;   // la primera viene con la página: no se quita
      fotos.splice(k, 1);
      img.remove();
      if (actual > k) actual--;
      crearPuntos();
    }

    function crearPuntos() {
      cajaPuntos.textContent = '';
      puntos = fotos.map(function () {
        var p = document.createElement('span');
        p.className = 'carrusel__punto';
        cajaPuntos.appendChild(p);
        return p;
      });
      cajaPuntos.hidden = fotos.length < 2;
      ayuda.textContent = fotos.length < 2 ? 'Toca la foto para verla en grande' : 'Toca una foto para verla en grande';
      visor.classList.toggle('visor--una', fotos.length < 2);
      pintarPuntos();
    }

    function pintarPuntos() {
      puntos.forEach(function (p, k) { p.classList.toggle('es-actual', k === actual); });
    }

    /** Pasa a la foto i (con fundido) cuando ya cargó, y deja pedida la siguiente. */
    function mostrar(i) {
      var n = fotos.length;
      if (n < 2) return;
      var img = fotos[((i % n) + n) % n];
      if (img === fotos[actual]) return;
      cargar(img, function () {
        if (fotos.indexOf(img) === -1) return;
        fotos[actual].classList.remove('es-actual');
        fotos[actual].setAttribute('aria-hidden', 'true');
        img.classList.add('es-actual');
        img.removeAttribute('aria-hidden');
        actual = fotos.indexOf(img);
        pintarPuntos();
        cargar(fotos[(actual + 1) % fotos.length]);
      });
    }

    function programar() {
      clearTimeout(temporizador);
      if (fotos.length < 2 || reducirMovimiento || !abierta || !aLaVista || document.hidden || visor.open) return;
      temporizador = setTimeout(function () { mostrar(actual + 1); programar(); }, PASO_MS);
    }

    // Estado inicial: solo la primera se ve y se lee en voz alta
    fotos.forEach(function (img, k) { if (k !== actual) img.setAttribute('aria-hidden', 'true'); });
    crearPuntos();
    $('#carrusel-pie').hidden = false;

    function empezar() {
      if (abierta) return;
      abierta = true;
      carrusel.classList.add('carrusel--anima');
      if (fotos.length > 1) cargar(fotos[1]);
      programar();
    }
    document.addEventListener('invitacion:abierta', empezar);
    if (document.body.classList.contains('invitacion-abierta')) empezar();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entradas) {
        aLaVista = entradas[0].isIntersecting;
        programar();
      }).observe(carrusel);
    }
    document.addEventListener('visibilitychange', programar);

    alDeslizar(carrusel, function (paso) {
      deslizo = true;
      setTimeout(function () { deslizo = false; }, 400);
      mostrar(actual + paso);
      programar();
    });

    /* --- Visor a pantalla completa --- */
    function verEnVisor(i) {
      var n = fotos.length;
      enVisor = ((i % n) + n) % n;
      var img = fotos[enVisor];
      cargar(img);
      var src = img.getAttribute('src') || img.getAttribute('data-src');
      if (visorFoto.getAttribute('src') !== src) {
        visorFoto.classList.add('cargando');
        visorFoto.onload = visorFoto.onerror = function () { visorFoto.classList.remove('cargando'); };
        visorFoto.src = src;
      }
      visorFoto.alt = img.alt;
      contador.textContent = (enVisor + 1) + ' / ' + n;
    }

    function abrirVisor(i) {
      if (typeof visor.showModal !== 'function') {   // navegador sin <dialog>: abre la foto sola
        abrirEnlace(fotos[i].getAttribute('src') || fotos[i].getAttribute('data-src'));
        return;
      }
      verEnVisor(i);
      visor.showModal();
      document.body.classList.add('con-visor');
      try { history.pushState({ visorXV: true }, ''); } catch (e) { /* sin historial: se cierra con la X */ }
      programar();   // el carrusel se detiene mientras el visor está abierto
    }

    function cerrarVisor() {
      if (cerrando || !visor.open) return;
      cerrando = true;
      if (history.state && history.state.visorXV) {
        history.back();   // el popstate lo cierra; así "atrás" y la X hacen lo mismo
        esperaCierre = setTimeout(function () { if (visor.open) visor.close(); }, 700);   // respaldo
      } else {
        visor.close();
      }
    }

    botonVer.addEventListener('click', function () {
      if (deslizo) return;   // fue un deslizamiento, no un toque
      abrirVisor(actual);
    });
    window.addEventListener('popstate', function () { if (visor.open) visor.close(); });
    visor.addEventListener('cancel', function (e) { e.preventDefault(); cerrarVisor(); });   // tecla Esc
    visor.addEventListener('close', function () {
      clearTimeout(esperaCierre);   // si no, el respaldo cerraría el visor la próxima vez que se abra
      cerrando = false;
      document.body.classList.remove('con-visor');
      mostrar(enVisor);   // el arco sigue desde la foto que estaban viendo
      programar();
      botonVer.focus({ preventScroll: true });
    });
    $('#visor-cerrar').addEventListener('click', cerrarVisor);
    $('#visor-anterior').addEventListener('click', function () { verEnVisor(enVisor - 1); });
    $('#visor-siguiente').addEventListener('click', function () { verEnVisor(enVisor + 1); });
    visor.addEventListener('click', function (e) { if (e.target === visor) cerrarVisor(); });   // tocar el fondo cierra
    visor.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') verEnVisor(enVisor - 1);
      else if (e.key === 'ArrowRight') verEnVisor(enVisor + 1);
    });
    alDeslizar(visor, function (paso) { verEnVisor(enVisor + paso); });
    // Con un dedo no se mueve la página de atrás (con dos dedos sí se puede hacer zoom)
    visor.addEventListener('touchmove', function (e) { if (e.touches.length === 1) e.preventDefault(); }, { passive: false });
  }

  /* ===========================================================
     ARRANQUE
     =========================================================== */
  // iPhone solo pinta los estilos :active (respuesta al tocar) si la página escucha toques.
  document.addEventListener('touchstart', function () {}, { passive: true });

  var invitado = leerInvitado();
  personalizar(invitado);
  var musica = iniciarMusica();
  iniciarSobre(musica);
  window.__XV_SOBRE_LISTO__ = true;   // arranque.js lo revisa: si el sobre no quedó listo, lo quita

  // Cada parte arranca por separado: si una falla en un celular raro, las demás siguen funcionando.
  [iniciarCuenta, iniciarMapa, iniciarFotos, function () { iniciarConfirmacion(invitado); }].forEach(function (iniciar) {
    try { iniciar(); } catch (e) { if (window.console) console.error(e); }
  });
})();
