
```html
<lesson-plan-card class="card"
  [ngClass]="{large: isLarge}"
  [dataProvider]="lessonPlan">
</lesson-plan-card>
```

```scss
:host {
  display: block;

  .example-background {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #FFFFFF;

    .card {
      width: 100%;
      max-width: 420px;
    }
  }
}
```