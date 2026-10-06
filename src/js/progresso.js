export function initProgresso() {
  const barra = document.querySelector('#barra-xp');
  if (!barra) return;

  let agendado = false;

  function atualizar() {
    agendado = false;
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = alturaTotal > 0 ? window.scrollY / alturaTotal : 0;
    barra.style.transform = `scaleX(${progresso})`;
  }

  function agendar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(atualizar);
  }

  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar);
  atualizar();
}
