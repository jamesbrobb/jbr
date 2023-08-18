import {
  DestroyRef,
  Directive,
  EnvironmentProviders,
  EventEmitter,
  inject,
  Input, makeEnvironmentProviders,
  Output
} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {tap} from "rxjs";

import {ComponentLoaderMapService, ComponentLoaderIOBase} from "@jbr/ui";
import {ControlComponentIO} from "./controls.component";
import {ControlGroup} from "../../config/controls/controls-config";


export function getControlsLoaderProvider(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: {
      'example-controls': {
        import: () => import('./controls.component'),
        componentName: 'ControlsComponent'
      }
    },
    multi: true
  }]);
}

@Directive({
  selector: '[controlsLoader]',
  standalone: true
})
export class ControlsLoaderDirective extends ComponentLoaderIOBase<ControlComponentIO> implements ControlComponentIO {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<{[key: string]: unknown}>();

  #destroyRef = inject(DestroyRef);

  constructor() {

    super();

    this.loadComponent('example-controls');
  }

  protected override setUpInstance(): void {

    if(!this.instance) {
      return;
    }

    this.instance.dataChange.pipe(
      takeUntilDestroyed(this.#destroyRef),
      tap(value => this.dataChange.emit(value))
    ).subscribe();
  }

  protected updateInstanceInputs(): void {

    if(!this.instance) {
      return;
    }

    this.instance.controls = this.controls;
  }
}
