import { Injectable } from '@angular/core';
import { ServiceCompany, ServiceCompanyStoreSelectors } from '@irm-ui/common';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';

import {
  expandServiceCenter,
  expandServiceCenterFail,
  expandServiceCenterSuccess,
  getQuotaGroups,
  getQuotaGroupsFail,
  getQuotaGroupsSuccess,
  getServiceCenters,
  getServiceCentersFail,
  getServiceCentersSuccess,
  getSettings,
  getSettingsSuccess,
  hasQuotas,
  hasQuotasFail,
  hasQuotasSuccess,
  initQuotas,
  initQuotasFail,
  initQuotasSuccess,
} from './actions';
import { InstallationQueueApiService } from './installation-queue-api.service';
import { selectInitQuotas } from './selectors';
import { State } from './state';

@Injectable()
export class InstallationQueueEffects {
  constructor(private actions$: Actions, private api: InstallationQueueApiService, private store: Store<State>) {}

  initQuotas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initQuotas),
      concatLatestFrom((a) =>
        this.store.select(ServiceCompanyStoreSelectors.select).pipe(filter((b): b is ServiceCompany => b !== null))
      ),
      exhaustMap(([a, s]) =>
        this.api.initQuotas(s.sapId).pipe(
          map(() => initQuotasSuccess()),
          catchError((error) => of(initQuotasFail(error)))
        )
      )
    )
  );

  hasQuotas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hasQuotas),
      concatLatestFrom((a) =>
        this.store.select(ServiceCompanyStoreSelectors.select).pipe(
          filter((b) => b !== null),
          concatLatestFrom(() => this.store.select(selectInitQuotas).pipe(filter((i) => i)))
        )
      ),
      exhaustMap(([a, s]) =>
        this.api.hasQuotas(s[0].sapId).pipe(
          map(() => hasQuotasSuccess()),
          catchError((error) => of(hasQuotasFail(error)))
        )
      )
    )
  );

  getQuotaGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getQuotaGroups),
      switchMap((props) =>
        this.api.getQuotaGroups(props.sapId).pipe(
          map((data) => getQuotaGroupsSuccess({ data })),
          catchError((error) => of(getQuotaGroupsFail(error)))
        )
      )
    )
  );

  getServiceCenters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getServiceCenters),
      switchMap(({ sapId, quotaGroupId }) =>
        this.api.getServiceCenters(sapId, quotaGroupId).pipe(
          map((data) => getServiceCentersSuccess({ data })),
          catchError((error) => of(getServiceCentersFail(error)))
        )
      )
    )
  );

  expandServiceCenter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(expandServiceCenter),
      exhaustMap(({ sapId, quotaGroupId, serviceCenterId }) =>
        this.api.getRegions(sapId, quotaGroupId, serviceCenterId).pipe(
          map((data) => expandServiceCenterSuccess({ data })),
          catchError((error) => of(expandServiceCenterFail(error)))
        )
      )
    )
  );

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSettings),
      switchMap(() => this.api.getSettings().pipe(map((settings) => getSettingsSuccess({ settings }))))
    )
  );
}
