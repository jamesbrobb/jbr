

## API

#### Inputs

<pre><code>@<a href="https://angular.io/api/core/Input">Input</a>()
dataProvider?: LessonPlanSummaryDs[]</code></pre>

<pre><code>@<a href="https://angular.io/api/core/Input">Input</a>()
menu?: MatMenu</code></pre>

## Usage

```html
<my-library-lesson-plan-card
    [dataProvider]="lesson-plan">
</my-library-lesson-plan-card>
```

Or with a contextual menu:

```html
<my-library-lesson-plan-card
    [dataProvider]="lesson-plan"
    [menu]="menu">

  <mat-menu #menu="matMenu">

    <button mat-menu-item
            (click)="onDoSomethingClick(item)">Do something</button>

    <button mat-menu-item
            (click)="onDoSomethingElseClick(item)">Do something else</button>

  </mat-menu>
  
</my-library-lesson-plan-card>
```
