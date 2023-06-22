import {ControlGroup, ControlGroupOption, ControlTypes, isSelectControl, SelectControl} from "./controls-config";


export type ControlsOptionsMap = {
  [key: string]: ControlGroupOption[]
}


export class ControlsConfigParser {

  constructor(
    private _optionsMap?:ControlsOptionsMap
  ) {}

  parseOptions(controls: ControlGroup[]): void {

    controls.forEach((control) => {

      switch(control.controlType) {
        case ControlTypes.select:
          this._parseSelect(control);
          break;
      }
    });
  }

  private _parseSelect(control: SelectControl): void {
    this._setSelectOptions(control);
    this._setSelectDefault(control);
  }

  private _setSelectOptions(control: SelectControl): void {

    if(!this._optionsMap || !control.optionsId) {
      return;
    }

    control.options = this._optionsMap[control.optionsId];
  }

  private _setSelectDefault(control: SelectControl): void {

    if(control.defaultValue === undefined || !control.options || !control.options.length) {
      return;
    }

    switch(typeof control.defaultValue) {

      case "number":
        let index = Math.max(Math.min(control.options.length, control.defaultValue), 0);
        control.value = control.options[index].value;
        break;

      case "string":
        let option = control.options.find((opt) => opt.value === control.defaultValue);
        control.value = option?.value;
        break;
    }
  }
}
