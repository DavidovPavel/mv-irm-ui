import { Component, Input } from '@angular/core';

import { BaseItem } from '../../models/item';
import { FormControlDirective } from '../form-control.directive';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent extends FormControlDirective {
  @Input() options: BaseItem[] | null;

  displayFn(value: BaseItem): string {
    return value ? value.name : '';
  }
}
