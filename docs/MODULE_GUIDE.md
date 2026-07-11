# MODULE_GUIDE.md

Guia oficial para criacao e manutencao de modulos no Passei AI.

## Estrutura obrigatoria

Todo modulo de produto deve seguir:

```text
frontend/src/<module>/
  components/
  hooks/
  services/
  types/
  mocks/
  pages/
  README.md
  index.ts
```

## Responsabilidades por pasta

| Pasta | Responsabilidade |
| --- | --- |
| `components/` | UI especifica do modulo, sempre usando Design System |
| `hooks/` | Estado e logica reutilizavel do modulo |
| `services/` | Acesso a dados, mocks, providers ou API futura |
| `types/` | Contratos TypeScript do dominio |
| `mocks/` | Dados temporarios e cenarios de teste |
| `pages/` | Composicoes roteaveis do modulo |
| `README.md` | Objetivo, responsabilidades, fluxo, integracoes e exemplos |

## Boas praticas

- Manter componentes pequenos.
- Separar apresentacao, logica e dados.
- Evitar `any`.
- Evitar imports internos entre modulos.
- Exportar contratos publicos pelo `index.ts`.
- Usar `shared/` apenas para codigo realmente transversal.
- Usar `core/` apenas para infraestrutura da aplicacao.
- Usar `study-engine/` para decisao de estudo, prioridade e recomendacoes.

## Regras

- Modulos nao devem duplicar componentes do Design System.
- Modulos nao devem recalcular prioridade de estudo quando o Study Engine ja fornece a decisao.
- Services nao devem conter UI.
- Pages nao devem conter regra complexa.
- Mocks devem ser fortemente tipados.
- Qualquer decisao arquitetural nova deve gerar ADR.

## Checklist para novo modulo

- [ ] Pasta criada em `frontend/src/<module>/`.
- [ ] `components/` criado.
- [ ] `hooks/` criado.
- [ ] `services/` criado.
- [ ] `types/` criado.
- [ ] `mocks/` criado.
- [ ] `pages/` criado.
- [ ] `README.md` criado.
- [ ] `index.ts` criado.
- [ ] Integrações documentadas.
- [ ] Dependencias documentadas.
- [ ] Testes planejados.
- [ ] ROADMAP atualizado quando aplicavel.
- [ ] CHANGELOG atualizado quando aplicavel.
