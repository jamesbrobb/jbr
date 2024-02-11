
```html
<image-component class="image"
   [ngClass]="selectedSize"
   [url]="url"
   [fallbackSeed]="seed"
   [fallbackColor]="color"
   [blur]="blur">
</image-component>
```
```scss
:host {
  display: block;

    .image {

      &.max-content {
        width: max-content;
        height: max-content;
      }

      &.fixed {
        width: 300px;
        height: 100px;
      }
    }
}
```
