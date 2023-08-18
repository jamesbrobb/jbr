import { Pipe, PipeTransform } from '@angular/core';
import {StringUtils} from "@jbr/core";

@Pipe({
  name: 'words',
  standalone: true
})
export class toWordsPipe implements PipeTransform {
  transform(value: any): string {
    return StringUtils.toWords(value);
  }
}
