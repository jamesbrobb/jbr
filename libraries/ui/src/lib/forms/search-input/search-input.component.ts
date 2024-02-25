import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostBinding,
  Output
} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'jbr-ui-search-input',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    NgClass
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {

  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return {
      'is-open': this.active,
    }
  }

  @Output() readonly value = new EventEmitter<string>()

  active = false;

  searchClick(arg: HTMLInputElement) {
    this.active = true;
    arg.focus();
  }

  closeClick(arg: HTMLInputElement) {
    arg.value = '';
    this.active = false
  }

  inputChange({target}: Event) {
    if(!target || !(target instanceof HTMLInputElement)) {
      return;
    }
    this.value.emit(target.value);
  }

  inputFocus(event: Event) {
    this.active = true;
  }

  inputBlur({target}: Event) {
    if(!target || !(target instanceof HTMLInputElement)) {
      return;
    }

    if(target.value) {
      return;
    }

    this.active = false;
  }
}
