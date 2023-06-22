import {debounceTime, Subject, Subscription, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';

import {JsonEditorComponentModule} from "../forms";


import {
  ControlGroup,
  isDividerControl,
  isHeaderControl,
  isInputControl,
  isInteractiveControl,
  isJsonControl,
  isSelectControl
} from "../../config/controls/controls-config";

import {PipesModule} from "@jbr/components/pipes/pipes.module";



export interface ControlComponentIO {
  controls?: ControlGroup[];
  dataChange: EventEmitter<unknown>;
}



@Component({
  selector: 'div[example-controls]',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements ControlComponentIO, OnChanges, OnDestroy {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<unknown>();

  form!: UntypedFormGroup;

  isInputControl = isInputControl;
  isSelectControl = isSelectControl;
  isJsonControl = isJsonControl;
  isHeaderControl = isHeaderControl;
  isDividerControl = isDividerControl;
  isInteractiveControl = isInteractiveControl;

  private _formSubscription: Subscription | undefined;
  private _destroy$ = new Subject();
  private _debounce$ = new Subject<{[key: string]: unknown }>();


  constructor() {

    this._debounce$
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(100)
      )
      .subscribe((value) => this.dataChange.emit(value));
  }

  ngOnChanges(): void {
    this._cleanUp();
    this._createFormGroup();
  }

  ngOnDestroy() {
    this._cleanUp();

    this._destroy$.next('');
    this._destroy$.complete();
  }

  private _formValueChange(value: {[key: string]: unknown }, throttle: boolean = true): void {

    if(!throttle) {
      this.dataChange.emit(value);
      return;
    }

    this._debounce$.next(value);
  }

  private _cleanUp(): void {
    this._formSubscription?.unsubscribe();
  }

  private _createFormGroup(): void {

    if(!this.controls) {
      return;
    }

    const controls: {[key: string]: UntypedFormControl} = {};

    this.controls.forEach((control) => {

        if(!isInteractiveControl(control)) {
          return;
        }

        controls[control.key] = new UntypedFormControl(control.value)
      });
    console.log(controls);
    this.form = new UntypedFormGroup(controls);
    this._formSubscription = this.form.valueChanges.subscribe((value) => this._formValueChange(value));
    this._formValueChange(this.form.value, false);
  }
}


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    JsonEditorComponentModule,
    PipesModule
  ],
  declarations: [ControlsComponent],
  exports: [ControlsComponent]
})
export class ControlsComponentModule {}
