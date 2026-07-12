# PROJECT_METRICS.md

Metricas de acompanhamento do Passei AI.

## Snapshot atual

| Metrica | Valor | Observacao |
| --- | ---: | --- |
| Sprints funcionais concluidas | 5 | Foundation, Design System, Dashboard, Sessoes de Estudo e Banco de Questoes |
| Test files | 9 | Vitest |
| Testes | 31 | Ultima execucao local aprovada |
| Frontend build | Verde | Build local aprovado com aviso de chunk grande |
| Lint | Verde | Executado fora do sandbox para contornar EPERM local |
| Bundle JS principal | ~724 kB | Apos os refinamentos de UX da Feature 002 - Banco de Questoes |
| Product Experience Gate | Aprovado | Dashboard aprovado visualmente pelo Product Owner |
| Documentos de engenharia | 9 | Criados e mantidos no fluxo de governanca |
| Modulos oficiais frontend | 12 | Core, Shared, Study Engine e modulos de produto |

## Metricas-alvo

| Area | Meta |
| --- | --- |
| Lint | 100% verde |
| Build | 100% verde |
| Testes criticos | 100% verdes |
| Bundle inicial | Monitorar abaixo de 500 kB ou justificar |
| Acessibilidade | Estados principais com semantica basica |
| Documentacao | ROADMAP e CHANGELOG sempre atualizados |

## Rotina de atualizacao

- Atualizar ao final de cada sprint.
- Registrar avisos relevantes de build.
- Registrar aumento relevante de dependencias ou bundle.
- Conectar riscos a `TECH_DEBT.md` quando necessario.
