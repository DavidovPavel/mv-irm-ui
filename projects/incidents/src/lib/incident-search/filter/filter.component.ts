import { Component, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Params } from '@angular/router';
import { FormFieldModel } from '@irm-ui/common';
import * as _moment from 'moment';

import { getOptionsFromDictionary } from '../../core/func';
import { InfinityScrollSelectComponent } from '../../infinity-scroll-select/infinity-scroll-select.component';
import { Incident } from '../../models/incident';
import { IncidentRequestStatusTypeName } from '../../models/request-status.enum';
import { FLAG_SHOP_PARAM, SearchService, SHOP_PARAM } from '../search.service';

const moment = _moment;

export interface Chip {
  name: string;
  label: string;
}

@Component({
  selector: 'irm-incident-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  activeRequestStatus = getOptionsFromDictionary(IncidentRequestStatusTypeName);
  chips: Chip[] = [];

  superSearch = new FormControl();

  @Input() form!: FormGroup;
  @Input() set params(params: Params) {
    if (params) {
      this.chips = Object.keys(params)
        .map((e) => this.service.findField(e))
        .filter((a) => !!a)
        .map((a) => ({ name: a.name, label: this.getLabel(a) }));
    }
  }

  dropdownLists!: QueryList<InfinityScrollSelectComponent>;

  @Output() excel = new EventEmitter();
  @Output() expanded = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() find = new EventEmitter<string>();

  @ViewChild('status') statusRequest!: MatSelect;
  @ViewChild(InfinityScrollSelectComponent) serviceCenter!: InfinityScrollSelectComponent;

  constructor(private service: SearchService) {}

  complicatedSearch(): void {
    const text = this.superSearch.value as string;
    if (text.trim()) {
      this.find.emit(text);
    }
  }

  getLabel(a: FormFieldModel<Incident>): string {
    const { name, type, label, hint } = a;
    const value = this.form.controls[name].value;
    let optionsName = '';

    if (type === 'select') {
      if (name === 'incidentRequestStatusType') {
        optionsName = (value as number[])
          .map((n) => this.statusRequest.options.find((b) => b.value === n)?.viewValue)
          .join(', ');
      }

      if (name === 'serviceCenterId') {
        const item = this.serviceCenter.selectedItem;
        optionsName = item ? item.name : '';
      }

      const control = this.dropdownLists.find((c) => c.controlName === name);
      if (control) {
        const item = control.selectedItem;
        optionsName = item ? item.name : control.startValue;
      }
    }

    if (type === 'date') {
      optionsName = moment(value).format('DD.MM.yyyy');
    }

    return `${hint ?? label}: ${optionsName}`;
  }

  removeChip(chip: Chip): void {
    this.checkOnShop(chip.name);
    this.chips = this.chips.filter((a) => a.name !== chip.name);
    this.form.controls[chip.name].setValue('');
    this.remove.emit();
  }

  checkOnShop(name: string): void {
    if (name === SHOP_PARAM) {
      const shopId = localStorage.getItem(SHOP_PARAM);
      if (shopId && `${this.form.controls[name].value}` === shopId) {
        localStorage.setItem(FLAG_SHOP_PARAM, this.form.controls[name].value);
      }
    }
  }

  toExpanded(): void {
    this.expanded.emit();
  }

  startExcel(): void {
    this.excel.emit();
  }
}
