# Portfólio — Vitor Paz

Site pessoal responsivo feito com HTML, CSS e JavaScript puros. Não precisa instalar pacotes nem configurar servidor.

## Executar localmente

Abra `index.html` no navegador. Para desenvolver com recarga automática, você pode usar a extensão Live Server no VS Code e iniciar o servidor pela pasta do projeto.

## Personalizar

- A seção de projetos lista os repositórios EMAD, DOU Leis e MPs, Smart Contract Studio e Indicium Pipeline.
- Para atualizar tecnologias, descrições ou links, edite a seção correspondente em `index.html`.
- O tema é alternável no cabeçalho e a preferência fica salva no navegador.

As fontes Manrope e DM Mono são carregadas do Google Fonts; sem conexão, o navegador usa fontes de sistema.


## Publicar no Cloudflare Workers

O site usa Workers Static Assets e o Wrangler. Com Node.js instalado, autentique sua conta Cloudflare e publique: `npx wrangler login` e depois `npx wrangler deploy`. O Worker serve os arquivos estáticos da pasta `dist`.
