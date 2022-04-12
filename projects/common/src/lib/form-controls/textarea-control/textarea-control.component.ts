import { Component } from '@angular/core';

import { FormControlDirective } from '../form-control.directive';


@Component({
  selector: 'irm-textarea-control',
  templateUrl: './textarea-control.component.html',
  styleUrls: ['./textarea-control.component.scss'],
})
export class TextareaControlComponent extends FormControlDirective {}
