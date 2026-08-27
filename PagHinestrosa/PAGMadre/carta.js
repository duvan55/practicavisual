// ============================================================
// Lo que quiero que sepas
// Abre/cierra el sobre, guarda automáticamente el texto de la
// carta en este navegador, y controla el pequeño juego del
// botón "No" que se escapa del cursor.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Abrir / cerrar el sobre y la carta ---------- */
  const sobre = document.getElementById('sobre');
  const btnAbrir = document.getElementById('btnAbrir');
  const overlay = document.getElementById('cartaOverlay');
  const btnCerrar = document.getElementById('btnCerrar');

  function abrirCarta() {
    sobre.classList.add('is-open');
    setTimeout(() => {
      overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }, 450);
  }

  function cerrarCarta() {
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    setTimeout(() => sobre.classList.remove('is-open'), 300);
  }

  btnAbrir.addEventListener('click', abrirCarta);
  btnCerrar.addEventListener('click', cerrarCarta);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarCarta();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-visible')) cerrarCarta();
  });

  /* ---------- El contrato: Sí siempre responde, No se escapa ---------- */
  const opciones = document.getElementById('contratoOpciones');
  const btnSi = document.getElementById('btnSi');
  const btnNo = document.getElementById('btnNo');

  const modalOverlay = document.getElementById('modalOverlay');
  const modalTexto = document.getElementById('modalTexto');
  const modalCerrar = document.getElementById('modalCerrar');

  function mostrarModal(texto) {
    modalTexto.textContent = texto;
    modalOverlay.classList.add('is-visible');
  }
  function cerrarModal() {
    modalOverlay.classList.remove('is-visible');
  }
  modalCerrar.addEventListener('click', cerrarModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModal();
  });

  btnSi.addEventListener('click', () => {
    mostrarModal('Sabía que elegirías esta opción. Yo me comprometo a esperarte y te juro que no te traicionaré en estos momentos de ausencia.');
  });

  // Distancia mínima (en px) a la que el botón "No" empieza a huir
  const DISTANCIA_ESCAPE = 90;

  function moverBotonNo() {
    const zonaRect = opciones.getBoundingClientRect();
    const noRect = btnNo.getBoundingClientRect();

    const maxX = Math.max(zonaRect.width - noRect.width, 0);
    const maxY = Math.max(zonaRect.height - noRect.height, 0);

    const nuevoX = Math.random() * maxX;
    const nuevoY = Math.random() * maxY;

    btnNo.style.left = `${nuevoX}px`;
    btnNo.style.top = `${nuevoY}px`;
  }

  function distancia(ax, ay, bx, by) {
    return Math.hypot(ax - bx, ay - by);
  }

  // El botón huye cuando el cursor se acerca demasiado
  opciones.addEventListener('mousemove', (e) => {
    const noRect = btnNo.getBoundingClientRect();
    const centroX = noRect.left + noRect.width / 2;
    const centroY = noRect.top + noRect.height / 2;
    const d = distancia(e.clientX, e.clientY, centroX, centroY);

    if (d < DISTANCIA_ESCAPE) {
      moverBotonNo();
    }
  });

  // Refuerzo: también huye si el cursor logra entrar en el botón
  btnNo.addEventListener('mouseenter', moverBotonNo);
  btnNo.addEventListener('focus', moverBotonNo);

  // En pantallas táctiles no hay "hover": al tocarlo, primero huye
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moverBotonNo();
  }, { passive: false });

  // Si contra todo pronóstico logran presionarlo, aparece el mensaje
  btnNo.addEventListener('click', () => {
    mostrarModal('No mientas, quieres que él sea el amor de tu vida.');
  });

  // Posición inicial del botón "No" dentro de su zona
  window.addEventListener('load', () => {
    btnNo.style.left = '0px';
    btnNo.style.top = '60px';
  });
});
