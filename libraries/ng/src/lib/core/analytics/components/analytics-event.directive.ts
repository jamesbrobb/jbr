import {Directive, HostListener, inject, Input, Optional} from '@angular/core';
import {AnalyticsEvent, AnalyticsService} from "@jamesbenrobb/core";



@Directive({
  selector: '[analyticsEvent]',
  standalone: true
})
export class AnalyticsEventDirective {

  @Input() analyticsEvent?: AnalyticsEvent;

  @HostListener('click')
  onClick() {this.#send();}

  readonly #service = inject(AnalyticsService, {optional: true});

  #send(): void {
    if (!this.#service || !this.analyticsEvent) {
        return;
    }
    this.#service.track(this.analyticsEvent);
  }
}


@Directive({
  selector: '[analyticsHrefListener]',
  standalone: true
})
export class AnalyticsHrefListenerDirective {

  @Input() analyticsHrefListener: string | undefined;

  readonly #service = inject(AnalyticsService, {optional: true});

  @HostListener('click', ['$event'])
  onClick(event: Event): void {

      if(!(event.target instanceof HTMLAnchorElement)) {
          return;
      }

      const target: HTMLAnchorElement = event.target;

      event.preventDefault();
      event.stopImmediatePropagation();

      if(!this.#service || !this.analyticsHrefListener) {
          return;
      }

      const aEvt: AnalyticsEvent = {
          actionId: this.analyticsHrefListener,
          propertyValueMap: {
              link: target.href
          }
      }

      this.#service.track(aEvt);
  }
}

