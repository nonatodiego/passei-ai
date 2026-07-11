# Shared

Camada compartilhada para codigo transversal entre modulos.

## Responsabilidades

- Constantes globais.
- Tipos compartilhados.
- Utilitarios puros.
- Hooks transversais.
- Services sem dominio especifico.
- Configuracoes comuns.
- Providers reutilizaveis.

## Regra

Shared nao deve depender de modulos de produto. Se um codigo conhece Dashboard, Schedule ou Study Engine, ele pertence ao modulo correspondente.
