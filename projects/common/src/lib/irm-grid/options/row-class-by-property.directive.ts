import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[irmRowClassByProperty]',
})
export class RowClassByPropertyDirective {
  @Input('irmRowClassByProperty') classByProperty = '';
}
