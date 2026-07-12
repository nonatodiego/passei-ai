# Decision Engine

## Objetivo

O Decision Engine transforma fatos tipados sobre estudo, desempenho, disponibilidade e objetivos em decisoes explicaveis: o que fazer, quando fazer e por que fazer. A UI apresenta decisoes; ela nao calcula prioridade.

## Arquitetura

```text
Study, Questions, Schedule, Error Bank, Goals
                -> fatos e eventos tipados
                        -> Decision Engine
  Study Engine | Review Engine | Recommendation Engine | Goal Engine | Analytics Engine
                        -> recomendacoes e prioridades
                              -> Today, Schedule, Evolucao
```

## Responsabilidades

- **Study Engine:** prioriza a rotina e compoe o plano diario.
- **Review Engine:** calcula necessidade e janela de revisao.
- **Recommendation Engine:** explica proxima melhor acao.
- **Goal Engine:** compara execucao com objetivos e riscos.
- **Analytics Engine:** agrega fatos e sinais historicos.

Nenhum motor e implementado nesta entrega alem do Study Engine mockado ja existente.

## Entradas

| Origem | Dados produzidos | Consumidores futuros |
| --- | --- | --- |
| Study | sessoes, tempo, frequencia, desempenho e resumo | Study, Goal e Analytics Engines |
| Questions | respostas, acertos, assuntos dificeis e candidatos a erro | Review, Recommendation, Analytics e Error Bank |
| Schedule | disponibilidade, blocos e status planejado | Study e Recommendation Engines |
| Today | inicio/conclusao de atividade e contexto diario | Analytics e Study Engine |
| Dashboard | indicadores agregados para leitura | Analytics Engine |

## Saidas

- plano diario ordenado;
- revisoes recomendadas;
- riscos de meta;
- justificativa humana para cada recomendacao;
- eventos e agregados para Analytics.

## Fluxo e integracao futura

O frontend enviara fatos para portas de servico. O backend persistira fatos por usuario e devolvera resultados do Decision Engine. IA futura pode explicar ou explorar uma recomendacao, mas nao substitui contratos, regras deterministicas ou auditoria de decisao.

## Exemplo

Uma resposta incorreta em SQL gera `AnalyticsQuestionEvent` e `ErrorBankQuestionCandidate`. O Review Engine podera criar uma revisao; o Recommendation Engine explica a prioridade; Today apenas mostra a atividade resultante.
