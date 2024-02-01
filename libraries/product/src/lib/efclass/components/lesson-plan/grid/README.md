# Lesson Plan Grid

## IO

**@Input (dataProvider):** [`Array<LessonPlanSummaryDs>`]()

**@Input (header):** `string`

**@Input (title):** `string`

**@Input (showHero):** `boolean`

**@Input (fiveCardLayout):** `boolean`

**@Input (itemTemplate):** `TemplateRef`

**@Output (lessonPlanSelected):** [`LessonPlanSummaryDs`]() - Triggered through a lesson plan card click

## Usage

Renders the [LessonPlanCardComponent](https://github.com/jamesbrobb/portfolio/tree/main/src/app/components/product/lesson-plan/card) by default

```html
<lesson-plan-grid
    [dataProvider]="dataProvider"
    [header]="'header'"
    [title]="'title'"
    [showHero]="true"
    [fiveCardLayout]="true"
    (lessonPlanSelected)="onLessonPlanSelect($event)">
</lesson-plan-grid>
```

Or can be supplied with an `itemTemplate`
```html
<lesson-plan-grid
  [dataProvider]="dataProvider"
  [header]="'header'"
  [title]="'title'"
  [itemTemplate]="itemTemplate"
  (lessonPlanSelected)="onLessonPlanSelect($event)">

  <ng-template let-item="item" #itemTemplate>
    
    <some-other-component-to-render [dataProvider]="item"></some-other-component-to-render>
    
  </ng-template>
  
</lesson-plan-grid>
```
