import {
  Component,
  Input, NgModule,
  OnChanges
} from '@angular/core';
import {CommonModule} from "@angular/common";


export enum FALLBACK_COLORS {
    BLUE= 'blue',
    GREEN= 'green',
    ORANGE= 'orange',
    PURPLE= 'purple',
    WHITE= 'white'
}


@Component({
    selector: 'fallback-image',
    templateUrl: './fallback-image.component.html',
    styleUrls: ['./fallback-image.component.scss']
})
export class FallbackImageComponent implements OnChanges {

    @Input() seed?: string | number;
    @Input() color?: FALLBACK_COLORS;

    private _fallbackSvgName?: string;

    get fallbackSvgName(): string {

        if(!this._fallbackSvgName) {
            this._fallbackSvgName = this._getSvgName();
        }

        return this._fallbackSvgName;
    }

    public ngOnChanges(): void {
        this._fallbackSvgName = this._getSvgName();
    }

    private _getSvgName(): string {

        let col: string | undefined = this.color;

        if (!col) {
            col = this._calculateColor();
        }

        return `background-${col}`
    }

    private _calculateColor(): string {

      let seedInt: number = NaN;

      const svgKeys = Object.keys(FALLBACK_COLORS)

      switch(typeof this.seed) {
        case 'number':
          seedInt = this.seed;
          break;
        case 'string':
          seedInt = parseInt(this.seed.replace(/\D/g, ''));
          break;
        default:
          seedInt = Math.round(Math.random() * (svgKeys.length - 1))
      }

      const index = seedInt % svgKeys.length;

      return svgKeys[index].toLowerCase();
    }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FallbackImageComponent],
  exports: [FallbackImageComponent]
})
export class FallbackImageComponentModule {}
