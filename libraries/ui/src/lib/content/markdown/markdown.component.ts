import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MarkdownModule} from "ngx-markdown";
import {AnalyticsHrefListenerDirective} from "@jamesbenrobb/ng";
import {HrefInterceptorHandler, HrefListenerDirective} from "../../directives";



@Component({
  selector: 'jbr-markdown',
  standalone: true,
  imports: [
    MarkdownModule,
    AnalyticsHrefListenerDirective,
    HrefListenerDirective,
    NgIf,
    NgClass
  ],
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent implements OnChanges {

  @Input({required: true}) uri?: string;
  @Input() type?: string = 'docs';
  @Input() baseUri: string = '';
  @Input() hrefHandler?: HrefInterceptorHandler;

  hasLoaded: boolean = false;
  hasError: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['uri'] && changes['uri'].currentValue) {
      this.hasLoaded = false;
      this.hasError = false;
    }
  }

  onLoad($event: string): void {
    this.hasLoaded = true;
  }

  onError($event: string | Error): void {
    this.hasLoaded = true;
    this.hasError = true;
  }
}
