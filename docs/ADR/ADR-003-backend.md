# ADR-003 — Backend

## Status
Aceito.

## Decisão
Usar ASP.NET Core com arquitetura em camadas.

## Motivo
- Familiaridade do projeto.
- Bom desempenho.
- Tipagem forte.
- Ecossistema enterprise.
- Integração com EF Core.

## Consequências
- Separar domínio, aplicação, infraestrutura e API.
- Usar DTOs.
- Testes unitários e de integração.
