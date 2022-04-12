import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { concatAll, filter, map, pluck, tap } from 'rxjs/operators';

import { BaseItem } from '../models/base-item';
import { ParamRequest } from '../models/param-request';
import { IncidentsStoreActions, IncidentsStoreSelectors } from '../store';
import { State } from '../store/state';
import { SearchResult } from './../models/search-result';

@Injectable()
export class InfinityScrollService {
  totalSize = 0;

  dispatchMapForOne = new Map<string, any>([
    ['serviceCenterId', IncidentsStoreActions.getServiceCenter],
    ['serviceCompanyId', IncidentsStoreActions.getServiceCompany],
    ['cityId', IncidentsStoreActions.getCity],
    ['shopId', IncidentsStoreActions.getShop],
  ]);

  selectMapForOne = new Map<string, any>([
    ['serviceCenterId', IncidentsStoreSelectors.selectServiceCenter],
    ['serviceCompanyId', IncidentsStoreSelectors.selectServiceCompany],
    ['cityId', IncidentsStoreSelectors.selectCity],
    ['shopId', IncidentsStoreSelectors.selectShop],
  ]);

  dispatchMap = new Map<string, any>([
    ['serviceCenterId', IncidentsStoreActions.getServiceCenters],
    ['serviceCompanyId', IncidentsStoreActions.getServiceCompanies],
    ['cityId', IncidentsStoreActions.getCities],
    ['shopId', IncidentsStoreActions.getShops],
  ]);

  selectMap = new Map<string, any>([
    ['serviceCenterId', IncidentsStoreSelectors.selectServiceCenters],
    ['serviceCompanyId', IncidentsStoreSelectors.selectServiceCompanies],
    ['cityId', IncidentsStoreSelectors.selectCities],
    ['shopId', IncidentsStoreSelectors.selectShops],
    ['salesChannel', IncidentsStoreSelectors.selectSalesChannel],
    ['brand', IncidentsStoreSelectors.selectBrand],
    ['blameServiceCenterType', IncidentsStoreSelectors.selectBlameServiceCenter],
  ]);

  constructor(private store: Store<State>) {}

  dispatchSelectSource(name: string, data: ParamRequest): void {
    const dispatch = this.dispatchMap.get(name);
    if (dispatch) {
      this.store.dispatch(dispatch({ data }));
    }
  }

  getSource(name: string): Observable<BaseItem[]> {
    return this.store.select(this.selectMap.get(name)).pipe(
      filter((a) => a !== null),
      map((a) => a as SearchResult<BaseItem>),
      tap((a) => (this.totalSize = a.totalSize)),
      pluck('data')
    );
  }

  getOneById(id: number, name: string): void {
    const dispatch = this.dispatchMapForOne.get(name);
    if (dispatch) {
      this.store.dispatch(dispatch({ id }));
    }
  }

  selectOne(name: string, id: number): Observable<BaseItem> {
    const select = this.selectMapForOne.get(name);
    return select
      ? this.store.select(select)
      : this.getSource(name).pipe(
          concatAll(),
          filter((a) => a.id === id)
        );
  }
}
