import {debounceTime, Subject, Subscription, tap} from "rxjs";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from "@angular/forms";


import {
  ControlGroup,
  isDividerControl,
  isHeaderControl,
  isInputControl,
  isInteractiveControl,
  isJsonControl,
  isSelectControl
} from "../../config/controls/controls-config";

import {GuardTypePipe, JsonEditorComponent, JsonEditorControlValueAccessor} from "@jamesbenrobb/ui";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ControlsConfigParser} from "../../config/controls/controls-config.parser";


export type ControlComponentInput = {
  controls?: ControlGroup[];
}

export type ControlComponentOutput = {
  dataChange: EventEmitter<{[key: string]: unknown}>;
}

export type ControlComponentIO = ControlComponentInput & ControlComponentOutput & OnChanges;



@Component({
  selector: 'div[example-controls]',
  standalone: true,
  imports: [
    GuardTypePipe,
    JsonEditorComponent,
    JsonEditorControlValueAccessor,
    NgIf,
    NgSwitch,
    NgClass,
    NgForOf,
    NgSwitchCase,
    NgSwitchDefault,
    ReactiveFormsModule
  ],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements ControlComponentIO, OnChanges, OnDestroy {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<{[key: string]: unknown}>();

  #parser = inject(ControlsConfigParser);

  form!: UntypedFormGroup;

  isInputControl = isInputControl;
  isSelectControl = isSelectControl;
  isJsonControl = isJsonControl;
  isHeaderControl = isHeaderControl;
  isDividerControl = isDividerControl;
  isInteractiveControl = isInteractiveControl;

  private _formSubscription: Subscription | undefined;
  private _debounce$ = new Subject<{[key: string]: unknown }>();


  constructor() {

    this._debounce$
      .pipe(
        takeUntilDestroyed(),
        debounceTime(100),
        tap((value) => this.dataChange.emit(value))
      )
      .subscribe();
  }

  ngOnChanges(): void {
    this._cleanUp();
    this._createFormGroup();
  }

  ngOnDestroy() {
    this._cleanUp();
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

        this.#parser.parseOptions(control);

        controls[control.key] = new UntypedFormControl(control.value)
      });
    console.log(controls);
    this.form = new UntypedFormGroup(controls);
    this._formSubscription = this.form.valueChanges.subscribe((value) => this._formValueChange(value));
    this._formValueChange(this.form.value, false);
  }
}
