import {map} from "rxjs";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ColorMode, DarkModeSwitchService} from "../../styles/dark-mode-switch/dark-mode-switch.service";


@Component({
  selector: 'jbr-ui-dark-mode-btn',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon
  ],
  providers: [
    DarkModeSwitchService
  ],
  templateUrl: './dark-mode-btn.component.html',
  styleUrl: './dark-mode-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DarkModeBtnComponent {

  readonly #darkModeSwitchService = inject(DarkModeSwitchService);

  readonly darkMode$ = this.#darkModeSwitchService.currentMode$.pipe(
    map(mode => mode === ColorMode.Dark)
  );

  toggleDarkMode() {
    this.#darkModeSwitchService.toggleMode();
  }
}
