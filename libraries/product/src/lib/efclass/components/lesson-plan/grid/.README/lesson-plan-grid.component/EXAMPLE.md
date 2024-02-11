```html
<div class="grid-wrapper" [ngClass]="{'grey-bg': showMyLibraryCard}">

  <lesson-plan-grid class="grid"
    [dataProvider]="dataProvider"
    [header]="header"
    [title]="title"
    [showHero]="showHero && !showMyLibraryCard"
    [fiveCardLayout]="fancyLayout && !showMyLibraryCard"
    [itemTemplate]="showMyLibraryCard ? itemTemplate : undefined"
    (lessonPlanSelected)="onLessonPlanSelect($event)">

    <ng-template let-item="item" #itemTemplate>

      <my-library-lesson-plan-card
        [dataProvider]="item"
        [menu]="menu">

        <mat-menu #menu="matMenu"
                  [overlapTrigger]="false"
                  [xPosition]="'before'">

          <button mat-menu-item
                  [disableRipple]="true"
                  (click)="onDuplicateClick(item)">Duplicate</button>

          <button mat-menu-item class="destructive"
                  disableRipple="true"
                  (click)="onDeleteClick(item)">Delete</button>

        </mat-menu>

      </my-library-lesson-plan-card>

    </ng-template>

  </lesson-plan-grid>

</div>
```

```scss
:host {
  display: block;

  .grid-wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    justify-content: center;
    background-color: #FFFFFF;

    .grid {
      width: 100%;
      max-width: 102.4rem;
      padding: 4rem 2.2rem;
    }

    &.grey-bg {
      background-color: #FAFAFA;
    }
  }
}
```
