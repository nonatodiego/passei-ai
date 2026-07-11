# CHANGELOG.md

Todas as mudanças relevantes serão registradas aqui.

Formato inspirado em Keep a Changelog.

## [Unreleased]

### Added

- Fundação documental do Passei AI.
- PRODUCT.
- MANIFESTO.
- ROADMAP.
- ARCHITECTURE.
- DESIGN SYSTEM.
- DEVELOPMENT FLOW.
- CODING STANDARDS.
- CONTRIBUTING.
- Prompts do Codex.
- ADRs iniciais.
- Licença MIT.
- Fundação do frontend com React, TypeScript, Vite, Tailwind CSS, React Router, Recharts e Lucide React.
- Layout principal com sidebar responsiva e header.
- Rotas e páginas iniciais do MVP.
- Dashboard com dados mockados, KPIs, evolução e plano de hoje.
- Tipos TypeScript, mocks centralizados e serviço base para futura API REST.
- Testes iniciais com Vitest.
- Design Tokens centralizados para cores, tipografia, espaçamento, bordas, sombras, breakpoints e z-index.
- Biblioteca oficial de componentes do Design System em `frontend/src/design-system`.
- Componentes Button, Input, Select, Badge, Card, KPICard, Modal, Drawer, Tooltip, Toast, Tabs, Progress, Skeleton, EmptyState, LoadingState e DataTable.
- Componentes de layout PageContainer, Section e Content.
- Estrutura preparada para Storybook futuro.
- Testes básicos dos tokens e componentes principais do Design System.
- Dashboard executivo usando exclusivamente o Design System oficial.
- KPIs de dias até a prova, índice de preparação, horas estudadas, questões, acertos, simulados, revisões e progresso.
- Plano de Hoje, gráfico de evolução semanal, ranking de disciplinas e atividades recentes.
- Estados de loading, empty, error e success para o Dashboard.
- Mocks e tipos específicos do Dashboard.
- Componentes ChartCard e ErrorState no Design System.
- Testes de renderização, estado vazio e estado de erro do Dashboard.
- Documentação de engenharia: TECH_DEBT, QUALITY_SCORE, QA_CHECKLIST, ENGINEERING_PLAYBOOK, CTO_REPORT_TEMPLATE, RELEASE_CHECKLIST, PROJECT_METRICS e CODE_REVIEW_CHECKLIST.
- TASK_QUEUE para priorização de tarefas técnicas e próximas sprints.
- CODEOWNERS e workflow básico de CI para lint, build e testes.
- Definition of Ready e Definition of Done oficiais.
- Prompt mestre `START_SPRINT` e prompt `END_SPRINT`.
- Template de especificação de Sprint.
- Estados oficiais da fila de tarefas: Backlog, Refinement, Ready, In Progress, Visual Review, CTO Review, Release Ready, Completed e Blocked.

### Changed

- README atualizado com visão oficial do produto, stack, execução e verificações.
- ROADMAP atualizado com o status da fundação do frontend.
- DESIGN_SYSTEM atualizado com organização, tokens, componentes e pendências.
- Tailwind passou a consumir tokens centralizados.
- Componentes antigos de UI passaram a usar a biblioteca oficial do Design System.
- Rota do Dashboard passou a usar a estrutura `pages/dashboard`.
- Templates de issue e pull request revisados para padronizar evidências, escopo e critérios de aceite.
- README atualizado com links de engenharia e qualidade.
- Playbook, fluxo de desenvolvimento, checklists e contributing atualizados com QA visual, CTO Review, DoR e DoD.
- TASK_QUEUE reorganizado para suportar governança de início e encerramento de Sprints.

## [0.1.0] - 2026-07-11

### Added

- Nome Passei AI.
- Slogan oficial.
- Visão inicial.
- Proposta de valor.
