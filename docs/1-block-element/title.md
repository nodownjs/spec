# Title

## Syntaxe

```
# TEXT {#ID}
## TEXT {#ID}
### TEXT {#ID}
#### TEXT {#ID}
```

| Attributes | Value type | Required | Description                                                                                                                                                                                        |
| ---------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TEXT       | text       | Required | The title text                                                                                                                                                                                     |
| ID         | text       | Optional | The ID to assign to a link.<br>When you set an `ID`, you can automatically scroll to it by clicking on a link with `#ID` url.<br>Exemple : `[Scroll to installation section](#linux-installation)` |

## Exemples

### Basic title

```
# Installation on Linux
```

### Title with ID

```
# Installation on Linux {#linux-installation}
```
