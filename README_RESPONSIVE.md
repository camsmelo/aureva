# Aurêva — versão responsiva

Atualização da aplicação Angular para uso em celulares, tablets e desktop.

## Melhorias
- Menu hambúrguer em telas menores.
- Navegação mobile abre em painel e fecha ao selecionar uma seção.
- Botão de agendamento e menu adaptados para toque.
- Hero responsivo com overlay vertical no celular.
- Carrossel de serviços com cartões maiores e swipe horizontal.
- Seção Sobre nós e benefícios reorganizada em uma coluna no celular.
- Depoimentos, CTA e rodapé adaptados para telas estreitas.
- Modal de agendamento com altura baseada em `100dvh`, inputs com tamanho confortável para mobile e botão de fechamento acessível.
- Botões flutuantes do Instagram e WhatsApp respeitam telas pequenas e área segura do dispositivo.
- Prevenção de overflow horizontal.
- `scroll-behavior: smooth` e `scroll-padding-top` para navegação com header fixo.

## Observação
A instalação de dependências foi tentada para executar `ng build`, mas `npm install` excedeu o limite de tempo do ambiente de execução. O projeto fonte foi preservado sem `node_modules`.
