# Feature 002.5 - Today Experience

## Problema

O usuario precisa saber rapidamente o que fazer hoje, sem navegar por varias telas.

## Objetivo

Criar a tela inicial operacional do Passei AI.

## Valor para o usuario

- Reduzir indecisao e ansiedade.
- Centralizar tarefas.
- Facilitar o inicio do estudo.
- Mostrar progresso do dia.
- Transformar recomendacoes em acoes.

## Tela inicial

Nome oficial: **Hoje**.

## Conteudo esperado

- Saudacao e data.
- Tempo disponivel e tempo planejado.
- Indice de preparacao e progresso do dia.
- Lista priorizada de atividades.
- Revisoes pendentes e questoes recomendadas.
- Proxima atividade e resumo rapido de risco.
- Acao primaria: "Comecar agora".

## Tipos de atividades

- Estudo.
- Questoes.
- Revisao.
- Simulado.
- Leitura.

## Fonte dos dados

No MVP: mocks, schedule, study sessions, questions e study-engine.

No futuro: backend, historico real, metas, Banco de Erros, revisoes e simulados.

## Regras de negocio iniciais

- O Study Engine define a prioridade; a tela Hoje apenas apresenta e permite executar.
- Atividades atrasadas devem ser sinalizadas.
- Revisoes proximas devem ganhar prioridade.
- Atividades nao concluidas podem ser reagendadas.
- O usuario pode concluir uma atividade ou iniciar uma sessao a partir dela.

## UX

- Entendimento em ate 5 segundos.
- Uma acao principal.
- Baixa carga cognitiva e sem excesso de graficos.
- Foco em execucao.
- Tema visual igual ao Dashboard aprovado.

## Componentes sugeridos

- TodayHeader.
- DailyProgress.
- TodayPlan.
- TodayActivityCard.
- NextActionCard.
- ReviewAlert.
- RiskSummary.
- StartNowButton.

## Integracao com Study Engine

Definir contrato tipado para contexto do usuario, tempo disponivel, atividades pendentes, revisoes, desempenho, recomendacoes, prioridade e justificativa da recomendacao.

## Estados

- Loading.
- Empty.
- Error.
- Success.
- Dia concluido.
- Sem tempo disponivel.
- Atividades atrasadas.

## Fora do escopo

- IA generativa.
- Backend e notificacoes.
- Replanejamento automatico real.
- Multiusuario.
- Integracao com calendario externo.

## Criterios de aceite

- A tela comunica a proxima acao em ate cinco segundos e oferece uma unica acao primaria.
- Usa apenas o Design System oficial e funciona em mobile, tablet e desktop sem scroll horizontal inesperado.
- Possui estados definidos, navegacao por teclado, foco visivel, semantica e nomes acessiveis.
- Consome contratos tipados de dados, sem criar regras de prioridade fora do Study Engine.
- Inclui testes de renderizacao, plano com atividades, estados vazio e erro, conclusao e inicio de atividade, prioridade, responsividade basica e acessibilidade.

## Plano de testes

- Renderizacao da pagina e do plano com atividades.
- Estado vazio, erro e dia concluido.
- Inicio e conclusao de atividade.
- Ordem de prioridade.
- Responsividade basica e acessibilidade.

## Branch futura

`feature/today-experience`

## Commit futuro

`feat(today): implement daily study command center`
