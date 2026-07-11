# RELEASE_CHECKLIST.md

Checklist de release do Passei AI.

## Antes da release

- [ ] Branch atualizada com a integração definida.
- [ ] CHANGELOG revisado.
- [ ] ROADMAP revisado.
- [ ] TECH_DEBT revisado.
- [ ] QA_CHECKLIST concluído.
- [ ] Sem arquivos temporários.
- [ ] Sem segredos.

## Validação técnica

- [ ] `npm.cmd run lint`
- [ ] `npm.cmd run build`
- [ ] `npm.cmd run test`
- [ ] CI verde no GitHub Actions.
- [ ] Avisos conhecidos documentados.

## Validação de produto

- [ ] Fluxo principal abre.
- [ ] Navegação principal funciona.
- [ ] Estados vazios e erros foram avaliados.
- [ ] Responsividade básica validada.
- [ ] Textos em português revisados.

## Pós-release

- [ ] Tag ou versão criada quando aplicável.
- [ ] Notas de release publicadas.
- [ ] Próximas tarefas priorizadas.
- [ ] Dívidas novas registradas.
