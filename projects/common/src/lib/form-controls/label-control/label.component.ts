import { Component, Input } from '@angular/core';

@Component({
  selector: 'irm-label-control',
  template: '<label>{{ label }}</label><span>{{ value }}</span>',
  styleUrls: ['./label.component.scss'],
})
export class LabelControlComponent {
  @Input() label!: string;
  @Input() value: string | number | null | undefined;
}
