import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {GithubConfig, githubConfigService} from "../../config/github/github-config";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AnalyticsEventDirective} from "@jamesbenrobb/ng";
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'jbr-github-btn',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    AnalyticsEventDirective,
    MatIconModule
  ],
  templateUrl: './github-btn.component.html',
  styleUrls: ['./github-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubBtnComponent {

  @Input({required: true}) path?: string;

  #githubConfig: GithubConfig = inject(githubConfigService);

  onSelect(): void {
    let link: string = this.#githubConfig.root;

    if( !!this.path && this.path !== '/') {
      link = `${link}${this.#githubConfig.app}${this.path}`
    }

    window.open(link);
  }
}
