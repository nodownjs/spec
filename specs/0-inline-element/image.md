# Image

An image is an inline element used to display graphics within a document. It is defined by a URL pointing to the image resource. Optionally, you can specify alternative text for accessibility, as well as dimensions, rendering type, and a title for additional context.

## Syntaxe

```syntaxe
![<alt_text>;<width>;<height>;<render>](<image_url>;<title>)
```

| Attributs | Value Type                | Required | Description                                             |
| --------- | ------------------------- | -------- | ------------------------------------------------------- |
| alt_text  | text                      | Optional | Text alternatives for accessibility                     |
| width     | number or percentage      | Optional | Image width size                                        |
| height    | number or percentage      | Optional | Image height size                                       |
| render    | text["pixelated", "auto"] | Optional | Image rendering type, can only be "pixelated" or "auto" |
| image_url | text                      | Required | The image URL                                           |
| title     | text                      | Optional | The element title (displayed on hover)                  |

## Exemples

### Only required

```
![](https://picsum.photos/id/69/300/200)
```

### With alt text

```
![Random image](https://picsum.photos/id/69/300/200)
```

### With title

If `title` is specified and not the `alt_text`, the `alt_text` will became the `title` like `title: <title>`.

```
![](https://picsum.photos/id/69/300/200 "Random image title")
```

### Sized width only with pixel

```
![Random sized image;150](https://picsum.photos/id/69/300/200)
```

### Sized height only with pixel

```
![Random sized image;;150](https://picsum.photos/id/69/300/200)
```

### Sized both with pixel

```
![Random sized image;150;100](https://picsum.photos/id/69/300/200)
```

### Sized with percentage

```
![Random sized image;100%](https://picsum.photos/id/69/800/500)
```

### With auto rendering

Auto is the default rendering. It generally applies a smooth rendering to the image.

```
![bronze house pixel art;300;;auto](https://www.planetminecraft.com/images/awards/pmc_interior-decorators-minecraft-detail-contest_bronze.png)
```

### With pixelated rendering

This is useful for displaying images at a smaller size than their original resolution like pixel art.

```
![bronze house pixel art;300;;pixelated](https://www.planetminecraft.com/images/awards/pmc_interior-decorators-minecraft-detail-contest_bronze.png)
```
