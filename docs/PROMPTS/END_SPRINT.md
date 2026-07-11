# END_SPRINT.md

Prompt específico para encerramento de Sprint do Passei AI.

## Objetivo

Encerrar uma Sprint somente quando a entrega estiver tecnicamente validada, aprovada visualmente pelo Product Owner e aderente à Definition of Done.

## Regras absolutas

- Não realizar merge automático.
- Não iniciar a próxima Sprint.
- Não criar commit final antes da aprovação visual do Product Owner.
- Não ignorar pendências da Definition of Done.
- Não alterar escopo sem decisão explícita do Product Owner.

## Etapas

### 1. Confirmar contexto

- Branch atual.
- Último commit.
- Sprint em encerramento.
- Status no `TASK_QUEUE.md`.
- Pendências registradas.

### 2. Validar Definition of Done

Ler e aplicar `docs/DEFINITION_OF_DONE.md`.

Se algum item obrigatório falhar:

- listar pendências;
- manter Sprint como `In Progress`, `Visual Review`, `CTO Review`, `Release Ready` ou `Blocked`;
- não criar commit final.

### 3. Executar validação técnica

Executar:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run test
```

Corrigir erros antes de continuar.

### 4. Solicitar aprovação visual

Executar:

```bash
npm run dev
```

- manter servidor ativo;
- informar URL local;
- aguardar validação visual do Product Owner;
- aplicar somente correções solicitadas;
- repetir lint, build e testes após correções.

### 5. Executar CTO Review

Após aprovação visual:

- entrar em modo CTO;
- não alterar código durante a análise;
- gerar relatório seguindo `docs/CTO_REPORT_TEMPLATE.md`;
- registrar dívida técnica, riscos, nota e recomendações.

### 6. Atualizar documentação

Atualizar quando aplicável:

- `docs/CHANGELOG.md`;
- `docs/ROADMAP.md`;
- `docs/TECH_DEBT.md`;
- `docs/QUALITY_SCORE.md`;
- `docs/PROJECT_METRICS.md`;
- `TASK_QUEUE.md`;
- `README.md`;
- ADRs.

### 7. Atualizar TASK_QUEUE

- mover Sprint concluída para `Completed`;
- promover a próxima Sprint para `Current Sprint` apenas após aprovação do Product Owner;
- não iniciar a próxima Sprint.

### 8. Commit

Criar commit usando Conventional Commits.

### 9. Relatório final

Gerar relatório com:

- Sprint;
- objetivo;
- status;
- branch;
- commit;
- arquivos criados;
- arquivos alterados;
- testes;
- lint;
- build;
- QA visual;
- CTO Review;
- dívida técnica;
- riscos;
- nota;
- próxima Sprint recomendada.
