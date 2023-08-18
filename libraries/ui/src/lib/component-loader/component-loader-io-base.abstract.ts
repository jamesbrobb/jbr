import {Directive, inject, OnChanges, SimpleChanges} from "@angular/core";
import {ComponentLoaderDirective} from "./component-loader.directive";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";


@Directive({
  selector: '[abstractComponentLoaderIOBase]',
  hostDirectives: [
    ComponentLoaderDirective
  ]
})
export abstract class ComponentLoaderIOBase<T extends object> implements OnChanges {

  #loader = inject(ComponentLoaderDirective<T>);

  #instance?: T;

  protected get instance(): T | undefined {
    return this.#instance;
  }

  constructor() {
    this.#loader.componentChanged.pipe(
      takeUntilDestroyed(),
      tap(instance => {
        this.#setInstance(instance);
        this.setUpInstance();
        this.updateInstanceInputs();
        this.#triggerOnChanges();
      })
    ).subscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.updateInstanceInputs(changes);
    this.#triggerOnChanges();
  }

  protected loadComponent(componentType: string): void {
    this.#loader.loadComponent(componentType);
  }

  protected setUpInstance(): void {

  }

  protected abstract updateInstanceInputs(changes?: SimpleChanges): void;

  #setInstance(instance: T): void {
    this.#instance = instance;
  }

  #triggerOnChanges(): void {

    if(!this.#isOnChanges(this.#instance)) {
      return;
    }

    this.#instance.ngOnChanges({});
  }

  #isOnChanges(value: any): value is OnChanges {
    return value && typeof value['ngOnChanges'] === 'function';
  }
}
