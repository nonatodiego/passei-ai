# Mock Exams Module

## Objetivo

Gerenciar simulados e resultados.

## Responsabilidades

- Simulados realizados.
- Pontuacao.
- Tendencia de desempenho.
- Analises por disciplina.

## Fluxo

Mocks e services alimentam hooks; pages e components apresentam o resultado.

## Integracoes

- Study Engine para recomendacoes futuras de simulados.
- Analytics para metricas agregadas futuras.
- Design System.

## Dependencias

Nao deve depender diretamente de Dashboard.

## Exemplo de uso

Criar contracts em `types/` antes de plugar API real.
