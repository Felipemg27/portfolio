export function initMenu() {
  const links = document.querySelectorAll('[data-nav]');

  if (links.length === 0) return;

  const secoes = [...links]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle('active', link.getAttribute('href') === '#' + entrada.target.id)
        );
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  secoes.forEach((secao) => observer.observe(secao));
}
