import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from './actions';
import { IncidentApiService } from './incident-api.service';

@Injectable()
export class IncidentStoreEffects {
  constructor(private actions$: Actions, private api: IncidentApiService) {}

  checkNumInCRM = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkNumInCRM),
      switchMap((props) =>
        this.api.checkNumInCRM(props.data).pipe(map((message) => actions.checkNumInCRMSuccess({ message })))
      )
    )
  );

  createRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createRequest),
      switchMap((props) =>
        this.api.createRequest(props.data).pipe(
          map((message) => actions.createRequestSuccess({ message })),
          catchError((error) => of(actions.createRequestFail(error)))
        )
      )
    )
  );

  getStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getStatus),
      switchMap((_) => this.api.getStatus().pipe(map((data) => actions.getStatusSuccess({ data }))))
    )
  );

  getShops = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getShops),
      switchMap((p) => this.api.getShops(p.data).pipe(map((data) => actions.getShopsSuccess({ data }))))
    )
  );

  getCities = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getCities),
      switchMap((p) => this.api.getCities(p.data).pipe(map((data) => actions.getCitiesSuccess({ data }))))
    )
  );

  getServiceCenters = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getServiceCenters),
      switchMap((p) =>
        this.api.getServiceCenters(p.data).pipe(map((data) => actions.getServiceCentersSuccess({ data })))
      )
    )
  );

  getServiceCompanies = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getServiceCompanies),
      switchMap((p) =>
        this.api.getServiceCompanies(p.data).pipe(map((data) => actions.getServiceCompaniesSuccess({ data })))
      )
    )
  );

  getShop = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getShop),
      switchMap((p) => this.api.getShop(p.id).pipe(map((data) => actions.getShopSuccess({ data }))))
    )
  );

  getCitie = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getCity),
      switchMap((p) => this.api.getCity(p.id).pipe(map((data) => actions.getCitySuccess({ data }))))
    )
  );

  getServiceCenter = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getServiceCenter),
      switchMap((p) => this.api.getServiceCenter(p.id).pipe(map((data) => actions.getServiceCenterSuccess({ data }))))
    )
  );

  getServiceCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getServiceCompany),
      switchMap((p) => this.api.getServiceCompany(p.id).pipe(map((data) => actions.getServiceCompanySuccess({ data }))))
    )
  );

  searchResult = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchIncident),
      switchMap((props) =>
        this.api.searchIncident(props.data).pipe(
          map((data) => actions.searchIncidentSuccess({ data })),
          catchError((error) => of(actions.searchIncidentFail(error)))
        )
      )
    )
  );

  complicatedSearch = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.complicatedSearch),
      switchMap((props) =>
        this.api.complicatedSearchIncident(props.text).pipe(
          map((data) => actions.searchIncidentSuccess({ data })),
          catchError((error) => of(actions.searchIncidentFail(error)))
        )
      )
    )
  );

  updateIncident = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateIncident),
      switchMap((props) =>
        this.api.updateIncidentRequest(props.data).pipe(
          map((_) => actions.getIncidentRequest({ id: props.data.id })),
          catchError((error) => of(actions.updateIncidentFail(error)))
        )
      )
    )
  );

  addToServiceCenterFileStores = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addToServiceCenterFileStores),
      switchMap((props) =>
        this.api
          .addToServiceCenterFileStores(props.data)
          .pipe(map(() => actions.getIncidentRequest({ id: props.data.id })))
      )
    )
  );

  removeFromServiceCenterFileStores = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeFromServiceCenterFileStores),
      switchMap((props) =>
        this.api
          .removeFromServiceCenterFileStores(props.data)
          .pipe(map(() => actions.getIncidentRequest({ id: props.data.id })))
      )
    )
  );

  updateRequestStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateRequestStatus),
      switchMap((props) =>
        this.api
          .updateIncidentRequestStatus(props.data)
          .pipe(map((_) => actions.getIncidentRequest({ id: props.data.id })))
      )
    )
  );

  downloadToExcel = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.downloadToExcel),
      switchMap((p) => this.api.downloadToExcel(p.data).pipe(map((_) => actions.downloadToExcelSuccess())))
    )
  );

  downLoadFile = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.downloadFile),
      switchMap((p) => this.api.downloadFile(p.id).pipe(map((_) => actions.downloadFileSuccess())))
    )
  );

  getIncidentRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getIncidentRequest),
      switchMap((props) =>
        this.api.getIncidentRequest(props.id).pipe(
          map((data) => actions.getIncidentSuccess({ data })),
          catchError((error) => of(actions.getIncidentFail(error)))
        )
      )
    )
  );

  getPermissions = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getPermissions),
      switchMap((props) =>
        this.api.getPermissions(props.id).pipe(
          map((data) => actions.getPermissionsSuccess({ data })),
          catchError((error) => of(actions.getPermissionsFail({ error })))
        )
      )
    )
  );

  getCreateReason = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getCreateReason),
      switchMap(() => this.api.getCreateReason().pipe(map((data) => actions.getCreateReasonSuccess({ data }))))
    )
  );
}
