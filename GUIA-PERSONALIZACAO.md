# Guia de personalização

O projeto foi preparado para que a adaptação de conteúdo fique concentrada em `config.js`. Em condições normais, não é necessário editar `index.html` nem `script.js`.

## 1. Identificação da empresa

Abra `config.js` e altere o bloco `company`:

- `name`: nome completo usado no rodapé, SEO e dados estruturados.
- `logoText` e `logoHighlight`: duas partes do nome exibido no logotipo. A segunda recebe a cor principal.
- `initials`: duas ou três letras exibidas no símbolo da marca.
- `monogram`: palavra curta usada nos elementos gráficos de fundo.
- `slogan`: frase curta exibida no início da página.
- `description`: apresentação principal da empresa.
- `foundedYear`: ano de fundação.

## 2. Contato e funcionamento

No bloco `contact`, substitua:

- `phone`: telefone no formato que deve aparecer para o visitante.
- `whatsapp`: somente números, incluindo país e DDD. Exemplo: `5511999999999`.
- `whatsappMessage`: mensagem inicial enviada pelo botão.
- `address`: endereço comercial completo.
- `hours`: dias e horários de funcionamento.

## 3. Serviços e preços

Edite a lista `services`. Cada item aceita:

- `name`: nome do serviço.
- `description`: resumo curto.
- `priceLabel`: por exemplo, `A partir de`, `Valor` ou `Sob consulta`.
- `price`: preço ou chamada comercial.
- `icon`: um caractere ou símbolo curto.
- `featured`: use `true` para destacar o card e `false` nos demais.

É possível adicionar, remover e reordenar serviços copiando ou excluindo objetos completos da lista.

## 4. Redes sociais

No bloco `social`, troque o `name` e a `url` de cada rede. Remova um item ou deixe a URL vazia para não mostrar aquela rede.

## 5. Textos das seções

Revise todo o bloco `content`, principalmente:

- `hero.highlights`: números e indicadores da empresa.
- `services`: título e introdução dos serviços.
- `about`: história, tempo de experiência e diferenciais.
- `testimonials.items`: depoimentos, nomes e iniciais reais, somente com autorização.
- `contact`: chamada final para contato.

Enquanto os dados forem fictícios, mantenha `isDemo: true`. Depois de substituir todos os exemplos por informações reais, altere para `isDemo: false`; isso remove automaticamente os avisos de demonstração e habilita telefone e WhatsApp válidos.

## 6. SEO

No bloco `seo`, altere:

- `title`: título da página, preferencialmente com nome da empresa e principal serviço.
- `description`: resumo objetivo da empresa, idealmente entre 120 e 160 caracteres.

O site atualiza também os dados Open Graph e os dados estruturados de negócio local.

## 7. Cores e fontes

No início de `style.css`, altere somente o bloco marcado como `PERSONALIZAÇÃO DO CLIENTE`:

- `--color-primary`: cor principal.
- `--color-primary-light`: variação clara da cor principal.
- `--color-primary-rgb`: os mesmos valores RGB da cor principal, sem `rgb()`; é usado nas transparências.
- `--color-secondary`: cor de contraste.
- `--color-background` e `--color-background-soft`: fundos principais.
- `--color-surface`: fundo dos cards.
- `--color-text`, `--color-text-heading` e `--color-text-muted`: cores dos textos.
- `--font-body` e `--font-heading`: famílias tipográficas instaladas no sistema.

Se alterar a cor de fundo, atualize também o valor de `theme-color` no `<head>` de `index.html`.

## Checklist antes de publicar

1. Substitua nome, slogan, descrição, ano e identidade curta.
2. Cadastre telefone, WhatsApp, endereço e horário reais.
3. Revise todos os serviços, preços e destaques.
4. Troque ou remova os indicadores e depoimentos fictícios.
5. Atualize todos os links de redes sociais.
6. Defina cores, fontes, título e descrição de SEO.
7. Confirme que não restaram textos de exemplo.
8. Altere `isDemo` para `false`.
9. Teste menu, links, telefone e WhatsApp em celular e computador.
