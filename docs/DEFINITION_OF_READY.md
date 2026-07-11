# DEFINITION_OF_READY.md

A Definition of Ready define as condições mínimas para uma Sprint começar no Passei AI.

## Regra

Uma Sprint só pode iniciar implementação quando todos os itens obrigatórios estiverem atendidos. Se qualquer item estiver pendente, a Sprint deve permanecer em `Refinement`, `Backlog` ou `Blocked` no `TASK_QUEUE.md`.

## Checklist reutilizável

- [ ] Objetivo claro.
- [ ] Problema de negócio descrito.
- [ ] Escopo definido.
- [ ] Itens fora do escopo registrados.
- [ ] Critérios de aceite existentes.
- [ ] Riscos identificados.
- [ ] Dependências disponíveis.
- [ ] Sem bloqueios críticos.
- [ ] Branch definida.
- [ ] Documentação obrigatória lida.
- [ ] Sprint marcada como `Ready` no `TASK_QUEUE.md`.

## Critérios detalhados

### Objetivo claro

A Sprint precisa responder o que será entregue e por quê.

### Problema de negócio descrito

O problema deve estar conectado ao produto, ao usuário ou à qualidade técnica necessária para sustentar o produto.

### Escopo definido

O escopo deve listar entregas esperadas, arquivos ou áreas afetadas quando previsíveis, e limites de atuação.

### Fora do escopo

O que não será feito deve estar explícito para evitar expansão silenciosa da Sprint.

### Critérios de aceite

Os critérios precisam ser verificáveis por revisão, testes, QA visual ou documentação.

### Riscos

Riscos técnicos, de UX, de arquitetura, de dependências ou de cronograma devem estar registrados.

### Dependências

Dependências de design, dados, decisão do Product Owner, bibliotecas ou branches-base devem estar disponíveis.

### Bloqueios críticos

Não pode existir bloqueio que impeça implementação, validação técnica ou QA visual.

### Branch definida

A branch deve seguir o padrão do projeto: `feature/*`, `fix/*`, `docs/*` ou `refactor/*`.

### Documentação lida

Antes da implementação, a documentação obrigatória da Sprint deve ter sido lida.

### TASK_QUEUE

A Sprint deve estar marcada como `Ready` no `TASK_QUEUE.md` antes de sair para implementação.
