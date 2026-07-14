# Questions Module

## Objetivo

Implementar o Banco de Questoes oficial do Passei AI.

## Responsabilidades

- Exibir somente questoes e tentativas persistidas no IndexedDB.
- Permitir filtros por disciplina, assunto, dificuldade, status e texto.
- Permitir visualizacao e resposta de questoes.
- Exibir feedback imediato.
- Calcular estatisticas basicas.
- Preparar contratos para Study Engine, Banco de Erros e Analytics.

## Fluxo

`services/` consulta e atualiza dados persistidos, calcula estatisticas e cria contratos de integracao. `hooks/` coordena estado local. `pages/` compoe a experiencia usando componentes do Design System. Mocks permanecem restritos a testes e fixtures.

## Integracoes

- Study Engine: recebe fatos agregados de desempenho e assuntos dificeis.
- Banco de Erros: recebe candidato estruturado de questao incorreta.
- Analytics: recebe evento tipado de resposta.

As integracoes permanecem contratos locais. Não há backend ou IA nesta versão; a persistência é feita no IndexedDB.

## Dependencias

- React.
- Design System oficial.
- Lucide React para icones.

## Exemplo de uso

```tsx
import { QuestionBankPage } from '@/questions/pages';
```
