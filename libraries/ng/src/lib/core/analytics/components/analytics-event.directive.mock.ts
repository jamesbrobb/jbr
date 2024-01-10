import {Directive, Input} from '@angular/core';
import {AnalyticsEvent} from "@jamesbenrobb/core";



@Directive({
    selector: '[analyticsEvent]'
})
export class AnalyticsEventDirectiveMock {

    @Input() analyticsEvent: AnalyticsEvent | undefined;
}
