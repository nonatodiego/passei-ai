# DEVELOPMENT_FLOW.md

## 1. Fluxo

```text
Ideia
→ Refinamento
→ Critérios de aceite
→ Branch
→ Implementação
→ Testes
→ Revisão
→ Documentação
→ Pull Request
→ Merge
```

## 2. Branches

- `main`: estável.
- `develop`: integração.
- `feature/*`: funcionalidades.
- `fix/*`: correções.
- `hotfix/*`: correção urgente.
- `docs/*`: documentação.
- `refactor/*`: refatorações.

## 3. Feature

Antes de implementar:

1. Ler documentação.
2. Inspecionar código.
3. Definir objetivo.
4. Definir critérios de aceite.
5. Criar branch.
6. Alterar apenas o necessário.

## 4. Validação

Frontend:

```bash
npm run lint
npm run build
npm run test
```

Backend:

```bash
dotnet restore
dotnet build
dotnet test
```

## 5. Finalização

- Atualizar `CHANGELOG.md`.
- Atualizar `ROADMAP.md`.
- Atualizar documentação técnica quando necessário.
- Criar commit descritivo.
- Abrir PR.
- Resumir alterações.
- Informar testes executados.

## 6. Commits

Conventional Commits:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `test`
- `chore`

Exemplos:

```text
feat(dashboard): add performance summary
fix(schedule): correct overdue calculation
docs(product): update target audience
```

## 7. Regra

Não desenvolver diretamente na `main`.
