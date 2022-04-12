import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFactoryService, FormFieldModel, Profile } from '@irm-ui/common';

import { Incident } from '../../models/incident';
import { TimingFields } from './timing-fields';

@Component({
  selector: 'irm-incident-timing',
  templateUrl: './timing.component.html',
  styles: [':host {display: block; margin-bottom: 20px;}'],
})
export class TimingComponent implements OnChanges {
  fields: FormFieldModel<Incident>[] = [];

  @Input() incident!: Incident;

  constructor(private fieldService: FormFactoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const ds = changes.incident;
    if (ds) {
      this.fields = this.fieldService.parse(TimingFields, ds.currentValue);
    }
  }
}
