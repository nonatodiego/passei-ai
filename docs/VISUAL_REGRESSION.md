# Visual Regression

## Escopo

A regressao visual protege as nove rotas principais e estados interativos selecionados. Existem 53 imagens de referencia:

| Projeto | Viewport | Baselines |
| --- | --- | ---: |
| `visual-1440` | 1440 x 900 | 13 |
| `visual-1024` | 1024 x 768 | 9 |
| `visual-768` | 768 x 1024 | 9 |
| `visual-390` | 390 x 844 | 13 |
| `visual-320` | 320 x 800 | 9 |

Todos os breakpoints cobrem Hoje, Cronograma, Estudos, Questoes, Banco de Erros, Revisoes, Metas, Evolucao e Configuracoes. Desktop 1440 e mobile 390 tambem cobrem formulario de cronograma, formulario de estudo, estado vazio de Questoes e drawer do Banco de Erros.

## Skips intencionais

Os 12 skips abaixo evitam repetir estados interativos ja protegidos nos viewports canonicos 1440 e 390. As nove rotas em estado inicial continuam cobertas em todos os cinco viewports.

| Projeto | Cenario ignorado | Justificativa |
| --- | --- | --- |
| `visual-1024` | Cronograma com formulario aberto | Redundante com 1440 e 390 |
| `visual-1024` | Estudos com formulario aberto | Redundante com 1440 e 390 |
| `visual-1024` | Questoes em estado vazio | Redundante com 1440 e 390 |
| `visual-1024` | Banco de Erros com drawer aberto | Redundante com 1440 e 390 |
| `visual-768` | Cronograma com formulario aberto | Redundante com 1440 e 390 |
| `visual-768` | Estudos com formulario aberto | Redundante com 1440 e 390 |
| `visual-768` | Questoes em estado vazio | Redundante com 1440 e 390 |
| `visual-768` | Banco de Erros com drawer aberto | Redundante com 1440 e 390 |
| `visual-320` | Cronograma com formulario aberto | Redundante com 1440 e 390 |
| `visual-320` | Estudos com formulario aberto | Redundante com 1440 e 390 |
| `visual-320` | Questoes em estado vazio | Redundante com 1440 e 390 |
| `visual-320` | Banco de Erros com drawer aberto | Redundante com 1440 e 390 |

## Comparar

```bash
cd frontend
npm run test:e2e:visual
```

O limite maximo configurado e 0,5% de pixels diferentes. Esse limite absorve pequenas diferencas de rasterizacao, mas detecta mudancas estruturais e nao deve ser usado para aceitar uma alteracao visual sem revisao.

## Atualizar baselines

1. Execute primeiro `npm run test:e2e:visual` e leia o diff.
2. Confirme que a mudanca visual e intencional e aprovada.
3. Execute `npm run test:e2e:update`.
4. Revise visualmente todas as imagens alteradas.
5. Execute novamente `npm run test:e2e:visual`.
6. Mantenha os PNGs no mesmo commit do teste visual.

Nunca atualize snapshots para fazer uma falha desaparecer sem entender sua causa.

## Estabilidade

- data e fuso sao fixos;
- o teste aguarda o fim dos skeletons e o primeiro heading do conteudo;
- fontes sao carregadas antes da captura;
- animacoes CSS, transicoes e caret sao neutralizados;
- graficos sao renderizados sem animacao e sua geometria e aguardada;
- dados usam fixtures deterministicas;
- capturas executam com um worker.

## Plataforma canonica

Os baselines foram gerados em Windows e o job visual do GitHub Actions usa `windows-latest`. Uma migracao de sistema operacional exige gerar e revisar um conjunto canonico novo; snapshots de plataformas diferentes nao devem ser misturados silenciosamente.

## Artefatos

Em falha, consulte `.playwright/test-results` para imagem atual, diff, screenshot e trace. O relatorio navegavel fica em `.playwright/report` e e publicado pelo CI por sete dias. Esses diretorios ficam fora da raiz Vite para nao provocar recarregamentos durante a captura.
