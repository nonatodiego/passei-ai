# CODE_REVIEW_CHECKLIST.md

Checklist de revisão de código do Passei AI.

## Escopo

- [ ] A mudança corresponde ao objetivo da branch.
- [ ] Definition of Ready foi atendida.
- [ ] Não adiciona funcionalidade fora do escopo.
- [ ] Não altera comportamento existente sem justificativa.
- [ ] Não remove testes ou documentação sem substituição.

## Arquitetura

- [ ] Respeita a estrutura do projeto.
- [ ] Usa Design System para UI.
- [ ] Mantém tipos separados quando o domínio crescer.
- [ ] Evita acoplamento entre mock, apresentação e regra de negócio.
- [ ] Preserva compatibilidade pública.

## Código

- [ ] Sem `any` desnecessário.
- [ ] Componentes pequenos e nomeados claramente.
- [ ] Funções com responsabilidade única.
- [ ] Sem duplicação visual relevante.
- [ ] Sem strings mágicas quando constantes/tipos fazem sentido.

## Testes e validação

- [ ] Testes cobrem comportamento principal.
- [ ] Estados vazios e erros cobertos quando aplicável.
- [ ] Testes determinísticos.
- [ ] Novos bugs têm teste de regressão.
- [ ] Lint passou.
- [ ] Build passou.
- [ ] Testes passaram.

## QA visual

- [ ] QA visual foi realizado quando houve UI.
- [ ] Product Owner aprovou a entrega visual.
- [ ] Responsividade básica validada.
- [ ] Acessibilidade básica verificada.

## CTO Review

- [ ] CTO Review foi realizada quando exigida.
- [ ] Relatório técnico registrado ou resumido.
- [ ] Dívidas e riscos foram tratados ou documentados.

## Segurança

- [ ] Sem segredos.
- [ ] Sem dados sensíveis em mocks públicos.
- [ ] Variáveis de ambiente documentadas.
- [ ] Entradas futuras preparadas para validação.

## Documentação

- [ ] ROADMAP atualizado.
- [ ] CHANGELOG atualizado.
- [ ] TASK_QUEUE atualizado.
- [ ] QUALITY_SCORE atualizado quando necessário.
- [ ] PROJECT_METRICS atualizado quando necessário.
- [ ] Documentação técnica atualizada quando necessário.
- [ ] Dívida técnica registrada.
