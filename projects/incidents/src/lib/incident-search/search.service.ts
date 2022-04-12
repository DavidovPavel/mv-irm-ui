import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormFieldModel, Profile, ProfileStoreSelectors } from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { clearEmpty } from '../core/func';
import { Incident } from '../models/incident';
import { ParamRequest } from '../models/param-request';
import { PaginatedQuery, SearchResult } from '../models/search-result';
import { IncidentsStoreActions, IncidentsStoreSelectors } from '../store';
import { State } from '../store/state';
import { fields } from './filter/filter-fields';

const moment = _moment;

export const SHOP_PARAM = 'shopId';
export const FLAG_SHOP_PARAM = 'clearedShopId';

@Injectable()
export class SearchService {
  fields: { [key: string]: FormFieldModel<Incident>[] } = fields;

  constructor(public store: Store<State>, public router: Router, public route: ActivatedRoute) {}

  getProfile(): Observable<string | null> {
    return this.store.select<Profile>(ProfileStoreSelectors.select).pipe(
      filter((a): a is Profile => a !== null),
      map((profile) => {
        const name = profile.shopNumber;
        if (name) {
          this.store.dispatch(IncidentsStoreActions.getShops({ data: { name } }));
        }
        return name;
      })
    );
  }

  isProfileAsStore(): Observable<number> {
    return this.store.select(IncidentsStoreSelectors.selectShops).pipe(
      filter((result) => result?.data.length === 1),
      map((result) => result?.data[0].id as number),
      filter((a) => !!a)
    );
  }

  routeParams(): Observable<Params> {
    return this.route.params.pipe(delay(100));
  }

  formChanges(form: FormGroup): Observable<any> {
    return form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((a) => clearEmpty(this.dateFormat(a), {})),
      tap((a) => this.router.navigate(['./', a]))
    );
  }

  findField(name: string): FormFieldModel<Incident> {
    return Object.keys(this.fields)
      .filter((a) => this.fields[a].some((b) => b.name === name))
      .map((a) => this.fields[a].find((b) => b.name === name))
      .map((a) => a as FormFieldModel<Incident>)[0];
  }

  setParamsForRouting(value: any): void {
    this.router.navigate(['./', this.dateFormat(clearEmpty(value, {}))], { relativeTo: this.route });
  }

  load(value: any, paginatedQuery: PaginatedQuery): void {
    const data = clearEmpty<ParamRequest>(value, this.toPaginationParam(paginatedQuery));
    this.store.dispatch(IncidentsStoreActions.searchIncident({ data }));
  }

  excel(value: any, paginatedQuery: PaginatedQuery): void {
    const data = clearEmpty<ParamRequest>(value, this.toPaginationParam(paginatedQuery));
    this.store.dispatch(IncidentsStoreActions.downloadToExcel({ data }));
  }

  search(text: string): void {
    this.store.dispatch(IncidentsStoreActions.complicatedSearch({ text }));
  }

  toPaginationParam(data: PaginatedQuery): { [key: string]: string } {
    return {
      'pagination.pageIndex': `${data.pageIndex}`,
      'pagination.pageSize': `${data.pageSize}`,
    };
  }

  result(): Observable<SearchResult<Incident>> {
    return this.store.select(IncidentsStoreSelectors.selectSearchResult).pipe(
      filter((a) => !!a),
      map((a) => a as SearchResult<Incident>)
    );
  }

  dateFormat(param: { [key: string]: string | number | Moment }): { [key: string]: string } {
    return Object.keys(param).reduce(
      (p, c) =>
        param[c] instanceof moment ? { ...p, [c]: (param[c] as Moment).toISOString() } : { ...p, [c]: param[c] },
      {}
    );
  }
}
