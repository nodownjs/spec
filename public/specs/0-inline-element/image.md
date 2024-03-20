# Image

An image is an inline element used to display graphics within a document. It is defined by a URL pointing to the image resource. Optionally, you can specify alternative text for accessibility, as well as dimensions, rendering type, and a title for additional context.

## Syntaxe

```syntaxe
![<alt_text>;<width>;<height>;<render>](<image_url>;<title>)
```

| Attributs | Value Type           | Required | Description                                                  |
| --------- | -------------------- | -------- | ------------------------------------------------------------ |
| alt_text  | text                 | Optional | Text alternatives for accessibility                          |
| width     | number or percentage | Optional | Image width size                                             |
| height    | number or percentage | Optional | Image height size                                            |
| render    | text["pixelated"]    | Optional | Image rendering type, can only be "pixelated" for the moment |
| image_url | text                 | Required | The image URL                                                |
| title     | text                 | Optional | The element title (displayed on hover)                       |

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
