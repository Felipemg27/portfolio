export function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (evento) => {
    cursor.style.left = evento.clientX + 'px';
    cursor.style.top = evento.clientY + 'px';
  });
}
