# QUALITY_SCORE.md

Modelo de pontuação de qualidade do Passei AI.

## Escala

Nota de 0 a 10, calculada por revisão técnica ao final de cada sprint.

## Dimensões

| Dimensão | Peso | Critério |
| --- | ---: | --- |
| Build e validação | 20% | Lint, build e testes passam sem erro |
| Arquitetura | 15% | Organização, baixo acoplamento e evolução |
| Testes | 15% | Cobertura do comportamento entregue e casos críticos |
| Design System | 10% | Reuso de componentes e consistência visual |
| Acessibilidade | 10% | Semântica, foco, contraste e estados |
| Performance | 10% | Bundle, renderização e custo de dependências |
| Segurança | 10% | Sem segredos, validação, superfície de risco |
| Documentação | 10% | ROADMAP, CHANGELOG e docs técnicas atualizadas |

## Histórico

| Sprint | Nota | Observações |
| --- | ---: | --- |
| Frontend Foundation | 8.0 | Fundação funcional com mocks e rotas |
| Design System | 8.2 | Tokens e componentes oficiais criados |
| Dashboard | 8.4 | Boa composição e estados; dívida em gráficos e bundle |

| Engineering Phase 2 | 8.6 | Plataforma modular criada com Core, Shared, modulos oficiais e docs; migracao dos arquivos globais segue como divida controlada |

| Study Sessions + Product Experience Gate | 8.8 | Modulo de sessoes entregue, renderizacao Tailwind v4 restaurada, Dashboard aprovado visualmente e validacao final verde |
| Banco de Questoes | 8.7 | Modulo tipado, estados e fluxo de resposta claro; bundle e testes de interacao no navegador seguem como melhorias futuras |
| Today Experience | 8.5 | Centro diario aprovado visualmente, modular e tipado; bundle, testes DOM e decomposicao da pagina permanecem registrados |

## Regras de corte

- Abaixo de 7.0: não avançar sem plano de correção.
- Entre 7.0 e 8.4: aceitável com dívida registrada.
- 8.5 ou mais: pronto para evolução normal.
