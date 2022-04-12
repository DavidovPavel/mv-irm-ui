import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  BaseServiceActions,
  BaseServiceSelectors,
  ENVIRONMENT_TOKEN,
  FormFactoryComponent,
  FormFactoryService,
  FormFieldModel,
  IRMPermissions,
  Item,
  ProjectType,
  ZNUInfo,
} from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { NgxPermissionsObject } from 'ngx-permissions';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { bodyExpansion } from '../../animation/bodyExpansion';
import { BaseItem } from '../../models/base-item';
import { IncidentFile } from '../../models/incident-file';
import { IncidentsStoreActions, IncidentsStoreSelectors } from '../../store';
import { State } from '../../store/state';
import { Incident } from './../../models/incident';
import { PermissionManagementService } from './../../permission-management.service';
import { RequestFields } from './request-fields';

const requestFiles: FormFieldModel<Incident> = {
  name: 'requestFiles',
  label: 'Файлы запроса',
  type: 'file',
  cssClassNames: 'full-width',
  permission: IRMPermissions.IncidentEdit_requestFiles,
};

@Component({
  selector: 'irm-incident-request-data',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.scss'],
  animations: [bodyExpansion],
})
export class RequestDataComponent implements OnInit, OnChanges, OnDestroy {
  destroy$ = new Subject();
  panelOpenState = false;

  source: FormFieldModel<Incident>[] = RequestFields;

  fields!: FormFieldModel<Incident>[];
  shortFields!: FormFieldModel<Incident>[];
  filesToDelete: number[] = [];

  @Input() form!: FormGroup;
  @Input() incident!: Incident;

  @ViewChild('factory', { static: true }) formFactory!: FormFactoryComponent;

  permissions$!: Observable<NgxPermissionsObject>;

  constructor(
    private fieldService: FormFactoryService,
    private store: Store<State>,
    private permissionService: PermissionManagementService,
    @Inject(ENVIRONMENT_TOKEN) private environment: any
  ) {}

  get requestFiles(): FormArray {
    return this.form.get('requestFiles') as FormArray;
  }

  get disableAttachFile(): boolean {
    return !this.permissionService.has(IRMPermissions.IncidentEdit_requestFiles);
  }

  ngOnInit(): void {
    this.permissions$ = this.permissionService.permissions$.pipe(
      filter((a) => !!Object.keys(a).length),
      tap(() => {
        this.setPermissions();
        this.fillFields(this.incident);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ds = changes.incident;

    if (ds) {
      const couponNumber = this.incident.numberZNU;
      this.store.dispatch(BaseServiceActions.loadZNUInfo({ couponNumber }));
      this.store.dispatch(IncidentsStoreActions.getCreateReason());
      this.setPermissions();
      this.fillFields(ds.currentValue);
    }
  }

  setPermissions(): void {
    this.source = this.source.map((a) => ({
      ...a,
      disabled: !this.permissionService.has(a.permission),
    }));
  }

  fillFields(incident: Incident): void {
    this.fields = this.fieldService.parse<Incident>(this.source, incident);
    const fields = this.fields.map((a) =>
      a.options ? { ...a, value: a.options.find((b) => b.Id === a.value)?.Name } : { ...a }
    );
    this.shortFields = [...fields, { ...requestFiles, value: incident.requestFiles }];
    this.extraFieldsInit();
  }

  extraFieldsInit(): void {
    this.store
      .select(BaseServiceSelectors.selectZNUInfo)
      .pipe(
        takeUntil(this.destroy$),
        filter((znu): znu is ZNUInfo => znu !== null),
        tap((znu) => this.setZnuLink(znu))
      )
      .subscribe();

    this.store
      .select(IncidentsStoreSelectors.selectCreationReason)
      .pipe(
        takeUntil(this.destroy$),
        filter((a): a is BaseItem[] => a !== null),
        tap((reasons) =>
          this.setCreateReason(
            reasons
              .map((a) => ({ Id: a.id, Name: a.name }))
              .sort((b, c) => (b.Name < c.Name ? -1 : b.Name > c.Name ? 1 : 0))
          )
        )
      )
      .subscribe();
  }

  setCreateReason(reasons: Item[]): void {
    const id = this.incident.incidentCreationReason.id;
    const incidentCreationReasonId = this.fields.find((a) => a.name === 'incidentCreationReasonId');
    const incidentCreationReasonId2 = this.shortFields.find((a) => a.name === 'incidentCreationReasonId');
    if (incidentCreationReasonId && incidentCreationReasonId2) {
      incidentCreationReasonId.options = reasons;
      incidentCreationReasonId2.value = reasons.find((a) => a.Id === id)?.Name;
      this.formFactory.cdRef.detectChanges();
    }
  }

  setZnuLink(znu: ZNUInfo): void {
    const znuInfo = [
      `${this.environment.linkUrl}${ProjectType.get(znu.projectType)}/${znu.id}`,
      this.incident.numberZNU,
      '_blank',
    ];

    const link = this.fields.find((a) => a.name === 'numberZNU');
    const link2 = this.shortFields.find((a) => a.name === 'numberZNU');
    if (link && link2) {
      link.value = znuInfo;
      link2.value = znuInfo;
      this.formFactory.cdRef.detectChanges();
    }
  }

  removeItem(fileId: number): void {
    this.filesToDelete = [...this.filesToDelete, fileId];
  }

  download(incidentFile: IncidentFile): void {
    this.store.dispatch(IncidentsStoreActions.downloadFile({ id: incidentFile.file.id }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
