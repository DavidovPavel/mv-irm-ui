import { FormGroup } from '@angular/forms';
import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[irmListItem]',
})
export class ListItemDirective {
  form: FormGroup;
  @Output() add = new EventEmitter<unknown>();
  addItem(item: unknown): void {
    this.add.emit(item);
  }
}
