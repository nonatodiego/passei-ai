# DEFINITION_OF_DONE.md

A Definition of Done define as condições mínimas para uma Sprint ser considerada concluída no Passei AI.

## Regra

Uma Sprint só pode ser encerrada quando todos os itens obrigatórios estiverem atendidos. Se qualquer item estiver pendente, a Sprint deve permanecer como `In Progress`, `Visual Review`, `CTO Review`, `Release Ready` ou `Blocked` no `TASK_QUEUE.md`.

## Checklist reutilizável

- [ ] Escopo implementado.
- [ ] Critérios de aceite atendidos.
- [ ] Lint aprovado.
- [ ] Build aprovado.
- [ ] Testes aprovados.
- [ ] QA visual aprovado pelo Product Owner.
- [ ] Acessibilidade básica verificada.
- [ ] Responsividade validada.
- [ ] CTO Review realizada.
- [ ] Dívida técnica registrada.
- [ ] `docs/CHANGELOG.md` atualizado.
- [ ] `docs/ROADMAP.md` atualizado.
- [ ] `docs/PROJECT_METRICS.md` atualizado quando necessário.
- [ ] `docs/QUALITY_SCORE.md` atualizado.
- [ ] `TASK_QUEUE.md` atualizado.
- [ ] Commit convencional criado.
- [ ] Sem arquivos temporários.
- [ ] Sem segredos.
- [ ] Product Owner aprovou a entrega.

## Critérios detalhados

### Escopo e aceite

Tudo que foi prometido para a Sprint deve estar entregue, validável e sem expansão indevida.

### Validação técnica

Os comandos obrigatórios devem passar:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run test
```

### QA visual

O frontend deve rodar com `npm run dev`, a URL local deve ser informada e o Product Owner deve aprovar visualmente antes do commit final.

### CTO Review

A revisão deve seguir `docs/CTO_REPORT_TEMPLATE.md` e avaliar arquitetura, código, UX, design, performance, acessibilidade, segurança, escalabilidade, testes, dívida técnica e riscos.

### Documentação

Toda documentação impactada precisa ser atualizada antes do encerramento.

### TASK_QUEUE

A Sprint concluída deve ser movida para `Completed`, e a próxima Sprint pode ser promovida para `Current Sprint` somente após aprovação explícita do Product Owner.

### Release

Não fazer merge automático. O merge é manual e ocorre fora do encerramento local da Sprint.
