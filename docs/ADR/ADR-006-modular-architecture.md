# ADR-006 - Arquitetura Modular do Passei AI

## Status

Aceito.

## Decisao

Organizar o frontend do Passei AI por modulos de produto e camadas de plataforma.

Modulos oficiais:

- `core/`
- `study-engine/`
- `dashboard/`
- `schedule/`
- `study/`
- `questions/`
- `reviews/`
- `mock-exams/`
- `goals/`
- `analytics/`
- `settings/`
- `shared/`

Cada modulo de produto deve seguir o padrao:

```text
module/
  components/
  hooks/
  services/
  types/
  mocks/
  pages/
  README.md
```

## Por que modulos

- Reduzir acoplamento entre funcionalidades.
- Facilitar ownership por dominio.
- Evitar crescimento desordenado de pastas globais.
- Preparar a plataforma para backend, IA, analytics e recursos premium.
- Permitir migracao incremental sem quebrar funcionalidades existentes.

## Por que Shared Layer

`shared/` concentra codigo transversal que nao pertence a um dominio especifico:

- constants;
- types;
- utils;
- hooks;
- services;
- config;
- providers.

Shared nao pode depender de modulos de produto.

## Por que Core Layer

`core/` concentra infraestrutura da aplicacao:

- Theme;
- Router;
- Navigation;
- Permissions futuras;
- Feature Flags futuras;
- Application Context;
- Global Config;
- Error Boundary;
- Providers globais.

Core nao deve conter regra de negocio de produto.

## Como novos modulos devem ser criados

1. Criar a pasta do modulo em `frontend/src/<module>/`.
2. Criar `components/`, `hooks/`, `services/`, `types/`, `mocks/`, `pages/`.
3. Criar `README.md` com objetivo, responsabilidades, fluxo, integracoes, dependencias e exemplos.
4. Expor apenas contratos publicos por `index.ts`.
5. Usar Design System para UI.
6. Usar Shared para codigo transversal.
7. Evitar imports diretos entre modulos quando um contrato publico resolver.
8. Registrar ADR se houver decisao arquitetural nova.

## Consequencias

- Novas funcionalidades devem nascer em seus modulos.
- Pastas globais existentes podem ser migradas incrementalmente.
- Duplicacao entre modulos deve ser promovida para Shared apenas quando for realmente transversal.
- O Study Engine permanece como fonte oficial de decisao de estudo.
