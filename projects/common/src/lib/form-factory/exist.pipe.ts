import { Pipe, PipeTransform } from '@angular/core';
import { cssType } from '../models/css-type';

@Pipe({
  name: 'exist',
})
export class ExistPipe implements PipeTransform {
  transform(value: cssType | undefined): cssType {
    if (value) {
      return value;
    }
    return '';
  }
}
