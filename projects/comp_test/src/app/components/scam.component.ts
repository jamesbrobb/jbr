import {Component, Input, NgModule, OnChanges, SimpleChanges} from "@angular/core";

@Component({
  selector: 'scam-component',
  template: `<div>SCAM - {{title}}</div>`
})
export class ScamComponent implements OnChanges {
  @Input() title = '';

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}


@NgModule({
  declarations: [ScamComponent],
  exports: [ScamComponent],
})
export class ScamComponentModule {}
