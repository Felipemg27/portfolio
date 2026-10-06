# Agente — Portfólio Felipe Veloso

## Contexto
Projeto de portfólio pessoal de Felipe Veloso (Felipemg27), desenvolvido com Vite, HTML5, CSS3 e JavaScript puro (ES modules). O objetivo é apresentar projetos, experiência e informações de contato de forma estilizada e interativa.

## Papel do Agente
- Auxiliar no desenvolvimento, restilização ou manutenção do portfólio
- Aplicar o estilo visual inspirado em portfólios modernos e minimalistas (referência: p5aholic.me aesthetic, mas sem copiar código)
- Manter consistência com as escolhas já existentes (theme dark indigo, Inter + JetBrains Mono, cursor bolha, grid de projetos)
- Evitar replicar código diretamente de referências externas (o autor do p5aholic repudia cópias); usar apenas a estética como inspiração

## Estrutura do Projeto
```
portifólio/
├── index.html              — ESTRUTURA HTML (82 linhas)
├── package.json            — Vite 7.1.0, type: module
├── vite.log / vite-dev.log — Logs de desenvolvimento
├── src/
│   ├── main.js             — Entry point: importa CSS e init 3 módulos
│   ├── styles/
│   │   └── main.css        — 571 linhas: variáveis CSS, layout, animações hover, responsivo
│   └── js/
│       ├── cursor.js       — Cursor bolha customizado (mousemove, mix-blend-mode: difference)
│       ├── menu.js         — IntersectionObserver para marcar link ativo no menu (BUG: JS usa .ativo, CSS usa .active)
│       └── projetos.js     — Renderiza cards de projetos a partir de array JS (sobrescreve HTML hardcoded)
├── img/                    — Imagens usadas pelo index (./img/... pastra raiz)
│   ├── Captura de tela 2026-09-02 105931.png
│   ├── Captura de tela 2026-09-02 110144.png
│   ├── Captura de tela 2026-09-03 091749.png
│   └── projeto.png         — ARQUIVO VAZIO (0 KB)
├── public/img/             — Imagens servidas pelo Vite (public pastra)
│   ├── fotodeperfil.jpg
│   ├── perfil.jpg
│   ├── Projeto.png
│   ├── tradutor-mapa.jpg
│   └── tradutor-mapa.png
└── dist/                   — Build de produção
```

## Pontos Críticos (Known Issues)
1. **Imagem vazia:** `img/projeto.png` tem 0 KB — remover ou substituir
2. **Classe de menu divergente:** JS adiciona `.ativo` mas CSS estiliza `.active` — destaque do menu nunca aparece
3. **HTML inválido:** `<img ... src="..."Foto de perfil...>` — falta `alt=`, atributo vira lixo texto
4. **Seletores com typo:** `.couteudo-sobre p` e `.Conteudo-sobre h2` — funcionam por acidente por haver seletor correto ao lado
5. **Valores CSS inválidos:** `align-items: bottom` (linha 79) e `display: center` (linha 347) — ignorados pelos browsers
6. **Duas fontes de imagens:** `img/` (usado no HTML mas não copiado pelo Vite build) vs `public/img/` (usado pelo JS) — imagens do index dão 404 em produção
7. **`--primary-glow` e `--bg-soft`** declarados mas nunca usados no CSS
8. **Projeto 2** no array `projetos.js` é placeholder (`link: '#'`)

## Estilo Visual (Resumo)
- **Tema:** Dark mode quase-preto com acento indigo→roxo→ciano (`--primary: #6366f1`)
- **Fontes:** `Inter` (body, sans-serif) + `JetBrains Mono` (tags de habilidade, monospace)
- **Layout:** Header sticky com glassmorphism (`backdrop-filter: blur(12px)`), hero flex, grid de projetos responsivo, sobre em grid 2-colunas
- **Animações:** Apenas `transition` + `transform` no hover — **nenhum `@keyframes`**
- **Efeitos:** Cursor bolha com `mix-blend-mode: difference`, seleção de texto com `--primary`, scrollbar customizada
- **Responsivo:** 3 breakpoints (900px, 768px, 480px) — header menor, hero 60vh, grid 1 coluna, botões contato empilhados
- **Cores de destaque:** `--primary: #6366f1`, `--primary-hover: #4f46e5`, `--text: #fafafa`, `--text-muted: #a1a1aa`

## Scripts Disponíveis
- `npm run dev` — Inicia Vite em http://localhost:5173
- `npm run build` — Gera build de produção em `dist/`
- `npm run preview` — Preview do build localmente

## Referências de Estilo (Inspiração — NÃO Copiar Código)
- p5aholic.me: fundos WebGL/GLSL, frames fixos laterais, toggle light/dark + monospaced, mascar transições entre páginas, nav lateral fixa com bolinhas ativas, enter screen, mix-blend-mode: difference, tipografia editorial minimalista
- Princípio: usar a estética (cores, layout philosophy) como inspiração para escrever código original adaptado ao Felipe's portfolio