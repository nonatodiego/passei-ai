# PROJECT_METRICS.md

Métricas de acompanhamento do Passei AI.

## Snapshot atual

| Métrica | Valor | Observação |
| --- | ---: | --- |
| Sprints funcionais concluídas | 3 | Foundation, Design System e Dashboard |
| Test files | 6 | Vitest |
| Testes | 14 | Última execução local |
| Frontend build | Verde | Com aviso de chunk grande |
| Lint | Verde | Última execução local |
| Bundle JS principal | ~682 kB | Após Sprint Dashboard |
| Documentos de engenharia | 9 | Criados nesta sprint |

## Métricas-alvo

| Área | Meta |
| --- | --- |
| Lint | 100% verde |
| Build | 100% verde |
| Testes críticos | 100% verdes |
| Bundle inicial | Monitorar abaixo de 500 kB ou justificar |
| Acessibilidade | Estados principais com semântica básica |
| Documentação | ROADMAP e CHANGELOG sempre atualizados |

## Rotina de atualização

- Atualizar ao final de cada sprint.
- Registrar avisos relevantes de build.
- Registrar aumento relevante de dependências ou bundle.
- Conectar riscos a `TECH_DEBT.md` quando necessário.
