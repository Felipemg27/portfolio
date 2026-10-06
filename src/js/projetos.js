const projetos = [
  {
    titulo: 'Tradutor com Mapa Interativo',
    descricao: 'App de tradução com interface sobre mapa-múndi interativo — digite o texto, escolha o idioma e veja a tradução em tempo real.',
    detalhes: 'Aplicação de tradução com interface montada sobre um mapa-múndi interativo. O usuário digita o texto, escolhe o idioma de destino e acompanha a tradução em tempo real, com uma experiência visual que une utilidade e exploração geográfica.',
    tecnologias: ['HTML5', 'CSS3', 'JavaScript'],
    imagem: '/img/tradutor-mapa.jpg',
    link: '#',
  },

  {
    titulo: 'Sabor & Brasa',
    descricao: 'Site de delivery para restaurante — cardápio com busca e categorias, carrinho e pedido finalizado no WhatsApp.',
    detalhes: 'Aplicação de delivery para o restaurante Sabor & Brasa. Conta com vitrine, cardápio com filtros por categoria e busca, carrinho de compras, login com Google, área administrativa e finalização do pedido direto no WhatsApp, com opção de entrega ou retirada no local.',
    tecnologias: ['HTML5', 'CSS3', 'JavaScript'],
    imagem: '/img/sabor-brasa-hero.png',
    galeria: ['/img/sabor-brasa-hero.png', '/img/sabor-brasa-cardapio.png'],
    link: '#',
  },

];

export function initProjetos() {
  const grade = document.querySelector('#grade-projetos');
  if (!grade) return;

  grade.innerHTML = projetos
    .map(
      ({ titulo, descricao, imagem }, indice) => `
        <article class="card-projeto efeito-cursor reveal" data-indice="${indice}" tabindex="0" role="button" aria-label="Ver detalhes de ${titulo}" style="--d:${indice * 80}ms">
            ${imagem ? `<img class="img-projeto" src="${imagem}" alt="Imagem do ${titulo}">` : ''}
            <div class="info-projeto">
                <h3>${titulo}</h3>
                <p>${descricao}</p>
                <span class="ver-detalhes">Ver detalhes</span>
            </div>
        </article>
      `
    )
    .join('');

  const overlay = document.querySelector('#modal-projeto');
  const botaoFechar = document.querySelector('#modal-fechar');
  if (!overlay || !botaoFechar) return;

  const imagemEl = overlay.querySelector('#modal-imagem');
  const galeriaEl = overlay.querySelector('#modal-galeria');
  const tituloEl = overlay.querySelector('#modal-titulo');
  const tagsEl = overlay.querySelector('#modal-tags');
  const descricaoEl = overlay.querySelector('#modal-descricao');
  const linkEl = overlay.querySelector('#modal-link');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImagem = document.querySelector('#lightbox-imagem');
  const lightboxFechar = document.querySelector('#lightbox-fechar');

  let ultimoFoco = null;

  function abrirModal(indice) {
    const projeto = projetos[indice];
    if (!projeto) return;

    ultimoFoco = document.activeElement;

    const galeria = projeto.galeria && projeto.galeria.length
      ? projeto.galeria
      : (projeto.imagem ? [projeto.imagem] : []);

    if (galeria.length) {
      imagemEl.src = galeria[0];
      imagemEl.alt = `Imagem do ${projeto.titulo}`;
      imagemEl.style.display = '';
    } else {
      imagemEl.removeAttribute('src');
      imagemEl.style.display = 'none';
    }

    if (galeria.length > 1) {
      galeriaEl.innerHTML = galeria
        .map((src, i) => `
          <button class="modal-thumb${i === 0 ? ' ativa' : ''}" data-src="${src}" aria-label="Ver imagem ${i + 1} de ${projeto.titulo}">
            <img src="${src}" alt="">
          </button>`)
        .join('');
      galeriaEl.style.display = '';
    } else {
      galeriaEl.innerHTML = '';
      galeriaEl.style.display = 'none';
    }
    tituloEl.textContent = projeto.titulo;
    tagsEl.innerHTML = projeto.tecnologias
      .map((tecnologia) => `<span class="modal-tag">${tecnologia}</span>`)
      .join('');
    descricaoEl.textContent = projeto.detalhes || projeto.descricao;

    if (projeto.link && projeto.link !== '#') {
      linkEl.href = projeto.link;
      linkEl.style.display = '';
    } else {
      linkEl.style.display = 'none';
    }

    overlay.classList.add('aberto');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    botaoFechar.focus();
  }

  function fecharModal() {
    overlay.classList.remove('aberto');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  }

  grade.addEventListener('click', (evento) => {
    const card = evento.target.closest('.card-projeto');
    if (card) abrirModal(Number(card.dataset.indice));
  });

  grade.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Enter' && evento.key !== ' ') return;
    const card = evento.target.closest('.card-projeto');
    if (card) {
      evento.preventDefault();
      abrirModal(Number(card.dataset.indice));
    }
  });

  botaoFechar.addEventListener('click', fecharModal);

  galeriaEl.addEventListener('click', (evento) => {
    const thumb = evento.target.closest('.modal-thumb');
    if (!thumb) return;
    imagemEl.src = thumb.dataset.src;
    galeriaEl.querySelectorAll('.modal-thumb').forEach((item) =>
      item.classList.toggle('ativa', item === thumb)
    );
  });

  overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) fecharModal();
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && overlay.classList.contains('aberto') && !lightbox.classList.contains('aberto')) {
      fecharModal();
    }
  });

  function abrirLightbox() {
    if (!imagemEl.src) return;
    lightboxImagem.src = imagemEl.src;
    lightboxImagem.alt = imagemEl.alt;
    lightbox.classList.add('aberto');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxFechar.focus();
  }

  function fecharLightbox() {
    lightbox.classList.remove('aberto');
    lightbox.setAttribute('aria-hidden', 'true');
    botaoFechar.focus();
  }

  imagemEl.addEventListener('click', abrirLightbox);
  lightboxFechar.addEventListener('click', fecharLightbox);

  lightbox.addEventListener('click', (evento) => {
    if (evento.target === lightbox || evento.target === lightboxImagem) {
      fecharLightbox();
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && lightbox.classList.contains('aberto')) {
      fecharLightbox();
    }
  });
}
