import {
  ComponentRef,
  Directive, EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy, Output,
  ViewContainerRef
} from "@angular/core";

import {ComponentLoaderService} from "./component-loader.service";


@Directive({
  selector: '[componentLoader]',
  standalone: true
})
export class ComponentLoaderDirective<T> implements OnChanges, OnDestroy {

  @Input('componentLoader') componentType?: string;
  @Output() componentChanged = new EventEmitter<ComponentRef<T>>();

  #container = inject(ViewContainerRef);
  #injector = inject(Injector);
  #loaderService = inject(ComponentLoaderService);

  #currentComponentType?: string;
  #currentComponent?: ComponentRef<T>;

  ngOnChanges(): void {
    this.loadComponent();
  }

  loadComponent(componentType?: string): void {

    if(componentType) {
      this.componentType = componentType;
    }

    if (this.componentType === this.#currentComponentType) {
      return;
    }

    this.#cleanUp();
    this.#createComponent(this.componentType);
  }

  ngOnDestroy() {
    this.#cleanUp();
  }

  #cleanUp() {

    if(!this.#currentComponent) {
      return;
    }

    this.#container.clear();
    this.#currentComponent.destroy();
    this.#currentComponent = undefined;
    this.#currentComponentType = undefined;
  }

  async #createComponent(type: string | undefined): Promise<void> {

    if(!type) {
      return;
    }

    const {ngModuleRef, componentType} = await this.#loaderService.getComponent<T>(type);

    this.#currentComponent = this.#container.createComponent<T>(componentType, {injector:this.#injector, ngModuleRef:ngModuleRef});
    this.#currentComponentType = type;

    this.componentChanged.emit(this.#currentComponent);
  }
}
