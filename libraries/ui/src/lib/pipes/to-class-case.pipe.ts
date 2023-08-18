import { Pipe, PipeTransform } from '@angular/core';
import {StringUtils} from "@jbr/core";

@Pipe({
  name: 'classCase',
  standalone: true
})
export class toClassCasePipe implements PipeTransform {
  transform(value: any): string {
    return StringUtils.toClassCase(value);
  }
}
