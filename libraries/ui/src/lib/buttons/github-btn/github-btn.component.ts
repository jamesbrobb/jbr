import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {AnalyticsEventDirective, githubConfigService} from "@jamesbenrobb/ng";


@Component({
  selector: 'jbr-github-btn',
  standalone: true,
  imports: [
    NgIf,
    AnalyticsEventDirective,
    MatIconModule
  ],
  templateUrl: './github-btn.component.html',
  styleUrls: ['./github-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubBtnComponent {

  @Input({required: true}) path?: string;

  #githubConfig = inject(githubConfigService, {optional: true});

  onSelect(): void {

    let link: string = this.#githubConfig?.root || '';
    const app: string = this.#githubConfig?.app || '';

    if(!!this.path && this.path !== '/') {
      link = `${link}${app}${this.path}`
    }

    window.open(link);
  }
}
