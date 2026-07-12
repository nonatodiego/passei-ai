# Study Module

## Objetivo

Registrar, acompanhar e analisar sessoes de estudo do Passei AI.

## Responsabilidades

- Registrar sessoes de estudo com disciplina, assunto, material, tempo, dificuldade, questoes, acertos, erros, origem e observacoes.
- Exibir historico filtravel.
- Exibir resumo de desempenho.
- Controlar timer local de estudo.
- Fornecer fatos e metricas para Study Engine, metas, revisoes, questoes e analytics futuros.

## Fluxo

1. `mocks/` fornece dados locais temporarios.
2. `services/` valida, cria sessoes mockadas, filtra dados, calcula metricas e prepara fatos para o Study Engine.
3. `hooks/` centraliza estado de filtros, status e timer.
4. `components/` apresenta formulario, historico, filtros, resumo e timer usando Design System.
5. `pages/` compoe a experiencia roteavel do modulo.

## Integracoes

- Design System para UI.
- Study Engine futuro via `StudyEngineStudyFacts`.
- API futura por substituicao do `StudySessionService`.

## Dependencias

O modulo fornece fatos. Ele nao decide recomendacoes, prioridades ou revisoes espacadas.

## Exemplo de uso

```tsx
import { StudySessionsPage } from '@/study/pages';
```

## Fora do escopo atual

- Backend.
- Banco de dados.
- Autenticacao.
- Upload de arquivos.
- Recomendacoes por IA.
- Modulo completo de questoes.
