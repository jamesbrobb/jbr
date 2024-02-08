import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {openClose, rotate} from "../../animation";

@Component({
  selector: 'jbr-content-hide',
  standalone: true,
  imports: [
    MatIconModule
  ],
  animations: [
    openClose({timings: '0.3s'}),
    rotate()
  ],
  templateUrl: './content-hide.component.html',
  styleUrls: ['./content-hide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentHideComponent {

  @Input({required: true}) title?: string;

  isOpen = false;
}
