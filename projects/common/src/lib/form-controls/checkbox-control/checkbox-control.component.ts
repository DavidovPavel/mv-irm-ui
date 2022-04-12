import { Component } from '@angular/core';

import { FormControlDirective } from '../form-control.directive';

@Component({
  selector: 'irm-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss'],
})
export class CheckboxControlComponent extends FormControlDirective {}
