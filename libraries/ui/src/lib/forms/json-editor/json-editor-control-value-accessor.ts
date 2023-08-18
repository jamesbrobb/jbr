import {Directive, Self} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JsonEditorComponent} from "./json-editor.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";



@Directive({
  selector: '[jsonEditorControl]',
  standalone: true
})
export class JsonEditorControlValueAccessor implements ControlValueAccessor {

  onChange = (value:unknown) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor(
    @Self() private _jsonEditor: JsonEditorComponent
  ) {

    this._jsonEditor.onChange.pipe(
      takeUntilDestroyed()
    )
    .subscribe(value => this.onChange(value));

    this._jsonEditor.onFocus.pipe(
      takeUntilDestroyed()
    )
    .subscribe(value => this.onTouched());
  }

  writeValue(data: {[key: string]: unknown}) {
    this._jsonEditor.value = data;
    this._jsonEditor.ngOnChanges();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
