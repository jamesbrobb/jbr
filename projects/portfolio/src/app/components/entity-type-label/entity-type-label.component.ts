import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'jbr-entity-type-label',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './entity-type-label.component.html',
  styleUrls: ['./entity-type-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTypeLabelComponent {
  @Input() type?: string;
}
