# Image

## Syntaxe

```syntaxe
![ALT_TEXT;WIDTH;HEIGHT;RENDER](IMAGE_URL;TITLE)
```

| Attributs | Value Type           | Required | Description                                                  |
| --------- | -------------------- | -------- | ------------------------------------------------------------ |
| ALT_TEXT  | text                 | Required | Text alternatives for accessibility                          |
| WIDTH     | number or percentage | Optional | Image width size                                             |
| HEIGHT    | number or percentage | Optional | Image height size                                            |
| RENDER    | "pixelated"          | Optional | Image rendering type, can only be "pixelated" for the moment |
| IMAGE_URL | text                 | Required | The image URL                                                |
| TITLE     | text                 | Optional | The element title (displayed on hover)                       |

## Exemples

### Only required

```
![](https://picsum.photos/id/69/300/200)
```

### With alt text

```
![Random image](https://picsum.photos/id/69/300/200)
```

### Sized

```
![Random sized image;150;100](https://picsum.photos/id/69/300/200)
```
