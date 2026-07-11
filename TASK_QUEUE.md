# TASK_QUEUE.md

Fila de tarefas técnicas e de produto do Passei AI.

## Estados oficiais

| Estado | Significado | Critério para avançar |
| --- | --- | --- |
| Backlog | Item identificado, ainda sem refinamento suficiente | Entrar em Refinement |
| Refinement | Item em detalhamento | Definition of Ready atendida |
| Ready | Pronto para implementação | Product Owner confirma início |
| In Progress | Implementação em andamento | Escopo implementado e validação técnica verde |
| Visual Review | Aguardando QA visual | Product Owner aprova visualmente |
| CTO Review | Aguardando revisão técnica | CTO Review concluída |
| Release Ready | Definition of Done atendida | Product Owner aprova release |
| Completed | Sprint concluída | Commit convencional criado |
| Blocked | Existe bloqueio crítico | Bloqueio removido |

## Regras

- Tarefas de sprint devem ter escopo pequeno.
- Itens de dívida técnica devem referenciar `docs/TECH_DEBT.md`.
- Não misturar feature de produto com fundação técnica no mesmo item.
- A Sprint só pode mudar de estado quando os critérios da etapa atual estiverem atendidos.
- A próxima Sprint só pode ser promovida após aprovação explícita do Product Owner.
- Nunca iniciar a próxima Sprint automaticamente.

## Current Sprint

| ID | Tipo | Título | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-006 | Docs | Padronizar início e encerramento de Sprints | Engineering Governance | In Progress |

## Ready

| ID | Tipo | Título | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-007 | Produto | Sprint 4 — Cronograma | ROADMAP | Ready |

## Backlog

| ID | Tipo | Título | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-001 | Tech debt | Criar alternativa textual para gráficos | TD-004 | Backlog |
| TQ-003 | Performance | Avaliar code splitting para Recharts | TD-001 | Backlog |
| TQ-004 | Refactor | Remover wrappers legados após migração das páginas | TD-002 | Backlog |
| TQ-005 | Dashboard | Separar ícones dos mocks do Dashboard | TD-003 | Backlog |
| TQ-008 | Produto | Sprint 5 — Estudos e Questões | ROADMAP | Backlog |
| TQ-009 | Produto | Sprint 6 — Banco de Erros e Revisões | ROADMAP | Backlog |

## Completed

| ID | Tipo | Título | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-002 | Engenharia | Configurar CI no GitHub Actions | Engineering Sprint | Completed |

## Blocked

| ID | Tipo | Título | Origem | Estado |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
