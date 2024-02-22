import {inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {MediaMatcher} from "@angular/cdk/layout";
import {BehaviorSubject, Subject} from "rxjs";


const KEY = 'color-mode';

export const enum ColorMode {
  Dark = 'dark',
  Light = 'light'
}

const ATTR_NAME = 'data-color-mode';


@Injectable({
  providedIn: 'root'
})
export class DarkModeSwitchService {

  readonly #document = inject(DOCUMENT);
  readonly #media = inject(MediaMatcher);
  readonly #colorSchemeQuery: MediaQueryList;
  readonly #currentMode= new BehaviorSubject<ColorMode>(ColorMode.Light);

  readonly currentMode$ = this.#currentMode.asObservable();


  constructor() {
    this.#colorSchemeQuery = this.#media.matchMedia('(prefers-color-scheme: dark)');
    this.#colorSchemeQuery.addEventListener('change', (value) => {
      if(!!this.#getLocalMode()) {
        return;
      }
      this.#setMode(value.matches ? ColorMode.Dark : ColorMode.Light, false);
    });
    this.#setInitialMode();
  }

  toggleMode() {
    this.#toggleMode();
  }

  #setInitialMode() {
    let mode = this.#getLocalMode();

    if(!mode) {
      mode = this.#colorSchemeQuery.matches ? ColorMode.Dark : ColorMode.Light;
    }

    this.#setMode(mode, false);
  }

  #toggleMode() {
    this.#setMode(
      this.#isInDarkMode() ? ColorMode.Light : ColorMode.Dark
    );
  }

  #isInDarkMode() {
    const local = this.#getLocalMode();

    if(local) {
      return local === ColorMode.Dark;
    }

    return this.#colorSchemeQuery.matches;
  }

  #setMode(mode: ColorMode, store: boolean = true) {

    if (store) {
      this.#setLocalMode(mode);
    }

    if (mode === ColorMode.Dark) {
      this.#document.body.setAttribute(ATTR_NAME,'dark');
    } else {
      this.#document.body.setAttribute(ATTR_NAME,'light');
    }

    this.#currentMode.next(mode);
  }

  #getLocalMode(): ColorMode | null {

    const mode = localStorage.getItem(KEY);

    return !mode ? null : mode as ColorMode;
  }

  #setLocalMode(value: ColorMode) {
    localStorage.setItem(KEY, value);
  }
}
