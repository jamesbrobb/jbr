import {Directive, Input} from '@angular/core';
import {AnalyticsEvent} from "@jbr/core";



@Directive({
    selector: '[analyticsEvent]'
})
export class AnalyticsEventDirectiveMock {

    @Input() analyticsEvent: AnalyticsEvent | undefined;
}
