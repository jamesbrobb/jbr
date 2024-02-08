import {Directive, HostListener, Input} from '@angular/core';


export type HrefInterceptorHandler = (event: Event, target: HTMLAnchorElement) => boolean | void;

@Directive({
  selector: '[jbrHrefInterceptor]',
  standalone: true
})
export class HrefInterceptorDirective {

  @Input('jbrHrefInterceptor') handler?: HrefInterceptorHandler;

  @Input() preventDefault = true;
  @Input() stopPropagation = true;
  @Input() stopImmediatePropagation = true;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    if(!event.target) {
      return;
    }

    let target: HTMLElement | null = event.target as HTMLElement,
      el: HTMLAnchorElement | undefined;

    while(!el && target) {

      if(target instanceof HTMLAnchorElement) {
        el = target;
        continue;
      }

      target = target.parentElement;
    }

    if(!(el instanceof HTMLAnchorElement)) {
      return;
    }

    if(this.preventDefault) {
      event.preventDefault();
    }

    if(this.stopPropagation) {
      event.stopPropagation();
    }

    if(this.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }

    if(this.handler) {
      this.handler(event, el);
    }
  }
}
