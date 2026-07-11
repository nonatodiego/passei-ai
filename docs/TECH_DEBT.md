# TECH_DEBT.md

Registro vivo de dívida técnica do Passei AI.

## Objetivo

Manter visibilidade sobre decisões provisórias, riscos técnicos e melhorias que não devem bloquear a entrega atual, mas precisam voltar ao radar.

## Classificação

| Nível | Critério | Ação esperada |
| --- | --- | --- |
| Alta | Pode quebrar entrega, segurança, dados ou evolução central | Planejar na sprint atual ou próxima |
| Média | Aumenta custo de manutenção ou limita evolução | Priorizar em até 2 sprints |
| Baixa | Incômodo local, melhoria de limpeza ou consistência | Resolver quando tocar na área |

## Itens atuais

| ID | Área | Dívida | Impacto | Prioridade | Status |
| --- | --- | --- | --- | --- | --- |
| TD-001 | Frontend | Bundle inicial acima de 500 kB por Recharts | Pode afetar carregamento futuro | Média | Aberto |
| TD-002 | Design System | Componentes legados em `components/ui` ainda existem como wrappers | Pode confundir imports | Média | Aberto |
| TD-003 | Dashboard | Mocks misturam ícones de UI com dados | Acopla apresentação e dado | Média | Aberto |
| TD-004 | Acessibilidade | Gráficos ainda não possuem alternativa textual/tabular completa | Leitura por tecnologia assistiva limitada | Alta | Aberto |
| TD-005 | Git hygiene | Servidor local gerava `.dev-server/` não ignorado | Risco de lixo local em commits | Baixa | Mitigado |

| TD-006 | Arquitetura modular | Pastas globais legadas ainda coexistem com modulos oficiais | Pode confundir fronteiras ate a migracao incremental terminar | Media | Aberto |
| TD-007 | Arquitetura modular | Fronteiras entre modulos ainda nao sao validadas automaticamente | Imports cruzados indevidos podem surgir conforme o produto cresce | Media | Aberto |

## Regras

- Toda dívida técnica relevante deve ter ID.
- Dívidas de prioridade alta precisam aparecer no `TASK_QUEUE.md`.
- Dívida encerrada deve manter histórico com status `Resolvido` ou `Mitigado`.
- Não usar este arquivo como desculpa para aceitar erro de lint, build ou teste.
