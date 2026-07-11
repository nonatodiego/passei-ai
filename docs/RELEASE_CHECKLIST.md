# RELEASE_CHECKLIST.md

Checklist de release do Passei AI.

## Antes da release

- [ ] Branch atualizada com a integração definida.
- [ ] Definition of Ready foi atendida no início.
- [ ] Definition of Done validada.
- [ ] CHANGELOG revisado.
- [ ] ROADMAP revisado.
- [ ] TECH_DEBT revisado.
- [ ] QUALITY_SCORE revisado.
- [ ] PROJECT_METRICS revisado quando necessário.
- [ ] QA_CHECKLIST concluído.
- [ ] CODE_REVIEW_CHECKLIST revisado.
- [ ] Sem arquivos temporários.
- [ ] Sem segredos.

## Validação técnica

- [ ] `npm.cmd run lint`
- [ ] `npm.cmd run build`
- [ ] `npm.cmd run test`
- [ ] CI verde no GitHub Actions.
- [ ] Avisos conhecidos documentados.

## Validação visual

- [ ] `npm run dev` executado.
- [ ] URL local informada.
- [ ] Product Owner aprovou visualmente.
- [ ] Ajustes solicitados foram concluídos.

## CTO Review

- [ ] CTO Review realizada.
- [ ] Riscos documentados.
- [ ] Dívidas registradas.
- [ ] Nota registrada.

## TASK_QUEUE

- [ ] Sprint concluída movida para `Completed`.
- [ ] Próxima Sprint promovida para `Current Sprint` somente após aprovação do Product Owner.
- [ ] Próxima Sprint não foi iniciada automaticamente.

## Pós-release

- [ ] Commit convencional criado.
- [ ] Pull Request preparado.
- [ ] Merge manual, quando aprovado.
- [ ] Notas de release publicadas quando aplicável.
- [ ] Próximas tarefas priorizadas.
