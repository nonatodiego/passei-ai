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

## 4. Backend

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
