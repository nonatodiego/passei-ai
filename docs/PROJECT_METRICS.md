# PROJECT_METRICS.md

Metricas de acompanhamento do Passei AI.

## Snapshot atual

| Metrica | Valor | Observacao |
| --- | ---: | --- |
| Sprints funcionais concluidas | 7 | Inclui MVP Local-First aprovado visualmente |
| Test files | 40 | 30 arquivos Vitest e 10 arquivos Playwright |
| Testes unitarios | 101 | Vitest e Testing Library |
| E2E local | 123 aprovados | 135 coletados e 12 skips intencionais; tres rodadas integrais consecutivas |
| E2E producao | 4 aprovados | Smoke somente leitura em desktop e mobile |
| Frontend build | Verde | Todos os chunks permanecem abaixo de 500 kB |
| Lint | Verde | Executado fora do sandbox para contornar EPERM local |
| Bundle JS principal | 191.14 kB | 60.63 kB gzip; reducao de aproximadamente 85% |
| Maior chunk de rota | 400.11 kB | Cronograma importado, 32.29 kB gzip; Dashboard 379.60 kB |
| Matriz responsiva | 81 combinacoes | 9 rotas em 9 larguras, sem overflow global |
| Baselines visuais | 53 | 9 rotas, estados adicionais e 5 breakpoints |
| Browsers E2E | 4 projetos | Chromium, Firefox, WebKit e mobile Chromium |
| Acessibilidade automatizada | 13 testes | Zero violacoes axe `critical`, `serious`, `moderate` ou `minor`; inclui teclado |
| Duracao E2E integral | 6m35s a 6m55s | Um worker para estabilidade no ambiente local e CI |
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
