import { Component, OnInit } from '@angular/core';
import { GridConfig } from '@irm-ui/common';
import * as _moment from 'moment';

import { IncidentRequestStatusTypeName } from '../models';
import { dataSource } from './data-source';

const moment = _moment;

@Component({
  templateUrl: './grid.component.html',
  styles: [],
})
export class GridComponent implements OnInit {
  incidentRequestStatusTypeName = IncidentRequestStatusTypeName;
  dataSource = dataSource.map((a) => ({
    ...a,
    // incidentCreationReasonType: a.incidentCreationReason.name,
    // incidentRequestStatusType: IncidentRequestStatusTypeName[a.incidentRequestStatusType],
    // creationDate: a.creationDate ? moment(a.creationDate).format('DD.MM.yyyy HH:mm:ss') : '',
  }));

  gridConfig: GridConfig = {
    incidentNumber: { header: 'Инцидент', cssCell: 'primary' },
    numberZNU: 'Номер ЗНУ',
    clientName: 'ФИО клиента',
    clientPhone: 'Телефон клиента',
    incidentCreationReasonType: 'Причина создания',
    incidentRequestStatusType: 'Статус запроса',
    serviceCenterName: 'Сервисный центр',
    creationDate: 'Дата создания',
    closeDate: 'Дата закрытия',
  };

  get incidentRequestStatusTypeNameKeys(): string[] {
    return Object.keys(IncidentRequestStatusTypeName).filter((a) => isNaN(+a));
  }

  constructor() {}

  ngOnInit(): void {}

  testClick(row: unknown): void {
    console.log(row);
  }

  changePage(options: { pageIndex: number; pageSize: number }): void {
    console.log(options);
  }
}
