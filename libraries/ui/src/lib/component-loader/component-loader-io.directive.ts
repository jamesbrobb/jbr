import {DestroyRef, Directive, EventEmitter, inject, Input, Output, SimpleChanges} from "@angular/core";
import {ComponentLoaderDirective} from "./component-loader.directive";
import {ComponentLoaderIOBase} from "./component-loader-io-base.abstract";


@Directive({
  selector: '[componentLoaderIO]',
  standalone: true,
  hostDirectives: [{
    directive: ComponentLoaderDirective,
    inputs: ['componentLoader:componentLoaderIO']
  }]
})
export class ComponentLoaderIODirective<T extends object> extends ComponentLoaderIOBase<T> {

  @Input() inputs?: Partial<T>;
  @Input() outputs?: Partial<T>;

  @Output() outputChange = new EventEmitter();

  #destroyRef = inject(DestroyRef);

  protected override setUpInstance(): void {

    if(!this.instance) {
      return;
    }

    /*this.instance.dataChange
      .pipe(
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((arg) => this.dataChange.emit(arg));*/
  }

  protected updateInstanceInputs(changes: SimpleChanges): void {

    console.log(changes);

    if(!this.instance) {
      return;
    }

    Object.keys(this.inputs || {})
      .forEach((key) => {

        if(!this.instance || !this.inputs) {
          return;
        }

        const k= key as keyof T,
          value= this.inputs[k];

        if(value) {
          this.instance[k] = value;
        }
      });
  }
}
