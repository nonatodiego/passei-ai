# Passei AI - User Journey

## 1. Objetivo da jornada

O usuario nao entra no Passei AI para administrar dados. Ele entra para saber o que estudar, quando estudar, o que revisar, como esta evoluindo e qual e o proximo passo.

## 2. Persona inicial

Diego e candidato a concurso, trabalha e possui tempo limitado. Ele precisa conciliar conteudo, questoes, revisoes e simulados; valoriza organizacao, indicadores e clareza; e nao quer perder tempo decidindo o que fazer.

O produto deve evoluir tambem para concurseiros em geral, pessoas estudando para certificacoes e candidatos a exames profissionais.

## 3. Jornada 1 - Comecar a preparacao

Fluxo futuro: escolher objetivo, cadastrar concurso ou certificacao, informar data da prova, cadastrar disponibilidade, importar edital, criar plano inicial e acessar a tela Hoje.

Resultado esperado: o usuario sai do primeiro acesso com um plano claro.

## 4. Jornada 2 - Estudar no dia a dia

Fluxo: abrir o Passei AI, visualizar o plano do dia, iniciar atividade, usar o timer ou registrar estudo, resolver questoes, registrar resultado, enviar erros relevantes ao Banco de Erros e concluir atividade.

Resultado esperado: o usuario termina o estudo com dados uteis, sem burocracia excessiva.

## 5. Jornada 3 - Resolver questoes

Fluxo: acessar uma questao recomendada ou o Banco de Questoes, filtrar, responder, receber feedback, entender o erro, adicionar ao Banco de Erros e gerar dados para Study Engine e Analytics.

Resultado esperado: cada questao respondida melhora o diagnostico do usuario.

## 6. Jornada 4 - Revisar

Fluxo: receber revisao recomendada, entender o motivo da prioridade, executar revisao, responder questoes de reforco, marcar resultado e reagendar quando necessario.

Resultado esperado: reduzir esquecimento e reincidencia de erros.

## 7. Jornada 5 - Acompanhar evolucao

Fluxo: visualizar indicadores, identificar pontos fortes e fracos, comparar metas, ajustar plano e acompanhar o indice de preparacao.

Resultado esperado: o usuario entende se esta avancando e onde agir.

## 8. Jornada 6 - Simular a prova

Fluxo: iniciar simulado, controlar tempo, responder blocos, finalizar, analisar resultado, atualizar prioridades e replanejar estudos.

## 9. Jornada 7 - Reta final

Fluxo: reduzir aulas passivas, priorizar questoes, revisoes, erros e simulados, acompanhar riscos, ajustar carga e preparar a estrategia de prova.

## 10. Principios de experiencia

- Toda tela deve responder: "Qual e o proximo passo?"
- O usuario nao deve precisar decidir entre dezenas de opcoes.
- O sistema deve reduzir ansiedade.
- O sistema deve mostrar apenas o necessario.
- Dados devem gerar acao.
- Erros devem gerar revisao.
- Questoes devem gerar diagnostico.
- Cronograma deve se adaptar ao usuario.
- IA deve apoiar decisoes, nao apenas conversar.

## 11. Mapa de modulos para jornadas

| Modulo | Papel na jornada |
| --- | --- |
| Today Experience | Centro operacional do dia e proxima acao |
| Dashboard/Analytics | Evolucao e diagnostico |
| Schedule | Plano e disponibilidade |
| Study Sessions | Registro da execucao de estudo |
| Questions | Pratica e sinais de desempenho |
| Error Bank | Aprendizado a partir de erros |
| Reviews | Retencao e reforco |
| Mock Exams | Simulacao de prova |
| Goals | Acompanhamento de objetivos |
| Study Engine | Decisao, prioridade e recomendacao |
| Coach AI | Interface futura para as decisoes do motor |

## 12. Eventos de produto

Eventos futuros para analytics: `study_session_started`, `study_session_completed`, `question_answered`, `question_wrong`, `error_record_created`, `review_completed`, `daily_plan_completed`, `mock_exam_completed` e `goal_achieved`.

Este documento nao implementa tracking.
