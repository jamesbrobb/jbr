import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgFor, NgIf} from "@angular/common";
import {Observable} from "rxjs";


@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html',
  styleUrls: ['my-component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ]
})
class MyComponent {

  @Input({required: true}) myRequiredInput?: string;
  @Input('alias') myAliasedInput?: string;

  @Output() myOutput = new EventEmitter<string>();

  public someValue?: Observable<boolean>;

  public myMethod() {
    return 'myMethod';
  }
}
