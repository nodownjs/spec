# Title

Titles are used to structure the content of a document. The syntax consists of using the hash symbol `#` followed by the title text. Optionally, you can specify an ID for the title, allowing for easy linking within the document. There are four levels of titles specified by the number of hash symbols `#`, and by default, level 2 titles start a new section. If no ID is provided, a default ID such as `title-1` will be assigned to the title, which can be useful for internal linking.

## Syntaxe

```syntaxe
# <text> {#<id>}
```

```syntaxe
## <text> {#<id>}
```

```syntaxe
### <text> {#<id>}
```

```syntaxe
#### <text> {#<id>}
```

| Attributes | Value type | Required | Description                                                                                                                                                                                        |
| ---------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text       | text       | Required | The title text                                                                                                                                                                                     |
| id         | text       | Optional | The ID to assign to a link.<br>When you set an `ID`, you can automatically scroll to it by clicking on a link with `#ID` url.<br>Exemple : `[Scroll to installation section](#linux-installation)` |

## Exemples

### Basic title

```
# Installation on Linux
```

### Title with ID

```
## Installation on Linux {#linux-installation}
```
