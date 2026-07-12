# TASK_QUEUE.md

Fila de tarefas tecnicas e de produto do Passei AI.

## Estados oficiais

| Estado | Significado | Criterio para avancar |
| --- | --- | --- |
| Backlog | Item identificado, ainda sem refinamento suficiente | Entrar em Refinement |
| Refinement | Item em detalhamento | Definition of Ready atendida |
| Ready | Pronto para implementacao | Product Owner confirma inicio |
| In Progress | Implementacao em andamento | Escopo implementado e validacao tecnica verde |
| Visual Review | Aguardando QA visual | Product Owner aprova visualmente |
| CTO Review | Aguardando revisao tecnica | CTO Review concluida |
| Release Ready | Definition of Done atendida | Product Owner aprova release |
| Completed | Sprint concluida | Commit convencional criado |
| Blocked | Existe bloqueio critico | Bloqueio removido |

## Regras

- Tarefas de sprint devem ter escopo pequeno.
- Itens de divida tecnica devem referenciar `docs/TECH_DEBT.md`.
- Nao misturar feature de produto com fundacao tecnica no mesmo item.
- A Sprint so pode mudar de estado quando os criterios da etapa atual estiverem atendidos.
- A proxima Sprint so pode ser promovida apos aprovacao explicita do Product Owner.
- Nunca iniciar a proxima Sprint automaticamente.

## Current Sprint

| ID | Tipo | Titulo | Origem | Estado |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Ready

| ID | Tipo | Titulo | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-007 | Produto | Sprint 4 - Cronograma | ROADMAP | Ready |

## Backlog

| ID | Tipo | Titulo | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-001 | Tech debt | Criar alternativa textual para graficos | TD-004 | Backlog |
| TQ-003 | Performance | Avaliar code splitting para Recharts | TD-001 | Backlog |
| TQ-004 | Refactor | Remover wrappers legados apos migracao das paginas | TD-002 | Backlog |
| TQ-005 | Dashboard | Separar icones dos mocks do Dashboard | TD-003 | Backlog |
| TQ-010 | Arquitetura | Migrar arquivos globais legados para modulos oficiais | TD-006 | Backlog |
| TQ-011 | Arquitetura | Automatizar fronteiras entre modulos | TD-007 | Backlog |
| TQ-008 | Produto | Sprint 5 - Estudos e Questoes | ROADMAP | Backlog |
| TQ-009 | Produto | Sprint 6 - Banco de Erros e Revisoes | ROADMAP | Backlog |

## Completed

| ID | Tipo | Titulo | Origem | Estado |
| --- | --- | --- | --- | --- |
| TQ-002 | Engenharia | Configurar CI no GitHub Actions | Engineering Sprint | Completed |
| TQ-006 | Docs | Padronizar inicio e encerramento de Sprints | Engineering Governance | Completed |
| TQ-012 | Arquitetura | Engineering Phase 2 - Modular Platform | Architecture Review | Completed |
| TQ-013 | Produto | Sessoes de Estudo | Sprint Study Sessions | Completed |
| TQ-014 | Dev environment | Reexecutar lint e testes fora do sandbox apos EPERM local | TD-008 | Completed |

## Blocked

| ID | Tipo | Titulo | Origem | Estado |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
