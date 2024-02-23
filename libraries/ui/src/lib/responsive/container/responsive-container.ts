import {ResizeObserverService, ResizeHandler} from '../resize-observer.service';
import {filter, map, Observable, take, tap, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


export enum BREAKPOINT_KEYS {
  XS,
  SM,
  MD,
  LG,
  XL,
  XXL
}

type BreakpointKeyStrings = keyof typeof BREAKPOINT_KEYS;

export type BREAKPOINTS = {
  [k in BreakpointKeyStrings]?: number;
}

type ResponsiveElement = Element & ElementCSSInlineStyle;



export abstract class BaseResponsiveContainer implements ResizeHandler {

  #breakPoints: BREAKPOINTS | undefined;

  #element: ResponsiveElement;
  #service: ResizeObserverService;

  #getStyleDec: Observable<any>;

  protected constructor(element: ResponsiveElement, service: ResizeObserverService) {
    this.#element = element;
    this.#service = service;

    this.#getStyleDec = timer(0,200).pipe(
      map(() => getComputedStyle(element)),
      filter(dec => dec.length > 0),
      take(1),
      takeUntilDestroyed()
    )
  }

  handleResize(contentRect: DOMRectReadOnly): void {

    this._resizeNotification(contentRect, this.#element);

    if (typeof this.#breakPoints === "undefined") {
      return;
    }

    const breakpoints = this.#breakPoints;

    Object.keys(breakpoints)
      .forEach((breakpoint) => {

        const minWidth =  breakpoints[breakpoint as BreakpointKeyStrings] as number;

        if (contentRect.width >= minWidth) {
          this.#element.classList.add(breakpoint);
          return;
        }

        this.#element.classList.remove(breakpoint);
      });
  }

  destroy(): void {
    this.#service.unobserve(this.#element);
  }

  protected _initialise(): void {

    this.#getStyleDec.pipe(
      map(dec => {
        this.#breakPoints = this.#getBreakpointValues(dec);

        if(!this.#breakPoints) {
          console.warn('No breakpoint values declared in component styles');
          return;
        }

        this.#service.observe(this.#element, this);

        return this.#breakPoints;
      })
    ).subscribe();
  }

  #getBreakpointValues(dec: CSSStyleDeclaration): BREAKPOINTS | undefined {

    let breakpoints: BREAKPOINTS | undefined;

    Object.keys(BREAKPOINT_KEYS)
      .filter((key: string) => isNaN(Number(key)))
      .map((key: string) => {

        const styleValue: string | undefined = dec.getPropertyValue(`--${key}`);

        if(!styleValue) {
          return;
        }

        const numericalValue = /\d+/.exec(styleValue)?.[0];

        if(!numericalValue) {
          return;
        }

        breakpoints = breakpoints || {};

        breakpoints[key as BreakpointKeyStrings] = parseInt(numericalValue);
      });

    return breakpoints;
  }

  protected abstract _resizeNotification(contentRect: DOMRectReadOnly, element: Element): void;
}
