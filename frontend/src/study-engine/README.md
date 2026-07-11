# Study Engine

O Study Engine e o modulo que concentra a decisao de estudo do Passei AI.

## Objetivo

Preparar a arquitetura que futuramente decidira o que estudar, quando estudar, prioridade, revisoes, simulados, metas, disciplinas, tempo disponivel e plano diario.

Nesta sprint ele usa apenas dados mockados. Nao existe IA, backend ou integracao OpenAI.

## Fluxo

1. Mocks alimentam o `StudyEngineService`.
2. O `StudyEngineProvider` publica o resultado via Context API.
3. Hooks de produto, como `useSchedule`, consomem o resultado.
4. As telas apresentam as decisoes sem recalcular prioridade.

## Arquitetura

- `engine`: ponto de composicao do resultado.
- `recommendations`: helpers de recomendacoes.
- `rules`: regras puras e reutilizaveis.
- `planner`: helpers de plano diario.
- `review`: helpers de revisao.
- `types`: contratos do motor.
- `services`: porta mockada para troca futura de provider.
- `mocks`: dados temporarios.
- `hooks`: consumo pelo frontend.

## Responsabilidades

O Study Engine e responsavel por decisao e priorizacao. Modulos como Cronograma devem apenas apresentar, filtrar ou organizar a informacao.

## Integracao futura

Quando backend e IA forem implementados, a troca deve acontecer no provider ou service. Os consumidores devem continuar usando os mesmos contratos publicos.
