import { SearchResult } from './../../models/search-result';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Incident } from '../../models/incident';
import { IncidentRequestStatusTypeName } from '../../models/request-status.enum';
import { SearchService } from '../search.service';

@Component({
  selector: 'irm-incident-result-grid',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.scss'],
})
export class ResultGridComponent {
  incidentRequestStatusType = IncidentRequestStatusTypeName;

  pageSizeOptions = [10, 50, 100];
  paginatedQuery = { pageIndex: 0, pageSize: 10 };

  columns = [
    'select',
    'edit',
    'incidentNumber',
    'numberZNU',
    'clientName',
    'clientPhone',
    'incidentCreationReasonType',
    'incidentRequestStatusType',
    'serviceCenterName',
    'creationDate',
    'closeDate',
  ];

  selection = new SelectionModel<Incident>(true, []);

  @Input() data!: SearchResult<Incident>;
  @Output() changePaginatedQuery = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  get totalSize(): number {
    return this.data.totalSize;
  }

  get dataSource(): Incident[] {
    return this.data.data;
  }

  pageEvent(e: PageEvent): void {
    const { pageIndex, pageSize } = e;
    this.paginatedQuery = { pageIndex, pageSize };
    this.changePaginatedQuery.emit(this.paginatedQuery);
  }

  isAllSelected(numRows: number): boolean {
    const numSelected = this.selection.selected.length;
    return numSelected === numRows;
  }

  masterToggle(data: Incident[]): void {
    this.isAllSelected(data.length) ? this.selection.clear() : data.forEach((row) => this.selection.select(row));
  }
}
