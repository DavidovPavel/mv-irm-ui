import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { BaseItem } from '../models/base-item';
import { CheckResult } from '../models/check-result';
import { ErrorMessage } from '../models/error-message';
import { IncidentRequestCreateModel } from '../models/incident-request';
import { IncidentsStoreActions, IncidentsStoreSelectors } from '../store';
import { State } from '../store/state';

/*
Тестовые данные для CRM М.видео:
инцидент = 21-00002267  ЗНУ = S212002230521
инцидент = 20-00011498  ЗНУ = S00215232295931
21-00033523 зну S212002230522
21-00032909 зну S00215232295932

Или Эльдорадо, там проще, не надо ЗНУ подбирать
5662452, 5662294
*/

const ErrorMessageData: { [key: string]: string } = {
  serviceCenterId: 'Сервисный центр не найден',
  shopId: 'Магазин не найден',
  brand: 'Бренд не найден',
};

@Component({
  selector: 'irm-incident-request',
  templateUrl: './incident-request.component.html',
  styleUrls: ['./incident-request.component.scss'],
})
export class IncidentRequestComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'page-container';

  reasonType$ = this.store.select(IncidentsStoreSelectors.selectCreationReason).pipe(
    filter((a): a is BaseItem[] => a !== null),
    map((a) => a.slice().sort((b, c) => (b.name < c.name ? -1 : b.name > c.name ? 1 : 0)))
  );

  subscription!: Subscription;

  checkResult$!: Observable<CheckResult | null>;
  createResult$!: Observable<ErrorMessage | null>;
  checkSuccess = false;

  form = this.fb.group({
    numberZNU: ['', Validators.required],
    shopName: ['', Validators.required],
    serviceCenterName: ['', Validators.required],
    incidentNumber: ['', Validators.required],
    clientName: ['', Validators.required],
    clientPhone: ['', Validators.required],
    problemEssence: ['', Validators.required],
    responsibleEmployeeMail: ['', [Validators.required, Validators.email]],
    incidentCreationReasonId: [null, Validators.required],
    expectedSolution: ['', Validators.required],
    shopId: ['', Validators.required],
    serviceCenterId: ['', Validators.required],
    brand: ['', Validators.required],
    serviceName: ['', Validators.required],
    returnUrl: [{ value: '', disabled: true }],
    appealType: 0,
    internetOrderNumber: '',
    tsOrderNumber: '',
  });

  reserveControl = this.fb.array([]);
  disabled = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit(): void {
    this.getIdByName4ShopServicecenterAndFill(this.fillFormFields());
  }

  fillFormFields(): { shopName: string | null; serviceCenterName: string | null } {
    const params = this.route.snapshot.queryParamMap;
    params.keys
      .map<[AbstractControl | null, string | null]>((key) => [this.form.get(key), params.get(key)])
      .filter((a): a is [AbstractControl, string | null] => a[0] !== null)
      .forEach((a) => a[0].setValue(a[1] && a[1] !== 'null' ? a[1] : ''));

    return { shopName: params.get('shopName'), serviceCenterName: params.get('serviceCenterName') };
  }

  getIdByName4ShopServicecenterAndFill(data: { shopName: string | null; serviceCenterName: string | null }): void {
    const { shopName, serviceCenterName } = data;
    if (shopName && serviceCenterName) {
      this.store.dispatch(
        IncidentsStoreActions.getServiceCenters({
          data: { name: serviceCenterName, 'pagination.pageIndex': '0', 'pagination.pageSize': '1000' },
        })
      );
      this.store.dispatch(
        IncidentsStoreActions.getShops({
          data: { name: shopName, 'pagination.pageIndex': '0', 'pagination.pageSize': '1000' },
        })
      );

      const sc$ = this.store.select(IncidentsStoreSelectors.selectServiceCenters);
      const shop$ = this.store.select(IncidentsStoreSelectors.selectShops);

      this.subscription = combineLatest([sc$, shop$])
        .pipe(filter((a) => a[0] !== null && a[1] !== null))
        .subscribe((a) => {
          this.form.get('serviceCenterId')?.setValue(a[0]?.data.find((b) => b.name === serviceCenterName)?.id);
          this.form.get('shopId')?.setValue(a[1]?.data[0]?.id);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  check(): void {
    const { incidentNumber, numberZNU } = this.form.value;
    if (incidentNumber && numberZNU) {
      this.store.dispatch(IncidentsStoreActions.checkNumInCRM({ data: { numberZNU, incidentNumber } }));
      this.checkResult$ = this.store.select(IncidentsStoreSelectors.selectCheckResult).pipe(
        filter((a): a is CheckResult => a !== null),
        tap((result) => {
          this.checkSuccess = !!result.brand;
          this.form.get('brand')?.setValue(result.brand);
        })
      );
    } else {
      this.form.updateValueAndValidity();
      this.form.markAllAsTouched();
    }
    this.store.dispatch(IncidentsStoreActions.getCreateReason());
  }

  save(): void {
    if (this.form.valid) {
      this.checkSuccess = false;
      const data: IncidentRequestCreateModel = {
        request: {
          ...this.form.value,
          appealType: +this.form.value.appealType,
          incidentCreationReasonType: +this.form.value.incidentCreationReasonType,
        },
        requestFiles: this.reserveControl.value,
      };
      this.store.dispatch(IncidentsStoreActions.createRequest({ data }));
      this.createResult$ = this.store.select(IncidentsStoreSelectors.selectCreateResult).pipe(
        filter((a): a is ErrorMessage => a !== null),
        map((a) => {
          let b = a;
          if (a.errCode === '--') {
            const m = a.errMessage as any;
            const errMessage = m.messages?.join('; ') || m.errors?.validations?.join('; ') || JSON.stringify(m);
            b = { errCode: '--', errMessage };
          } else {
            window.location.href = this.form.get('returnUrl')?.value;
          }
          return b;
        }),
        tap(() => this.checkSuccess = true)
      );
    } else {
      this.form.updateValueAndValidity();
      this.form.markAllAsTouched();

      const errMessage = Object.keys(this.form.controls)
        .map((key) => (this.form.controls[key].invalid ? ErrorMessageData[key] : ''))
        .filter((a) => a)
        .join('; ');

      this.createResult$ = of({ errCode: '--', errMessage });
    }
  }

  back(): void {
    window.history.back();
  }
}
