# ARCHITECTURE.md

## 1. Visão geral

Arquitetura em camadas, preparada para evolução gradual.

```text
Frontend React
    ↓
Services / API Client
    ↓
ASP.NET Core Web API
    ↓
Application Services
    ↓
Entity Framework Core
    ↓
PostgreSQL
```

## 2. Monorepo

```text
Passei-AI/
├── frontend/
├── backend/
├── docs/
├── assets/
├── scripts/
├── .github/
├── README.md
└── LICENSE
```

## 3. Frontend

### Stack
- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- React Router.
- Recharts.
- Lucide React.

### Estrutura

```text
frontend/src/
├── assets/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── charts/
│   └── forms/
├── pages/
├── routes/
├── services/
├── hooks/
├── types/
├── mocks/
├── utils/
├── constants/
├── App.tsx
├── main.tsx
└── index.css
```

## 4. Arquitetura modular do frontend

O frontend adota uma arquitetura modular incremental.

Camadas oficiais:

- `core/`: infraestrutura da aplicacao, incluindo providers, router, navigation, theme, permissions futuras, feature flags futuras, app context, config e error boundary.
- `shared/`: codigo transversal sem dominio especifico, incluindo constants, types, utils, hooks, services, config e providers.
- `study-engine/`: fonte oficial de decisao de estudos, prioridades, recomendacoes, revisoes, metas e plano diario.
- `dashboard/`, `schedule/`, `study/`, `questions/`, `reviews/`, `mock-exams/`, `goals/`, `analytics/` e `settings/`: modulos de produto.

Cada modulo de produto segue:

```text
module/
├── components/
├── hooks/
├── services/
├── types/
├── mocks/
├── pages/
└── README.md
```

A migracao dos arquivos globais existentes deve ser incremental para preservar funcionalidades.

## 5. Backend

### Stack
- ASP.NET Core.
- Entity Framework Core.
- PostgreSQL.
- FluentValidation.
- Swagger/OpenAPI.
- Serilog.
- Docker.

### Estrutura sugerida

```text
backend/
├── src/
│   ├── PasseiAI.Api/
│   ├── PasseiAI.Application/
│   ├── PasseiAI.Domain/
│   └── PasseiAI.Infrastructure/
└── tests/
    ├── PasseiAI.UnitTests/
    └── PasseiAI.IntegrationTests/
```

## 5. Entidades principais

- User.
- Contest.
- Certification.
- Discipline.
- ScheduleItem.
- StudySession.
- QuestionSession.
- ErrorRecord.
- Review.
- MockExam.
- Goal.
- DailyPlan.
- Recommendation.

No MVP sem login, pode existir um usuário local padrão.

## 6. Comunicação

- REST no MVP.
- JSON.
- API versionada.
- DTOs separados das entidades.
- Tratamento consistente de erros.
- Paginação em listas extensas.

## 7. Persistência

- PostgreSQL.
- Migrations pelo Entity Framework.
- Seeds para dados iniciais.
- Datas em UTC no backend.
- Conversão para horário local no frontend.

## 8. Segurança

Mesmo sem login inicialmente:

- nunca versionar segredos;
- usar variáveis de ambiente;
- validar entrada;
- limitar CORS;
- preparar arquitetura para autenticação futura.

## 9. Escalabilidade

A arquitetura deve permitir:

- múltiplos usuários;
- múltiplos concursos;
- múltiplas certificações;
- planos freemium;
- IA;
- armazenamento de arquivos;
- notificações;
- aplicativo móvel.

## 10. Decisões registradas

Consultar a pasta `docs/ADR`.
## 11. Direcao por jornadas e contratos

Os modulos de produto devem ser compostos para atender jornadas do usuario, especialmente a futura tela **Hoje**, sem concentrar regras de prioridade nas paginas. Cada modulo produz contratos tipados de fatos, eventos ou metricas para consumo futuro pelo Study Engine e Analytics. O Study Engine permanece a fonte oficial de decisao; a IA futura sera uma interface sobre seus contratos e recomendacoes.

## 12. Decision Engine

O Decision Engine e a camada oficial para decisao de produto: Study Engine, Review Engine, Recommendation Engine, Goal Engine e Analytics Engine. Nenhuma regra de negocio relacionada a prioridade pode existir na UI; modulos de produto produzem fatos tipados e consomem resultados do motor. Consulte `docs/DECISION_ENGINE.md`.
