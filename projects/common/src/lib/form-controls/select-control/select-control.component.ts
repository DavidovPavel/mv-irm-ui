import { Component, Input } from '@angular/core';
import { BaseItem } from '../../models/item';

import { FormControlDirective } from '../form-control.directive';


@Component({
  selector: 'irm-select-control',
  templateUrl: './select-control.component.html',
})
export class SelectControlComponent extends FormControlDirective {
  @Input() options: BaseItem[] | null;
}
