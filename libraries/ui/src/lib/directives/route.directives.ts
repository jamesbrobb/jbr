import {Directive, inject, Input} from "@angular/core";
import {Router} from "@angular/router";
import {HrefInterceptorDirective, HrefInterceptorHandler} from "./href-interceptor.directive";


@Directive({
  selector: '[hrefListener]',
  standalone: true,
  hostDirectives: [{
    directive: HrefInterceptorDirective,
    inputs: [
      'preventDefault',
      'stopPropagation',
      'stopImmediatePropagation'
    ]
  }]
})
export class HrefListenerDirective {

  @Input('hrefListener') handler?: HrefInterceptorHandler

  readonly #hrefInterceptor = inject(HrefInterceptorDirective);

  readonly #router: Router;

  constructor(router: Router) {
    this.#router = router;
    this.#hrefInterceptor.handler = this.#handleHref;
  }
  #handleHref = (event: Event, el: HTMLAnchorElement): void => {
    if(this.handler) {
      const res = this.handler(event, el);
      if(!res) {
        return;
      }
    }

    if(el.href.indexOf(origin) === 0) {
      this.#router.navigateByUrl(el.pathname);
      return;
    }

    window.open(el.href);
  }
}
