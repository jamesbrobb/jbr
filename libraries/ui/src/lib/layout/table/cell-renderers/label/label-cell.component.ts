import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'label-cell, [label-cell]',
  standalone: true,
  templateUrl: './label-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelCellComponent {
  @Input() label?: string;
}
