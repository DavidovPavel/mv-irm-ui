import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { IRM_DATETIME_FORMAT, IRMPermissions } from '@irm-ui/common';
import { NgxPermissionsObject } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Incident } from '../../models/incident';
import { PermissionManagementService } from './../../permission-management.service';

@Component({
  selector: 'irm-incident-departure-date',
  templateUrl: './departure-date.component.html',
  styleUrls: ['./departure-date.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT }],
})
export class DepartureDateComponent implements OnChanges {
  @Input() form!: FormGroup;
  @Input() incident!: Incident;

  permissions$!: Observable<NgxPermissionsObject>;

  constructor(private permissionService: PermissionManagementService) {
    this.permissions$ = this.permissionService.permissions$.pipe(
      filter((a) => !!Object.keys(a).length),
      tap(() => this.stateField())
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ds = changes.incident;
    if (this.form && ds?.currentValue) {
      const ctr = this.form.get('departureDate');
      if (ctr) {
        ctr.setValue(ds.currentValue.departureDate);
        this.stateField();
      }
    }
  }

  stateField(): void {
    const ctr = this.form.get('departureDate') as AbstractControl;
    if (this.permissionService.has(IRMPermissions.IncidentEdit_departureDate)) {
      ctr.enable();
    } else {
      ctr.disable();
    }
  }
}
