# Alert

An alert is an element used to draw attention to important information within a document. It is defined by a type and content, with an optional title for additional context. The syntax consists of using the greater than symbol `>` followed by the type and either the title or content, or both. The type is specified using a single character, such as `!`, `i`, `+`, `-`, or `?` to indicate the type of the alert.

## Syntaxe

```syntaxe
><type> # <title>
```

```syntaxe
><type> <content>
```

```syntaxe
><type> # <title>
><type> <content>
```

```syntaxe
><type> # <title>
> <content>
```

| Attributes | Value type                    | Required | Description              |
| ---------- | ----------------------------- | -------- | ------------------------ |
| title      | text                          | Optional | The title of the alert   |
| content    | text                          | Required | The content of the alert |
| type       | text["!", "i", "+", "-", "?"] | Required | The type of the alert    |

## Exemples

### Warning alert with just a title

```
>! # Dont forget to save your work
```

### Warning alert with just a content

```
>! Dont forget to save your work
```

### Warning alert with a title and a content

```
>! # Be careful
>! Dont forget to save your work
```
