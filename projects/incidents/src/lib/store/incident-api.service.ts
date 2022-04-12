import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@irm-ui/common';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseItem } from '../models/base-item';
import { ErrorMessage } from '../models/error-message';
import { Incident } from '../models/incident';
import { ParamRequest } from '../models/param-request';
import { SearchResult } from '../models/search-result';
import { City, ServiceCenter, ServiceCompany } from '../models/service-center';
import { Shop } from '../models/shop';
import { StatusSource } from '../models/status-source';
import { UpdateIncident } from '../models/update-incident';
import { UpdateStatusOrComment } from '../models/update-status-comment';
import { CheckResult } from './../models/check-result';
import { IncidentRequestCreateModel } from './../models/incident-request';

@Injectable({
  providedIn: 'root',
})
export class IncidentApiService {
  private apiUrl = 'Incidents/api';

  constructor(private api: ApiService) {}

  getStatus(): Observable<StatusSource> {
    return this.api.get(`${this.apiUrl}/IncidentRequest/total`);
  }

  getShops(data: ParamRequest): Observable<SearchResult<Shop>> {
    return this.api.get(`${this.apiUrl}/Shop/search`, new HttpParams({ fromObject: data }));
  }

  getCities(data: ParamRequest): Observable<SearchResult<City>> {
    return this.api.get(`${this.apiUrl}/City/search`, new HttpParams({ fromObject: data }));
  }

  getServiceCenters(data: ParamRequest): Observable<SearchResult<ServiceCenter>> {
    return this.api.get(`${this.apiUrl}/ServiceCenter/search`, new HttpParams({ fromObject: data }));
  }

  getServiceCompanies(data: ParamRequest): Observable<SearchResult<ServiceCompany>> {
    return this.api.get(`${this.apiUrl}/ServiceCompany/search`, new HttpParams({ fromObject: data }));
  }

  getShop(id: number): Observable<Shop> {
    const data = { id: id.toString() };
    return this.api.get(`${this.apiUrl}/Shop`, new HttpParams({ fromObject: data }));
  }

  getCity(id: number): Observable<City> {
    const data = { id: id.toString() };
    return this.api.get(`${this.apiUrl}/City`, new HttpParams({ fromObject: data }));
  }

  getServiceCenter(id: number): Observable<ServiceCenter> {
    const data = { id: id.toString() };
    return this.api.get(`${this.apiUrl}/ServiceCenter`, new HttpParams({ fromObject: data }));
  }

  getServiceCompany(id: number): Observable<ServiceCompany> {
    const data = { id: id.toString() };
    return this.api.get(`${this.apiUrl}/ServiceCompany`, new HttpParams({ fromObject: data }));
  }

  searchIncident(data: ParamRequest): Observable<SearchResult<Incident>> {
    return this.api.get(`${this.apiUrl}/IncidentRequest/search`, new HttpParams({ fromObject: data }));
  }

  complicatedSearchIncident(search: string): Observable<SearchResult<Incident>> {
    const data = { search };
    return this.api.get(`${this.apiUrl}/IncidentRequest/search2`, new HttpParams({ fromObject: data }));
  }

  downloadToExcel(data: ParamRequest): Observable<never> {
    const param = new HttpParams({ fromObject: data });
    window.open(`${this.apiUrl}/IncidentRequest/excel?${param.toString()}`);
    return EMPTY;
  }

  downloadFile(id: number): Observable<never> {
    window.open(`${this.apiUrl}/FileStore/Download?id=${id}`);
    return EMPTY;
  }

  getIncidentRequest(id: number): Observable<Incident> {
    return this.api.get(`${this.apiUrl}/IncidentRequest/?id=${id}`);
  }

  updateIncidentRequestStatus(data: UpdateStatusOrComment): Observable<Incident> {
    const output = new FormData();
    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  updateIncidentRequest(data: UpdateIncident): Observable<Incident> {
    const output = new FormData();
    data.requestFiles.forEach((e) => output.append('requestFiles', e));
    data.commentFiles.forEach((e) => output.append('commentFiles', e));

    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  addToServiceCenterFileStores(source: { id: number; items: File[] }): Observable<Incident> {
    const output = new FormData();
    source.items.forEach((e) => output.append('commentFiles', e));

    const data = {
      id: source.id,
    };

    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  removeFromServiceCenterFileStores(source: { id: number; filesToDelete: number[] }): Observable<Incident> {
    const output = new FormData();
    const { id, filesToDelete } = source;

    const data = {
      id,
      filesToDelete,
    };

    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  checkNumInCRM(data: { numberZNU: string; incidentNumber: string }): Observable<CheckResult> {
    return this.api.get(`${this.apiUrl}/IncidentNumberStatus`, new HttpParams({ fromObject: data }));
  }

  createRequest(data: IncidentRequestCreateModel): Observable<ErrorMessage> {
    const output = new FormData();
    data.requestFiles.forEach((e) => output.append('requestFiles', e));
    output.append('data', JSON.stringify(data.request));
    return this.api.post(`${this.apiUrl}/IncidentRequest`, output);
  }

  getPermissions(id: number): Observable<string[]> {
    return this.api
      .get<{ permissions: string[] }>(`${this.apiUrl}/Permissions?incidentRequestId=${id}`)
      .pipe(map((data: { permissions: string[] }) => data.permissions));
  }

  getCreateReason(): Observable<BaseItem[]> {
    return this.api
      .get<SearchResult<BaseItem>>(`${this.apiUrl}/IncidentCreationReason/search`)
      .pipe(map((a) => a.data));
  }
}
