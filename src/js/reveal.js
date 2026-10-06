export function initReveal() {
  const elementos = document.querySelectorAll('.reveal');
  if (elementos.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visivel'));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach((el) => observer.observe(el));
}
