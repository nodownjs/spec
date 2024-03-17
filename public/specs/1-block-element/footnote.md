# Footnote

## Syntaxe

```syntaxe
[^ID]

[^ID]: TEXT
```

| Attributes | Value type | Required | Description                |
| ---------- | ---------- | -------- | -------------------------- |
| TEXT       | text       | Required | The footnote text text     |
| ID         | text       | Required | The ID of the footnote ref |

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
