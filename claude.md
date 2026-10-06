# Claude — Referência Rápida do Projeto Portfólio Felipe Veloso

## Visão Geral
Portfólio pessoal estilizado, dark theme, construído com Vite + HTML5 + CSS3 + JS puro. Objetivo: apresentar projetos, sobre e contato de forma interativa e visualmente atraente.

## Informações Críticas (consultar primeiro)

### Arquivos Principais
| Caminho | Descrição |
|---|---|
| `index.html` | Estrutura: header, hero (inicio), projetos, sobre, contato, footer |
| `src/main.js` | Entry point: `import './styles/main.css'` + initCursor, initMenu, initProjetos |
| `src/styles/main.css` | 571 linhas: variáveis CSS, layout, animações, responsivo |
| `src/js/cursor.js` | Cursor bolha mousemove + mix-blend-mode |
| `src/js/menu.js` | IntersectionObserver para link ativo (BUG: .ativo vs .active) |
| `src/js/projetos.js` | Array de projetos → injeta cards HTML em `#grade-projetos` |

### Style Principais (variáveis :root CSS) — tema monocromático estilo Portfar
```css
--bg: #0a0a0a;      --bg-soft: #101010;  --bg-card: #141414;
--border: rgba(255,255,255,0.09);  --text: #f5f5f5;   --text-muted: #a3a1aa;
--primary: #fafafa; --primary-hover: #e5e5e5;
--radius: 20px;
--max-width: 1200px;
```
Layout: sidebar fixa à esquerda no desktop (≥1024px, logo "F" + nav vertical + social), topbar no mobile. Hero em 2 colunas (texto + retrato P&B com moldura deslocada). Fotos em grayscale. Botões: branco sólido / fantasma. Fundo: aurora sutil monocromática + reveal no scroll (`src/js/reveal.js`).

### Fontes
- Body: `Inter`, system-ui, sans-serif (weight 400, 500, 600, 700, 800)
- Habilidades: `JetBrains Mono`, monospace

### Páginas/Seções (index.html)
1. **#inicio** (`.principal`) — hero 2 colunas: kicker "Olá, eu sou", h1 "Felipe Veloso.", cargo, CTAs (contato/projetos), retrato P&B (`.hero-foto`)
2. **#projetos** (`.secao`) — h2 "Projetos" + grid `.grade-projetos` (cards via JS, modal com galeria + lightbox)
3. **#sobre** (`.secao`) — h2 "Sobre mim", foto, bio, `.habilidades` com 5 tags
4. **#contato** (`.secao`) — h2 "Contato" + 3 links (email, linkedin, github)

### Bugs Conhecidos (Priority Fix)
1. **Menu ativo:** JS adiciona `.ativo` mas CSS usa `.active` → destaque nunca aparece ✅ CORRIGIR
2. **Img alt inválido:** `<img ...Foto de perfil...>` → falta `alt=` ✅ CORRIGIR  
3. **Imagem vazia:** `img/projeto.png` tem 0 KB ✅ CORRIGIR/remover
4. **Seletores typo:** `.couteudo-sobre p`, `.Conteudo-sobre h2` ✅ CORRIGIR
5. **Imagens 404 em produção:** `img/` usado no HTML mas Vite só copia `public/` ✅ Verificar paths

### Responsivo (breakpoints em main.css)
- **900px:** seçãoSobre vira 1 coluna grid
- **768px:** header/nav menor, hero 60vh, grid projetos 1 coluna, botões contato empilhados
- **480px:** h1 reduz para 36px

### Scripts
- `npm run dev` — http://localhost:5173
- `npm run build` — dist/
- `npm run preview` — preview local

### Próximos Passos Sugeridos
1. Corrigir bugs críticos (menu ativo, alt img, img vazia)
2. Refatorar paths de imagem (unificar em public/img/ ou ajustar imports)
3. Considerar restilização inspirada em p5aholic.me: frame fixo, tema toggle, enter screen, mascar transitions, nav lateral fixa (código original, não copiado)
4. Adicionar `@keyframes` para animações de entrada (atualmente só hover transitions)