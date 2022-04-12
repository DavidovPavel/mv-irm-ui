import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldModel } from '@irm-ui/common';

import { InfinityScrollSelectComponent } from '../../infinity-scroll-select/infinity-scroll-select.component';
import { Incident } from '../../models/incident';
import { FLAG_SHOP_PARAM, SearchService } from './../search.service';

@Component({
  selector: 'irm-incident-extended-filter',
  templateUrl: './extended-filter.component.html',
  styleUrls: ['./extended-filter.component.scss'],
})
export class IncidentExtendedFilterComponent {
  creationFields: FormFieldModel<Incident>[] = this.service.fields.createData;
  closeFields: FormFieldModel<Incident>[] = this.service.fields.closedData;

  @Input() form!: FormGroup;

  @Output() apply = new EventEmitter();
  @Output() clear = new EventEmitter();

  @ViewChildren(InfinityScrollSelectComponent) dropdownLists!: QueryList<InfinityScrollSelectComponent>;

  constructor(private service: SearchService) {}

  applyFilter(): void {
    this.apply.emit();
  }

  clearFilter(): void {
    localStorage.setItem(FLAG_SHOP_PARAM, '');
    this.form.reset();
  }
}
