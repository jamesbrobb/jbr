import {Component, Input} from "@angular/core";

@Component({
  selector: 'standalone-component',
  standalone: true,
  template: `<div>STANDALONE - {{title}}</div>`
})
export class StandaloneComponent {
  @Input() title = '';
}
