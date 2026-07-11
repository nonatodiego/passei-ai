# ENGINEERING_PLAYBOOK.md

Playbook de engenharia do Passei AI.

## Princípios

- Produto simples, código claro.
- TypeScript estrito.
- Design System antes de variações locais.
- Sem backend ou autenticação até a sprint correspondente.
- Documentação acompanha a entrega.
- Nenhuma entrega termina com lint, build ou testes quebrados.
- Nenhuma Sprint começa sem Definition of Ready.
- Nenhuma Sprint termina sem Definition of Done, QA visual e aprovação do Product Owner.

## Fluxo oficial

```text
Backlog
→ Refinamento
→ Definition of Ready
→ Desenvolvimento
→ Validação técnica
→ QA visual
→ CTO Review
→ Definition of Done
→ Release
→ Commit
→ Pull Request
→ Merge manual
```

## Estados de Sprint

Os estados oficiais ficam em `TASK_QUEUE.md`:

- `Backlog`
- `Refinement`
- `Ready`
- `In Progress`
- `Visual Review`
- `CTO Review`
- `Release Ready`
- `Completed`
- `Blocked`

A Sprint só pode mudar de estado quando os critérios da etapa atual estiverem atendidos.

## Definition of Ready

Antes de implementar, validar `docs/DEFINITION_OF_READY.md`.

Se algum item obrigatório estiver pendente:

- não iniciar implementação;
- registrar bloqueio;
- solicitar decisão do Product Owner.

## Definition of Done

Antes de encerrar, validar `docs/DEFINITION_OF_DONE.md`.

Se algum item obrigatório estiver pendente:

- não concluir a Sprint;
- manter o estado apropriado no `TASK_QUEUE.md`;
- registrar pendências.

## Fluxo padrão da execução

1. Ler documentação obrigatória.
2. Inspecionar estado do repositório.
3. Validar Definition of Ready.
4. Criar branch `feature/*`, `fix/*`, `docs/*` ou `refactor/*`.
5. Planejar escopo, riscos, dependências e estratégia de testes.
6. Implementar apenas o escopo.
7. Executar lint, build e testes.
8. Rodar `npm run dev` e aguardar QA visual do Product Owner.
9. Executar CTO Review após aprovação visual.
10. Validar Definition of Done.
11. Atualizar documentação e métricas.
12. Atualizar `TASK_QUEUE.md`.
13. Criar commit convencional.
14. Abrir Pull Request.
15. Fazer merge manual somente após aprovação.

## Branches

- `feature/*`: funcionalidades e fundações incrementais.
- `fix/*`: correções.
- `docs/*`: documentação sem alteração funcional.
- `refactor/*`: mudança interna sem alteração de comportamento.

## Commits

Usar Conventional Commits:

- `feat(scope): summary`
- `fix(scope): summary`
- `docs(scope): summary`
- `test(scope): summary`
- `refactor(scope): summary`
- `chore(scope): summary`

## Política de dependências

- Evitar dependências sem necessidade clara.
- Justificar bibliotecas novas no PR.
- Preferir APIs nativas e padrões já existentes.
- Registrar impacto de bundle quando dependência afetar o frontend.
