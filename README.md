# Impulso

Página inicial minimalista para o navegador: ao abrir, exibe uma frase motivacional centralizada, com alto contraste entre o texto e o fundo. Sem frameworks, sem build - HTML, CSS e JS puros.

## Funcionalidades

- **Frase do dia**: ao abrir pela primeira vez no dia, sorteia uma frase e a fixa no `localStorage`. A mesma frase é exibida em qualquer recarregamento até o fim do dia; no dia seguinte, uma nova é sorteada.
- **Tema aleatório**: a cada carregamento (ou troca de frase) um dos 10 temas de cor é sorteado, sempre com bom contraste entre fundo e texto.
- **Clique na página troca a frase**: clicar em qualquer área (fora do botão) sorteia uma nova frase e um novo tema, com transição suave — sem alterar a "frase do dia" salva.
- **Botão de copiar**: ícone discreto (clipboard) no canto inferior direito. Copia a frase + autor atualmente exibida para a área de transferência e mostra um toast de confirmação.
- **Autor desconhecido**: quando o autor da frase é `"Autor desconhecido"`, o rodapé de autoria não é exibido (nem na tela, nem no texto copiado).

## Estrutura

```
.
├── index.html          # marcação: citação centralizada, botão de troca e toast
├── style.css           # layout minimalista, temas via variáveis CSS, transições
├── app.js              # lógica: frase do dia, sorteio de tema, clipboard, shuffle
├── quotes.json         # banco de frases (chave = id, valor = { text, author })
└── docker-compose.yml  # servidor nginx local para servir o projeto
```

### Temas

Os temas (pares `bg`/`fg`) estão definidos no topo de `app.js`, no array `THEMES`. Para adicionar ou ajustar um tema, edite esse array — vale manter contraste alto entre `bg` e `fg`.

## Como rodar

O app usa `fetch("quotes.json")`, que exige que os arquivos sejam servidos via HTTP (não funciona abrindo o `index.html` direto com `file://`, por restrição de CORS do navegador).

Com Docker:

```bash
docker compose up -d
```

Acesse `http://localhost:8080`. Para parar:

```bash
docker compose down
```

Alternativamente, qualquer servidor estático simples funciona, por exemplo:

```bash
python3 -m http.server 8080
```
