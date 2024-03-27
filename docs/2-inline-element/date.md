# Date

The date element is used to display a date in a specific format defined by a specific type.

## Syntaxe

```syntaxe
<<type>;<time>;<format>>
```

| Attributs | Value Type                                   | Required | Description                           |
| --------- | -------------------------------------------- | -------- | ------------------------------------- |
| type      | text["t", "iso", "i", "us", "u","eu", "e"]   | Required | The type of defined date              |
| time      | text or number                               | Required | The date of the format type defined   |
| format    | text["t", "T", "d", "D", "f", "F", "r", "R"] | Required | The format of the display of the date |

## Exemples

### Timestamp date display in the compact date format

```
<t:1711031503:d>
```

### Timestamp date display in the full date format

```
<t:1711031503:D>
```

### Timestamp date display in the compact time format

```
<t:1711031503:t>
```

### Timestamp date display in the full time format

```
<t:1711031503:T>
```

### Timestamp date display in the compact full format

```
<t:1711031503:f>
```

### Timestamp date display in the full format

```
<t:1711031503:F>
```

### Timestamp date display in the relative compact format

```
<t:1711031503:r>
```

### Timestamp date display in the relative full format

```
<t:1711031503:R>
```

### ISO date

```
<iso:2024/03/21:D>
```

### ISO date with shortcut

```
<i:2024/03/21:D>
```

### US date

```
<us:03/21/2024:D>
```

### EU date

```
<eu:21/03/2024:D>
```
