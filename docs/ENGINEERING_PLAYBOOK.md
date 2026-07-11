# ENGINEERING_PLAYBOOK.md

Playbook de engenharia do Passei AI.

## Princípios

- Produto simples, código claro.
- TypeScript estrito.
- Design System antes de variações locais.
- Sem backend ou autenticação até a sprint correspondente.
- Documentação acompanha a entrega.
- Nenhuma entrega termina com lint, build ou testes quebrados.

## Fluxo padrão

1. Ler documentação relevante.
2. Inspecionar estado do repositório.
3. Criar branch `feature/*`, `fix/*`, `docs/*` ou `refactor/*`.
4. Implementar apenas o escopo.
5. Adicionar ou atualizar testes.
6. Executar lint, build e testes.
7. Atualizar ROADMAP, CHANGELOG e docs afetadas.
8. Registrar dívida técnica quando necessário.
9. Fazer commit convencional.
10. Preparar PR com evidências.

## Branches

- `feature/*`: funcionalidades e fundações incrementais.
- `fix/*`: correções.
- `docs/*`: documentação sem alteração funcional.
- `refactor/*`: mudança interna sem alteração de comportamento.

## Commits

Usar Conventional Commits:

- `feat(scope): summary`
- `fix(scope): summary`
- `docs(scope): summary`
- `test(scope): summary`
- `refactor(scope): summary`
- `chore(scope): summary`

## Critérios de pronto

- Critérios de aceite atendidos.
- Testes relevantes existem.
- Lint, build e testes passam.
- Documentação atualizada.
- Sem arquivos temporários.
- Sem segredos.
- Dívidas conhecidas registradas.

## Política de dependências

- Evitar dependências sem necessidade clara.
- Justificar bibliotecas novas no PR.
- Preferir APIs nativas e padrões já existentes.
- Registrar impacto de bundle quando dependência afetar o frontend.
