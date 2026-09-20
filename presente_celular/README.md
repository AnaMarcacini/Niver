# 📱 Um pequeno celular feito para alguém especial

Um presente digital em HTML + CSS + JavaScript puro.

## Estrutura

```text
presente_celular/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── photos/
    ├── music/
    └── icons/
```

## Personalização rápida

Abra `script.js`. No começo do arquivo existe um objeto chamado `CONFIG`.

### Nome

```js
name: "[NOME]"
```

Troque por:

```js
name: "Ana"
```

### Mensagens

Edite:

```js
messages: [
  "Sua mensagem aqui...",
  "Outra mensagem..."
]
```

### Memórias

Edite os itens de `memories`, mantendo:

```js
{ year: "2026", title: "Título", text: "Texto..." }
```

### Carta

Edite `letter.title` e os textos dentro de `letter.paragraphs`.

### Música

Coloque seu MP3 em:

```text
assets/music/
```

Por exemplo:

```text
assets/music/nossa-musica.mp3
```

Depois altere:

```js
file: "assets/music/nossa-musica.mp3"
```

### Fotos

Coloque as imagens em:

```text
assets/photos/
```

E altere os caminhos em `photos`.

Exemplo:

```js
{ file: "assets/photos/nossa-foto.jpg", caption: "Nosso momento." }
```

## Como abrir

Basta abrir `index.html` no navegador.

Para publicar, você pode colocar essa pasta em qualquer hospedagem estática que aceite HTML/CSS/JS.

## Easter eggs

- Toque 3 vezes no coração da tela inicial.
- Toque 3 vezes no relógio.
- O aplicativo Presente fica bloqueado até os outros cinco aplicativos serem visitados.

## Observação sobre fotos

O projeto vem com placeholders: basta colocar seus arquivos nos caminhos configurados. Se uma foto não existir, o próprio aplicativo mostra qual arquivo está faltando.

## Observação sobre música

O navegador pode bloquear a reprodução automática, então a música começa quando a pessoa toca no botão de play.
