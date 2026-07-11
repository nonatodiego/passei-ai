# Core

Camada responsavel por infraestrutura da aplicacao.

## Responsabilidades

- Theme.
- Router.
- Navigation.
- Permissions futuras.
- Feature flags futuras.
- Application context.
- Global config.
- Error boundary.
- Providers globais.

## Regra

Core nao deve conter regra de negocio de produto. Modulos de produto consomem Core, mas Core nao conhece detalhes internos dos modulos.
