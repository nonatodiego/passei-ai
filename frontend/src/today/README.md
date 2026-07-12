# Today Module

## Objetivo

Hoje e o centro de comando diario do Passei AI. Ele mostra a proxima acao de estudo sem decidir prioridades localmente.

## Responsabilidades

- Apresentar tempo, preparacao e meta semanal.
- Compor plano do dia, proxima revisao, questoes recomendadas, alertas e resumo rapido.
- Expor estados loading, empty, error, success e dia concluido.

## Fluxo e integracoes

Mocks tipados alimentam `TodayService`; `useToday` fornece dados a pagina. Os contratos estao preparados para consumir recomendacoes do Study Engine no futuro. Nenhuma regra de prioridade pertence ao modulo.

## Dependencias

- Design System oficial.
- React e React Router.
- Contratos futuros do Study Engine.
