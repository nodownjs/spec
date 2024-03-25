# Footnote

A footnote is an element used to provide additional information or comments about a specific part of a document. It consists of a reference mark, indicated by a caret `^` and an `ID`, and the corresponding footnote text. The syntax for creating a footnote involves placing the reference mark at the desired location in the text, followed by the footnote text at the bottom of the page or document. The reference mark and footnote text are linked by their `IDs`, which must be unique within the document.

## Syntaxe

```syntaxe
[^<id>]

[^<id>]: <text>
```

| Attributes | Value type | Required | Description                |
| ---------- | ---------- | -------- | -------------------------- |
| id         | text       | Required | The ID of the footnote ref |
| text       | text       | Required | The footnote text          |

## Exemples

### Basic footnote

```
Some text with a footnote[^1]

[^1]: The first footnote
```

### Custom ID

```
Install the OS[^linux-installation]

[^linux-installation]: The installation can be done with a USB key
```
