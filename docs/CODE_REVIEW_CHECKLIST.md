# CODE_REVIEW_CHECKLIST.md

Checklist de revisão de código do Passei AI.

## Escopo

- [ ] A mudança corresponde ao objetivo da branch.
- [ ] Não adiciona funcionalidade fora do escopo.
- [ ] Não altera comportamento existente sem justificativa.
- [ ] Não remove testes ou documentação sem substituição.

## Arquitetura

- [ ] Respeita a estrutura do projeto.
- [ ] Usa Design System para UI.
- [ ] Mantém tipos separados quando o domínio crescer.
- [ ] Evita acoplamento entre mock, apresentação e regra de negócio.

## Código

- [ ] Sem `any` desnecessário.
- [ ] Componentes pequenos e nomeados claramente.
- [ ] Funções com responsabilidade única.
- [ ] Sem duplicação visual relevante.
- [ ] Sem strings mágicas quando constantes/tipos fazem sentido.

## Testes

- [ ] Testes cobrem comportamento principal.
- [ ] Estados vazios e erros cobertos quando aplicável.
- [ ] Testes determinísticos.
- [ ] Novos bugs têm teste de regressão.

## Segurança

- [ ] Sem segredos.
- [ ] Sem dados sensíveis em mocks públicos.
- [ ] Variáveis de ambiente documentadas.
- [ ] Entradas futuras preparadas para validação.

## Documentação

- [ ] ROADMAP atualizado.
- [ ] CHANGELOG atualizado.
- [ ] Documentação técnica atualizada quando necessário.
- [ ] Dívida técnica registrada.
