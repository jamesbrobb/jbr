
```html
<grid-layout class="grid-layout" [dataProvider]="dataProvider">

  <ng-template let-item="item">

    <div class="item">
      <div>{{item.title}}</div>
    </div>

  </ng-template>

</grid-layout>
```

```scss
:host {
  display: block;
  width: 100%;

  .grid-layout {
    overflow: hidden;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-color: #c2185b;
  }
}
```
