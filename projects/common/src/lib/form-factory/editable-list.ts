import { Directive, TemplateRef, Type } from '@angular/core';

import { FormControlDirective } from '../form-controls/form-control.directive';
import { ListItemDirective } from './list-item.directive';

@Directive()
export abstract class EditableList extends FormControlDirective {
  items: unknown[];
  template?: TemplateRef<ListItemDirective>;
  abstract attachAddComponent(component: Type<ListItemDirective>): void;
  abstract addItem(item: unknown): void;
  abstract removeItem(item: unknown): void;
}
