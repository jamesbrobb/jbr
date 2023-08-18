import {Component, Input, NgModule} from "@angular/core";

@Component({
  selector: 'scam-default-component',
  template: `<div>SCAM DEFAULT - {{title}}</div>`
})
export class ScamDefaultComponent {
  @Input() title = '';
}


@NgModule({
  declarations: [ScamDefaultComponent],
  exports: [ScamDefaultComponent],
})
export default class ScamComponentModule {}
