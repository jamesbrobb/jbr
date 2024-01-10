import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MarkdownModule} from "ngx-markdown";
import {AnalyticsHrefListenerDirective} from "@jamesbenrobb/ng";
import {HrefListenerDirective} from "../../route/directives/route.directives";
import {NgIf} from "@angular/common";

@Component({
  selector: 'jbr-markdown',
  standalone: true,
  imports: [MarkdownModule, AnalyticsHrefListenerDirective, HrefListenerDirective, NgIf],
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent {

  @Input({required: true}) uri?: string;
  @Input() type?: string = 'docs';

  hasLoaded: boolean = false;
  hasError: boolean = false;

  onLoad($event: string): void {
    this.hasLoaded = true;
  }

  onError($event: string | Error): void {
    this.hasLoaded = true;
    this.hasError = true;
  }
}
