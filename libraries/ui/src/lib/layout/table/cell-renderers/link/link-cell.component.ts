import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'link-cell, [link-cell]',
  standalone: true,
  imports: [

  ],
  templateUrl: './link-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkCellComponent {
  @Output() cellSelected = new EventEmitter();
}
