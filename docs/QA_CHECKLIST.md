# QA_CHECKLIST.md

Checklist de QA para entregas do Passei AI.

## Validação obrigatória

- [ ] `npm.cmd run lint` executado.
- [ ] `npm.cmd run build` executado.
- [ ] `npm.cmd run test` executado.
- [ ] Erros corrigidos.
- [ ] Avisos relevantes registrados.
- [ ] Sem arquivos temporários no commit.
- [ ] Sem segredos versionados.

## Definition of Ready

- [ ] Sprint marcada como `Ready` antes da implementação.
- [ ] Checklist de `docs/DEFINITION_OF_READY.md` validado.
- [ ] Bloqueios documentados quando existirem.

## Frontend

- [ ] Layout funciona em mobile.
- [ ] Layout funciona em tablet.
- [ ] Layout funciona em desktop.
- [ ] Estados loading, empty, error e success avaliados quando aplicável.
- [ ] Componentes usam o Design System.
- [ ] Tabelas têm rolagem horizontal em telas pequenas.
- [ ] Textos não quebram layout.

## QA visual

- [ ] `npm run dev` executado.
- [ ] URL local informada.
- [ ] Servidor mantido ativo até validação.
- [ ] Product Owner aprovou visualmente.
- [ ] Ajustes solicitados foram limitados ao escopo.
- [ ] Lint, build e testes foram repetidos após ajustes.

## Acessibilidade

- [ ] Controles têm label ou nome acessível.
- [ ] Foco é visível.
- [ ] Sem dependência exclusiva de cor para comunicar estado.
- [ ] Estados de erro usam semântica adequada.
- [ ] Ícones decorativos usam `aria-hidden`.

## CTO Review

- [ ] CTO Review realizada após QA visual.
- [ ] Relatório seguiu `docs/CTO_REPORT_TEMPLATE.md`.
- [ ] Dívidas técnicas registradas.
- [ ] Riscos documentados.
- [ ] Nota da Sprint definida.

## Definition of Done

- [ ] Checklist de `docs/DEFINITION_OF_DONE.md` validado.
- [ ] Product Owner aprovou a entrega.
- [ ] Sprint pronta para `Release Ready` ou `Completed`.

## Documentação

- [ ] `docs/ROADMAP.md` atualizado.
- [ ] `docs/CHANGELOG.md` atualizado.
- [ ] `docs/PROJECT_METRICS.md` atualizado quando necessário.
- [ ] `docs/QUALITY_SCORE.md` atualizado.
- [ ] `TASK_QUEUE.md` atualizado.
- [ ] Documentação técnica atualizada quando houver decisão nova.
