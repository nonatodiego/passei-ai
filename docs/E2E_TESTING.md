# E2E Testing

## Objetivo

A suite Playwright protege as jornadas criticas do MVP local-first em navegadores reais, sem acessar os dados pessoais do Product Owner. Cada teste usa um contexto isolado e popula um IndexedDB proprio com registros prefixados por `E2E -`.

## Instalacao

```bash
cd frontend
npm install
npx playwright install chromium firefox webkit
```

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run test:e2e` | Suite local completa |
| `npm run test:e2e:chromium` | Jornadas criticas e rotas no Chromium |
| `npm run test:e2e:a11y` | axe-core e navegacao por teclado |
| `npm run test:e2e:visual` | Comparacao dos baselines responsivos |
| `npm run test:e2e:update` | Atualizacao intencional dos baselines |
| `npm run test:e2e:production` | Smoke somente leitura da URL oficial |
| `npm run test:e2e:ui` | Interface interativa do Playwright |
| `npm run test:e2e:report` | Relatorio HTML da ultima execucao |
| `npm run test:bundle` | Orcamento dos chunks gerados pelo Vite |

## Cobertura

- nove rotas principais em Chromium, Firefox, WebKit e Chromium mobile;
- rota ativa e menu lateral mobile;
- criacao, edicao, conclusao, filtros, validacao e persistencia do cronograma;
- criacao e edicao de sessoes, vinculo com cronograma e protecao contra duplicacao;
- blocos de questoes, resposta incorreta e envio ao Banco de Erros;
- cadastro, recorrencia, reagendamento, revisao, dominio e arquivamento de erros;
- criacao e conclusao de revisoes, metas reais, Hoje e Evolucao;
- exportacao, validacao, restauracao e limpeza protegida em Configuracoes;
- foco de Modal, Drawer e Sidebar, teclado e auditoria axe sem violacoes nos impactos auditados;
- 53 baselines visuais em cinco breakpoints;
- smoke de producao somente leitura, incluindo fallback SPA e assets.

## Isolamento de dados

As fixtures em `frontend/e2e/fixtures` abrem a aplicacao em um novo browser context, limpam apenas o banco desse contexto e inserem dados tipados. O relogio usa data fixa e nenhum teste local compartilha o IndexedDB do navegador cotidiano.

O teste de producao possui uma guarda de URL e nao envia formularios. Ele registra as contagens do IndexedDB antes e depois da navegacao e falha se detectar mutacao.

## Confiabilidade

- seletores priorizam roles, labels e nomes acessiveis;
- o conteudo principal deve sair do skeleton antes de qualquer captura;
- fontes, caret, transicoes e geometria dos graficos sao estabilizados;
- a suite roda com um worker para evitar disputa de recursos entre browsers;
- falhas de console e excecoes de pagina reprovam o teste;
- traces e screenshots sao mantidos somente em falhas.

## Limites atuais

Nao existem controles de produto para criar uma questao individual, editar diretamente um registro do Banco de Erros, criar revisao pelo proprio drawer ou reabrir uma revisao concluida. Esses caminhos nao sao simulados pelo teste: deverao ganhar cobertura quando uma interface oficial existir.

A suite de producao e manual por seguranca. Ela nao deve ser convertida em teste destrutivo nem apontada para Preview com dados reais.

## CI

O job `frontend` executa lint, build, bundle e Vitest em Ubuntu. O job `browser-quality` executa a suite Playwright completa em Windows, sistema canonico dos baselines versionados, e publica `.playwright/report` e `.playwright/test-results` quando falha. Os artefatos ficam fora da raiz Vite para nao disparar HMR durante comparacoes visuais.

## Diagnostico

1. Abra `npm run test:e2e:report`.
2. Consulte o trace do caso reprovado.
3. Confirme se a falha e de produto, ambiente ou baseline.
4. Corrija a causa e execute o projeto afetado novamente.
5. Execute a suite integral antes de enviar a branch.
