import {ComponentRef, Directive, inject, OnChanges, SimpleChanges} from "@angular/core";
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

  #instance?: ComponentRef<T>;

  protected get instance(): ComponentRef<T> | undefined {
    return this.#instance;
  }

  constructor() {
    this.#loader.componentChanged.pipe(
      takeUntilDestroyed(),
      tap(instance => {
        this.#setInstance(instance);
      })
    ).subscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.updateInstanceInputs(changes);
    this.#detectChanges();
  }

  protected loadComponent(componentType: string): void {
    this.#loader.loadComponent(componentType);
  }

  #setInstance(instance: ComponentRef<T>): void {
    this.cleanUpInstance();
    this.#instance = instance;
    this.setUpInstance();
    this.updateInstanceInputs();
    this.#detectChanges();
  }

  protected abstract setUpInstance(): void;

  protected abstract updateInstanceInputs(changes?: SimpleChanges): void;

  protected abstract cleanUpInstance(): void;

  #detectChanges(): void {

    if(!this.instance) {
      return;
    }

    this.instance.changeDetectorRef.detectChanges();
  }
}
