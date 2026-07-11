# Passei AI Design System

O Design System do Passei AI usa uma organização inspirada em Atomic Design:

- `tokens`: decisões visuais primitivas e reutilizáveis.
- `atoms`: componentes básicos de interface.
- `molecules`: composições pequenas formadas por atoms.
- `organisms`: estruturas mais completas, como modais e tabelas.
- `layout`: peças estruturais de página.

Essa abordagem foi escolhida porque mantém componentes simples fáceis de testar, sem impedir composições maiores para telas de produto. A pasta também prepara o projeto para Storybook no futuro: os exports públicos ficam centralizados em `src/design-system/index.ts`, e cada componente já está isolado em arquivo próprio.
