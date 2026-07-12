# Passei AI

**Planeje. Estude. Evolua. Passe.**

O Passei AI é um copiloto inteligente de estudos para concursos públicos, certificações e exames profissionais.

## Visão

Organizar a preparação, analisar o desempenho, identificar pontos fracos, planejar revisões e recomendar o que estudar para aumentar as chances de aprovação.

## Público inicial

- MVP para uso pessoal do Diego.
- Preparado para concurseiros em geral.
- Preparado para pessoas estudando para certificações.

## Stack planejada

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React
- ESLint
- Prettier
- Vitest

### Backend futuro

- ASP.NET Core
- Entity Framework Core
- PostgreSQL

### Infraestrutura futura

- Docker
- GitHub Actions
- Deploy em ambiente cloud

## Frontend

O projeto frontend está em `frontend/` e contém:

- layout principal com sidebar responsiva e header;
- rotas para Dashboard, Cronograma, Estudos, Questões, Banco de Erros, Revisões, Simulados, Metas e Configurações;
- Dashboard com KPIs, evolução e plano de hoje usando dados mockados;
- tipos TypeScript para as entidades iniciais;
- dados mockados centralizados;
- componentes reutilizáveis de tabela, cards, badges, progresso, filtros e gráficos;
- serviço base preparado para futura API REST.

## Como executar

```bash
cd frontend
npm install
npm run dev
```

## Verificações

```bash
cd frontend
npm run lint
npm run build
npm run test
```

## Documentação principal

- [PRODUCT](docs/PRODUCT.md)
- [MANIFESTO](docs/MANIFESTO.md)
- [ROADMAP](docs/ROADMAP.md)
- [ARCHITECTURE](docs/ARCHITECTURE.md)
- [DESIGN SYSTEM](docs/DESIGN_SYSTEM.md)
- [DEVELOPMENT FLOW](docs/DEVELOPMENT_FLOW.md)
- [CODING STANDARDS](docs/CODING_STANDARDS.md)
- [CONTRIBUTING](docs/CONTRIBUTING.md)
- [CHANGELOG](docs/CHANGELOG.md)

## Engenharia e qualidade

- [ENGINEERING PLAYBOOK](docs/ENGINEERING_PLAYBOOK.md)
- [QA CHECKLIST](docs/QA_CHECKLIST.md)
- [CODE REVIEW CHECKLIST](docs/CODE_REVIEW_CHECKLIST.md)
- [RELEASE CHECKLIST](docs/RELEASE_CHECKLIST.md)
- [DEFINITION OF READY](docs/DEFINITION_OF_READY.md)
- [DEFINITION OF DONE](docs/DEFINITION_OF_DONE.md)
- [TECH DEBT](docs/TECH_DEBT.md)
- [QUALITY SCORE](docs/QUALITY_SCORE.md)
- [PROJECT METRICS](docs/PROJECT_METRICS.md)
- [CTO REPORT TEMPLATE](docs/CTO_REPORT_TEMPLATE.md)
- [SPRINT TEMPLATE](docs/SPRINT_TEMPLATE.md)
- [TASK QUEUE](TASK_QUEUE.md)
- [LOCAL-FIRST ARCHITECTURE](docs/LOCAL_FIRST_ARCHITECTURE.md)

## Status

Projeto em fase **Foundation**. Esta entrega não implementa autenticação, backend ou persistência de dados.
