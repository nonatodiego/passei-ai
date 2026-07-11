# DEVELOPMENT_FLOW.md

## 1. Fluxo oficial

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

## 2. Branches

- `main`: estável.
- `develop`: integração.
- `feature/*`: funcionalidades.
- `fix/*`: correções.
- `hotfix/*`: correção urgente.
- `docs/*`: documentação.
- `refactor/*`: refatorações.

## 3. Estados no TASK_QUEUE

- `Backlog`: item identificado, ainda não refinado.
- `Refinement`: item em detalhamento.
- `Ready`: Definition of Ready atendida.
- `In Progress`: implementação em andamento.
- `Visual Review`: aguardando validação visual do Product Owner.
- `CTO Review`: aguardando revisão técnica profunda.
- `Release Ready`: pronto para commit/release após DoD.
- `Completed`: Sprint concluída.
- `Blocked`: impedimento crítico.

## 4. Definition of Ready

Antes de implementar, validar `docs/DEFINITION_OF_READY.md`.

Nenhuma Sprint deve sair de `Ready` para `In Progress` sem:

- objetivo claro;
- escopo e fora do escopo;
- critérios de aceite;
- riscos e dependências;
- branch definida;
- documentação obrigatória lida.

## 5. Desenvolvimento

Regras:

- preservar funcionalidades existentes;
- implementar apenas o escopo;
- usar o Design System;
- evitar refatorações amplas sem necessidade;
- manter TypeScript estrito;
- evitar `any` desnecessário.

## 6. Validação técnica

Frontend:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run test
```

Backend futuro:

```bash
dotnet restore
dotnet build
dotnet test
```

## 7. QA visual

Rodar:

```bash
npm run dev
```

Regras:

- manter o servidor ativo;
- informar URL local;
- aguardar aprovação visual do Product Owner;
- corrigir apenas o que for solicitado;
- repetir lint, build e testes após ajustes.

## 8. CTO Review

Após aprovação visual:

- entrar em modo CTO;
- não alterar código durante a análise;
- seguir `docs/CTO_REPORT_TEMPLATE.md`;
- avaliar arquitetura, código, UX, performance, acessibilidade, segurança, escalabilidade, testes e dívida técnica.

## 9. Definition of Done

Antes de encerrar, validar `docs/DEFINITION_OF_DONE.md`.

Se algum item estiver pendente, a Sprint não pode ser marcada como `Completed`.

## 10. Finalização

- Atualizar `CHANGELOG.md`.
- Atualizar `ROADMAP.md`.
- Atualizar `TECH_DEBT.md` quando necessário.
- Atualizar `QUALITY_SCORE.md`.
- Atualizar `PROJECT_METRICS.md` quando necessário.
- Atualizar `TASK_QUEUE.md`.
- Criar commit convencional.
- Abrir Pull Request.
- Fazer merge manual.

## 11. Commits

Conventional Commits:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `test`
- `chore`

Exemplos:

```text
feat(dashboard): add performance summary
fix(schedule): correct overdue calculation
docs(engineering): add sprint governance workflow
```

## 12. Regra

Não desenvolver diretamente na `main`.
Não fazer merge automático.
Não iniciar a próxima Sprint no encerramento da Sprint atual.
