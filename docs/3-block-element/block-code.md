# Block-code

## Syntaxe

```syntaxe
\`\`\`<language>
<code>
\`\`\`
```

| Attributes | Value type | Required | Description              |
| ---------- | ---------- | -------- | ------------------------ |
| language   | text       | Optional | The language of the code |
| code       | text       | Required | The code to display      |

## Exemples

### Basic block code

```
\`\`\`
console.log('Hello, World!')
\`\`\`
```

### With language

```
\`\`\`javascript
const hello = 'Hello, World!'
console.log(hello)
\`\`\`
```
