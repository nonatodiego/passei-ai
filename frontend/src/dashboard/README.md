# Dashboard Module

## Objetivo

Apresentar uma visao executiva da preparacao do usuario.

## Responsabilidades

- KPIs.
- Evolucao semanal.
- Plano de hoje.
- Ranking de disciplinas.
- Atividades recentes.
- Estados de loading, empty, error e success.

## Fluxo

Mocks e services alimentam hooks, hooks alimentam pages, pages compoem components do modulo e Design System.

## Integracoes

- Design System.
- Shared para utilitarios transversais.
- Study Engine quando indicadores passarem a depender de recomendacoes.

## Dependencias

Nao deve depender de outros modulos de produto diretamente.

## Exemplo de uso

Importar a page publica pelo barrel do modulo quando a migracao incremental for concluida.
