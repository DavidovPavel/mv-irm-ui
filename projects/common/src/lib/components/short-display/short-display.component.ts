import { ControlType } from './../../models/form-controls-type';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ListItemDirective } from '../../form-factory/list-item.directive';
import { FormFieldModel } from '../../models/form-field-model';

@Component({
  selector: 'irm-short-display',
  templateUrl: './short-display.component.html',
  styleUrls: ['./short-display.component.scss'],
})
export class IrmShortDisplayComponent {

  ControlType = ControlType;

  @Input() fields: FormFieldModel[] = [];
  @Input() template: TemplateRef<ListItemDirective>;

  @Output() remove = new EventEmitter<number>();

  isArray(value: unknown): boolean {
    return Array.isArray(value);
  }

  asArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  getUrl(field: FormFieldModel): string {
    return (field.value as Array<string>)[0];
  }

  getValue(field: FormFieldModel): string {
    return (field.value as Array<string>)[1];
  }

  removeItem(id: number, field: FormFieldModel): void {
    if (!field.readonly && this.asArray(field.value)) {
      field.value = field.value.filter((a: { id: number }) => a.id !== id);
      this.remove.emit(id);
    }
  }
}
