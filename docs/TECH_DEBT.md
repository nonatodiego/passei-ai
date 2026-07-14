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
| TD-008 | Dev environment | `npm.cmd run lint` e `npm.cmd run test` podem falhar no sandbox com EPERM em `C:\Users\Pichau` | Contornado com execucao fora do sandbox; manter observacao para futuras sessoes | Baixa | Mitigado |
| TD-009 | Questions | Testes atuais validam renderizacao estatica e regras puras; fluxos completos no navegador ainda dependem de ambiente DOM | Pode reduzir confianca em interacoes futuras | Media | Aberto |
| TD-010 | Performance | Bundle principal acima de 500 kB | Pode afetar carregamento inicial | Media | Aberto |
| TD-011 | Navigation testing | Ausencia de testes DOM para Sidebar, links ativos e navegacao | Regressao de rotas pode passar sem cobertura de integracao | Media | Aberto |
| TD-012 | Today | TodayPage deve ser decomposta antes de novas interacoes | Crescimento da pagina pode reduzir legibilidade e testabilidade | Media | Aberto |
| TD-013 | Visual QA | Testes visuais automatizados por breakpoint ainda nao existem | Regressao responsiva depende de revisao manual | Media | Aberto |
| TD-014 | Today UX | Status das atividades pode ganhar maior clareza visual | Pode reduzir leitura rapida do plano em evolucoes futuras | Baixa | Aberto |
| TD-015 | Decision Engine | Consolidar contratos de fatos em uma porta unica | Integracao entre modulos pode divergir | Media | Aberto |
| TD-016 | Arquitetura modular | Automatizar fronteiras entre modulos | Imports indevidos podem crescer sem deteccao | Media | Aberto |
| TD-017 | Mocks | Evitar introducao de regras locais em mocks | Prioridades podem divergir do Decision Engine | Media | Aberto |
| TD-018 | Backend | Definir contexto de usuario para persistencia e multiusuario | Contratos atuais ainda sao locais ao MVP | Media | Aberto |
| TD-019 | Error Bank | Formulario manual, foco e acoes mockadas precisavam de testes DOM | Cobertura adicionada com Testing Library | Media | Resolvido |
| TD-020 | Testes | Auditoria de mocks cobre rotas criticas, mas ainda nao cobre todos os arquivos legados nao roteados | Risco residual de reintroducao em codigo legado | Media | Aberto |

## Regras

- Toda dívida técnica relevante deve ter ID.
- Dívidas de prioridade alta precisam aparecer no `TASK_QUEUE.md`.
- Dívida encerrada deve manter histórico com status `Resolvido` ou `Mitigado`.
- Não usar este arquivo como desculpa para aceitar erro de lint, build ou teste.
