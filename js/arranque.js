/* ===========================================================
   PROYECTO: Invitación web · Mis XV años de Oriana Sofía
   Archivo: js/arranque.js — se carga en el <head> SIN defer, a propósito.
   Qué hace: cambia la clase "no-js" por "js" en <html> antes de que el
   navegador pinte la página. Así el sobre animado (.js .portal en
   styles.css) aparece desde el primer instante y nunca se ve un
   "parpadeo" de la invitación antes del sobre.
   Si JavaScript está apagado, esta línea no corre y la invitación se
   muestra completa, sin sobre.
   =========================================================== */
document.documentElement.classList.replace('no-js', 'js');

/* Red de seguridad: si js/script.js no alcanzó a preparar el sobre (mala señal,
   un navegador muy viejo o un error), al terminar de cargar la página se quita el
   sobre para que la invitación se vea completa igual, sin animación. Sin esto el
   sobre se quedaría tapando todo y no habría forma de abrirlo en el celular.
   script.js marca window.__XV_SOBRE_LISTO__ = true cuando el sobre ya responde. */
window.addEventListener('load', function () {
  if (window.__XV_SOBRE_LISTO__) return;
  document.documentElement.classList.replace('js', 'no-js');
  document.body.classList.remove('con-portal');
  ['.portada', 'main', '.cierre'].forEach(function (sel) {
    var el = document.querySelector(sel);
    if (el) { el.inert = false; el.removeAttribute('inert'); }
  });
});
