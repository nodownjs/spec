# Link

A link is an inline element used to create hyperlinks within a document. It consists of text that serves as the clickable portion and a URL pointing to the destination. Optionally, you can include a title for additional context, which is displayed when hovering over the link.

## Syntaxe

```syntaxe
[<text>](<link>;<title>)
```

| Attributes | Value type | Required | Description                         |
| ---------- | ---------- | -------- | ----------------------------------- |
| text       | text       | Optional | The text that replace the link      |
| link       | text       | Required | The link                            |
| title      | text       | Optional | The link title (displayed on hover) |

## Exemples

### Basic link

```
[Messaging with privacy !](https://signal.org/)
```

### Without text remplacement

```
[](https://github.com/nodownjs/)
```

### Without the syntaxe, links still works

```
https://github.com/nodownjs/
```
