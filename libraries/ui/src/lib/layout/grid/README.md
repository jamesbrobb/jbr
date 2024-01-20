<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="user-content-grid-layout"></a>
<a name="grid-layout"></a>
# Grid Layout

A simple grid layout component for rendering an `auto-fill` grid.

Content projection is used to render the supplied UI component repeatedly within the grid. A flex based responsive grid fallback is used if `display:grid` is not supported.

---

<a name="user-content-grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg"></a>
<a name="grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg"></a>
## API {.tabset .tabset-fade .tabset-pills .tabset-underline .tabset-primary .tabset-lg}

---

<a name="user-content-grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg-inputs"></a>
<a name="grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg-inputs"></a>
#### Inputs

```
@Input()
dataProvider?: unknown[]
```






---
<a name="user-content-grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg-properties"></a>
<a name="grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg-properties"></a>
#### Properties

```
@ContentChild('TemplateRef', {static: true})
 itemTemplate: TemplateRef<any> | null = null
```




---
<a name="user-content-grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg-methods"></a>
<a name="grid-layout-api-tabset-tabset-fade-tabset-pills-tabset-underline-tabset-primary-tabset-lg-methods"></a>
#### Methods

```
 trackById(index: number, item: any): string
```

<a name="user-content-grid-layout-"></a>
<a name="grid-layout-"></a>
## {-}

<a name="user-content-grid-layout-usage"></a>
<a name="grid-layout-usage"></a>
## Usage

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

