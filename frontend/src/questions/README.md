# Questions Module

## Objetivo

Registrar e analisar sessoes de questoes.

## Responsabilidades

- Questoes resolvidas.
- Acertos e erros.
- Fontes de questoes.
- Estatisticas por disciplina e assunto.

## Fluxo

Services e mocks alimentam hooks, pages apresentam dados com Design System.

## Integracoes

- Study Engine para impacto de prioridade.
- Reviews e Error Bank futuros via contratos, nao imports diretos.

## Dependencias

Nao deve depender diretamente de modulos visuais externos.

## Exemplo de uso

Expor contratos em `types/` antes de criar UI complexa.
