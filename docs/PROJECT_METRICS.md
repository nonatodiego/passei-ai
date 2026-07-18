# PROJECT_METRICS.md

Metricas de acompanhamento do Passei AI.

## Snapshot atual

| Metrica | Valor | Observacao |
| --- | ---: | --- |
| Sprints funcionais concluidas | 7 | Inclui MVP Local-First aprovado visualmente |
| Test files | 30 | Vitest e Testing Library |
| Testes | 101 | Inclui jornadas persistentes, integridade, backup, datas, formularios, navegacao e Decision Engine |
| Frontend build | Verde | Todos os chunks permanecem abaixo de 500 kB |
| Lint | Verde | Executado fora do sandbox para contornar EPERM local |
| Bundle JS principal | 191.14 kB | 60.63 kB gzip; reducao de aproximadamente 85% |
| Maior chunk de rota | 400.11 kB | Cronograma importado, 32.29 kB gzip; Dashboard 379.60 kB |
| Matriz responsiva | 81 combinacoes | 9 rotas em 9 larguras, sem overflow global |
| Auditoria npm | 1 alta | `xlsx` somente em script de importacao local, sem fix disponivel |
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
