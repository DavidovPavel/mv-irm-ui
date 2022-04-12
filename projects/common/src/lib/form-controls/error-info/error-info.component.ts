import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormFieldModel } from '../../models/form-field-model';

@Component({
  selector: 'app-error-info',
  template: `<mat-error *ngIf="hasError('required')">{{ hint || 'Нужно ввести значение!' }}</mat-error>
    <mat-error *ngIf="hasError('pattern')">Значение не валидно!</mat-error>`,
})
export class ErrorInfoComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  hint!: string;

  hasError(name: string): boolean {
    return this.control.hasError(name);
  }
}
