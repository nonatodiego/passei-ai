# PROJECT_METRICS.md

Metricas de acompanhamento do Passei AI.

## Snapshot atual

| Metrica | Valor | Observacao |
| --- | ---: | --- |
| Sprints funcionais concluidas | 7 | Inclui MVP Local-First aprovado visualmente |
| Test files | 19 | Vitest |
| Testes | 60 | Inclui jornada persistente, auditoria de dados de produção e revalidação de edição de sessão |
| Frontend build | Verde | Build local aprovado com aviso de chunk grande |
| Lint | Verde | Executado fora do sandbox para contornar EPERM local |
| Bundle JS principal | 1,283.96 kB | Acima da meta; registrado em TD-001 e TD-010 |
| Product Experience Gate | Aprovado | MVP Local-First aprovado visualmente pelo Product Owner |
| Documentos de engenharia | 9 | Criados e mantidos no fluxo de governanca |
| Modulos oficiais frontend | 12 | Core, Shared, Study Engine e modulos de produto |
| Decision Engine | Funcional | Deterministico, explicavel e alimentado por fatos locais |

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
