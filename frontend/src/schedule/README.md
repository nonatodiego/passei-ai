# Schedule Module

## Objetivo

Apresentar o Cronograma Inteligente do Passei AI.

## Responsabilidades

- Calendario.
- Timeline.
- Lista.
- Agenda semanal.
- Agenda diaria.
- Filtros de visualizacao.
- Estados loading, empty, error e success.

## Fluxo

O Schedule consome recomendacoes e prioridades do Study Engine por hooks e services. O modulo apresenta e filtra dados, mas nao decide prioridade.

## Integracoes

- Study Engine para decisoes de estudo.
- Design System para UI.
- Shared para utilitarios transversais.

## Dependencias

Pode depender de Study Engine e Shared. Nao deve depender de Dashboard ou outros modulos de produto.

## Exemplo de uso

Usar `useSchedule` para obter dados prontos para apresentacao.
