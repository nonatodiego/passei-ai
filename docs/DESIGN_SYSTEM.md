# DESIGN_SYSTEM.md

## 1. Marca

**Passei AI**

**Planeje. Estude. Evolua. Passe.**

## 2. Direção visual

- Tema light.
- Aparência limpa.
- Estética SaaS.
- Alta legibilidade.
- Pouco ruído visual.
- Uso consistente de espaço.
- Componentes reutilizáveis e acessíveis por padrão.

## 3. Organização

O Design System oficial fica em `frontend/src/design-system`.

A organização adotada é inspirada em Atomic Design:

- `tokens`: decisões primitivas de interface.
- `atoms`: componentes básicos, como Button, Input, Select, Badge, Progress, Skeleton e Tooltip.
- `molecules`: composições pequenas, como Card, KPICard, Tabs, Toast, EmptyState e LoadingState.
- `organisms`: componentes mais estruturados, como Modal, Drawer e DataTable.
- `layout`: componentes estruturais, como Sidebar, Header, PageContainer, Section e Content.

Essa abordagem foi escolhida porque preserva componentes simples, facilita testes unitários e prepara a base para Storybook sem acoplar o Design System às páginas de produto.

## 4. Tokens

Os tokens ficam centralizados em `frontend/src/design-system/tokens.ts` e são consumidos pelo Tailwind.

### Cores

- Fundo: `#F8FAFC`
- Superfície: `#FFFFFF`
- Superfície neutra: `#F1F5F9`
- Azul principal: `#2563EB`
- Azul secundário: `#3B82F6`
- Primária suave: `#DBEAFE`
- Sucesso: `#16A34A`
- Atenção: `#F59E0B`
- Erro: `#DC2626`
- Informação: `#0EA5E9`
- Texto principal: `#0F172A`
- Texto secundário: `#64748B`
- Borda: `#E2E8F0`
- Foco: `#93C5FD`

### Tipografia

- Fonte: Inter.
- Fallback: system-ui, sans-serif.
- Escala: display, h1, h2, h3, body, small e caption.

### Espaçamento

Escala baseada em 4 px:

- 0
- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64

### Bordas

- Radius pequeno: 6 px.
- Radius padrão: 10 px.
- Radius grande: 16 px.
- Radius full: 9999 px.

### Sombras

- `sm`: sombra mínima.
- `panel`: cards e painéis.
- `floating`: overlays, drawers e toasts.

### Breakpoints

- Mobile: `320px`
- Tablet: `768px`
- Desktop: `1024px`
- Wide: `1280px`

### Z-index

- Base: `0`
- Dropdown: `20`
- Sticky: `30`
- Drawer: `40`
- Modal: `50`
- Toast: `60`

## 5. Componentes disponíveis

### Layout

- Sidebar.
- Header.
- PageContainer.
- Section.
- Content.

### UI

- Button.
- Input.
- Select.
- Badge.
- Card.
- KPICard.
- Modal.
- Drawer.
- Tooltip.
- Toast.
- Tabs.
- Progress.
- Skeleton.
- EmptyState.
- LoadingState.
- DataTable.

## 6. Acessibilidade

- Controles com foco visível.
- Inputs e selects com labels e estados de erro.
- Progress com `role="progressbar"` e valores ARIA.
- Modal com `role="dialog"` e `aria-modal`.
- Toast e LoadingState com `role="status"`.
- Tabela com cabeçalhos semânticos.
- Componentes não dependem apenas de cor para comunicar estado.

## 7. Responsividade

- Sidebar fixa em desktop e drawer no mobile.
- PageContainer com largura máxima e padding responsivo.
- DataTable com rolagem horizontal.
- Cards e composições compatíveis com grids responsivos.

## 8. Storybook futuro

A estrutura já está preparada para Storybook:

- cada componente está isolado em arquivo próprio;
- exports públicos ficam em `frontend/src/design-system/index.ts`;
- tokens e componentes não dependem de páginas específicas;
- testes básicos cobrem renderização e semântica dos componentes principais.

## 9. Pendências conhecidas

- Criar arquivos oficiais de marca em `assets/brand/`.
- Adicionar stories quando o Storybook for instalado.
- Implementar componentes adicionais do catálogo expandido: IconButton, Textarea, Checkbox, Radio, Switch, DatePicker, ErrorState e ChartCard.
- Evoluir testes para interações no navegador quando a suíte usar Testing Library ou Playwright.
