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

## Frontend

- [ ] Layout funciona em mobile.
- [ ] Layout funciona em tablet.
- [ ] Layout funciona em desktop.
- [ ] Estados loading, empty, error e success avaliados quando aplicável.
- [ ] Componentes usam o Design System.
- [ ] Tabelas têm rolagem horizontal em telas pequenas.
- [ ] Textos não quebram layout.

## Acessibilidade

- [ ] Controles têm label ou nome acessível.
- [ ] Foco é visível.
- [ ] Sem dependência exclusiva de cor para comunicar estado.
- [ ] Estados de erro usam semântica adequada.
- [ ] Ícones decorativos usam `aria-hidden`.

## Documentação

- [ ] `docs/ROADMAP.md` atualizado.
- [ ] `docs/CHANGELOG.md` atualizado.
- [ ] Documentação técnica atualizada quando houver decisão nova.
- [ ] Dívida técnica registrada quando aplicável.
