# Analytics Module

## Objetivo

Concentrar analises e metricas avancadas do produto.

## Responsabilidades

- Indicadores agregados.
- Tendencias.
- Comparacoes temporais.
- Preparacao para relatorios futuros.

## Fluxo

Analytics consome contratos de services e dados agregados. Ele nao deve mutar estado de outros modulos.

## Integracoes

- Study Engine.
- Dashboard.
- Shared.
- Design System.

## Dependencias

Qualquer dependencia de outro modulo deve acontecer por contrato publico.

## Exemplo de uso

Criar services de leitura para metricas agregadas quando a API existir.
