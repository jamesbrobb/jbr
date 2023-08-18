import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDefinedValue',
  standalone: true
})
export class IsDefinedValuePipe implements PipeTransform {
  transform(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }
}
