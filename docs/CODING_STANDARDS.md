# CODING_STANDARDS.md

## 1. Princípios

- Clareza antes de esperteza.
- Funções pequenas.
- Baixo acoplamento.
- Alta coesão.
- Tipagem explícita.
- Evitar duplicação.
- Separar regra de negócio de apresentação.

## 2. TypeScript

- `strict: true`.
- Evitar `any`.
- Preferir `type` e `interface`.
- Tipar props.
- Tipar respostas da API.
- Não armazenar lógica complexa em componentes.

## 3. React

- Componentes funcionais.
- Hooks próprios para lógica reutilizável.
- Um componente principal por arquivo.
- Evitar componentes muito grandes.
- Evitar prop drilling excessivo.
- Usar composição.

## 4. Nomes

- Componentes: PascalCase.
- Hooks: `useSomething`.
- Funções: camelCase.
- Constantes globais: UPPER_SNAKE_CASE.
- Arquivos de componentes: PascalCase.
- Utilitários: camelCase.

## 5. CSS

- Tailwind.
- Evitar CSS inline.
- Centralizar tokens.
- Não repetir classes complexas quando componente resolve.

## 6. Backend

- Nullable reference types.
- Async.
- CancellationToken.
- DTOs.
- Validation.
- Logs estruturados.
- Não expor entidades diretamente.
- Regras no domínio/aplicação, não em controllers.

## 7. Testes

- Testar regras críticas.
- Testar cálculos.
- Testar estados vazios e erros.
- Testar componentes essenciais.
- Testes determinísticos.

## 8. Qualidade

Nenhuma entrega deve ser considerada concluída com:

- erro de build;
- erro de lint;
- teste crítico falhando;
- segredo versionado;
- documentação desatualizada.
