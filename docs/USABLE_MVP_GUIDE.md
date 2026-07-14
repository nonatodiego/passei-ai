# Passei AI - Guia do MVP Local-First

## Primeiro uso

1. Abra a aplicação e aguarde a importação local do cronograma DATAPREV.
2. Consulte o Cronograma e registre uma sessão ao iniciar uma atividade.
3. Registre blocos de questões resolvidos externamente em Questões.
4. Registre erros relevantes no Banco de Erros e agende revisões.
5. Consulte Hoje e Evolução para indicadores e recomendações calculados localmente.
6. Ajuste as metas semanais em Metas.

## Dados locais

O IndexedDB armazena cronograma, metas, sessões, blocos de questões, questões individuais, tentativas, erros, revisões, simulados e configurações. Nenhum dado demonstrativo é usado como resultado do usuário.

## Backup

Em Configurações, use **Exportar backup** regularmente. O arquivo JSON deve ser guardado fora do navegador. Para restaurar, selecione o arquivo, revise o resumo e confirme a substituição dos dados atuais.

## Limpeza e restauração

A limpeza exige a frase `APAGAR MEUS DADOS`. Ela remove os dados do navegador atual. Use um backup antes de confirmar e restaure-o pela mesma tela quando necessário.

## Limites atuais

- Os dados não sincronizam entre navegadores, dispositivos ou origins.
- O backup periódico é responsabilidade do usuário.
- Não há login, backend, API ou notificações nesta versão.
- Recharts mantém o bundle inicial acima da meta de 500 kB.

## Deploy na Vercel

Configure o diretório raiz como `frontend/`. O arquivo `frontend/vercel.json` preserva o fallback SPA para rotas diretas. Dados locais de preview, produção e localhost são separados por origin.
