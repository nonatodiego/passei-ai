# Questions Module

## Objetivo

Implementar o Banco de Questoes oficial do Passei AI.

## Responsabilidades

- Exibir questoes mockadas.
- Permitir filtros por disciplina, assunto, dificuldade, status e texto.
- Permitir visualizacao e resposta de questoes.
- Exibir feedback imediato.
- Calcular estatisticas basicas.
- Preparar contratos para Study Engine, Banco de Erros e Analytics.

## Fluxo

`mocks/` fornece questoes tipadas. `services/` filtra dados, calcula estatisticas e cria contratos de integracao. `hooks/` coordena estado local. `pages/` compoe a experiencia usando componentes do Design System.

## Integracoes

- Study Engine: recebe fatos agregados de desempenho e assuntos dificeis.
- Banco de Erros: recebe candidato estruturado de questao incorreta.
- Analytics: recebe evento tipado de resposta.

As integracoes sao apenas contratos nesta feature. Nao ha backend, IA ou persistencia real.

## Dependencias

- React.
- Design System oficial.
- Lucide React para icones.

## Exemplo de uso

```tsx
import { QuestionBankPage } from '@/questions/pages';
```
