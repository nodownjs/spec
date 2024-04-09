# Variable

Variables are used to define a value that can be reused in the document.

## Syntaxe

```syntaxe
<<variable_name>>

<<variable_name>>: <value>
```

| Attributes    | Value type | Required | Description                                       |
| ------------- | ---------- | -------- | ------------------------------------------------- |
| variable_name | text       | Required | The name of the variable                          |
| value         | text       | Required | The value that the variable will be replaced with |

## Exemples

### Basic variable

```
Actual version: <version>

<version>: 0.1.0
```

### Variable in code

```
Actual version: <`<version>`>

<version>: 0.1.0
```
