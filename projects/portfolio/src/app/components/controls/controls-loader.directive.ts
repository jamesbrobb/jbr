import {
  Directive,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from "@angular/core";

import {takeUntil} from "rxjs";

import {DynamicComponentModuleMapService, DynamicLoaderDirective} from "@jbr/ui";

import {ControlComponentIO, ControlsComponent} from "./controls.component";
import {ControlGroup} from "../../config/controls/controls-config";



@Directive({
  selector: '[controlsLoader]',
  standalone: true,
  providers: [
    {
      provide: DynamicComponentModuleMapService,
      useValue: {
        'controls-dynamic': () => import('./controls.dynamic.module'),
      },
      multi: true
    }
  ]
})
export class ControlsLoaderDirective extends DynamicLoaderDirective<ControlsComponent> implements OnInit, ControlComponentIO {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<any>();

  ngOnInit() {
    this._setComponentSelector('controls-dynamic');
  }

  protected override _updateInstanceInputValues(): void {
    this._instance!.controls = this.controls;
  }

  protected override _setUpInstanceOutputs(): void {
    this._instance!.dataChange
      .pipe(takeUntil(this._destroyed$))
      .subscribe((arg) => this.dataChange.emit(arg));
  }
}
