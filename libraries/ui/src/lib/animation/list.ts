import {animate, AnimationTriggerMetadata, query, stagger, style, transition, trigger} from "@angular/animations";


export const listAnimation: AnimationTriggerMetadata = trigger('listAnimation', [
  transition('* => *', [ // each time the binding value changes
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('0.3s', style({ opacity: 1,}))
      ])
    ], { optional: true })
  ])
]);
