```html

<page-header
  [title]="title"
  [fallbackSeed]="fallbackSeed"
  [fallbackColor]="fallbackColor"
  [overlayColor]="overlayColor"
  [imageUrl]="imageUrl">

  <ng-container class="page-header-top-slot">

    <div class="slot-content"
         [style.height.px]="topSlotContentHeight"
         [style.border-width.px]="topSlotBorderWidth">
    </div>

  </ng-container>

  <ng-container class="page-header-content-slot">

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

  </ng-container>

</page-header>
```

```scss
:host {
  display: block;

  .slot-content {
    width: 100%;
    background-color: rgba(#ffffff, 0.2);
    border-color: rgba(#ffffff, 0.6);
    border-style: solid;
    box-sizing: border-box;
  }
}
```
