import { Component } from '@angular/core';

import { FormControlDirective } from '../form-control.directive';

@Component({
  selector: 'irm-text-control',
  template: `<mat-form-field [formGroup]="form">
    <mat-label>{{ label }}</mat-label>
    <input matInput [formControlName]="name" [readonly]="readonly" />
    <mat-hint>{{ hint }}</mat-hint>
    <mat-error *ngIf="!isValid">
      <app-error-info [hint]="hint" [control]="control"></app-error-info>
    </mat-error>
  </mat-form-field>`,
})
export class TextControlComponent extends FormControlDirective {}
