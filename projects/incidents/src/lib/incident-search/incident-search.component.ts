import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Params } from '@angular/router';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, mergeAll, switchMap, tap } from 'rxjs/operators';

import { IncidentExtendedFilterComponent } from './extended-filter/extended-filter.component';
import { FilterComponent } from './filter/filter.component';
import { FLAG_SHOP_PARAM, SearchService, SHOP_PARAM } from './search.service';

@Component({
  selector: 'irm-incident-search',
  templateUrl: './incident-search.component.html',
  styleUrls: ['./incident-search.component.scss'],
  providers: [SearchService],
})
export class IncidentSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'page-container';

  showExpanded = false;

  form = this.fb.group({
    incidentNumber: '',
    incidentRequestStatusType: '',
    serviceCenterId: '',
    salesChannel: '',
    serviceCompanyId: '',
    cityId: '',
    shopId: '',
    brand: '',
    blameServiceCenterType: '',
    'creationDateRange.from': '',
    'creationDateRange.to': '',
    'closeDateRange.from': '',
    'closeDateRange.to': '',
  });

  reactiveFields = ['incidentNumber', 'incidentRequestStatusType', 'serviceCenterId'];
  reactiveSubscription!: Subscription;
  isShop!: Subscription;

  formChanges$!: Observable<any>;
  params$!: Observable<Params>;

  paginatedQuery = { pageIndex: 0, pageSize: 10 };
  result$ = this.service.result();

  isStore$ = this.service.isProfileAsStore().pipe(
    tap((shopId) => {
      if (!this.checkOnClosed(shopId)) {
        const params = this.service.route.snapshot.params;
        const exist = params[SHOP_PARAM];
        if (shopId && !exist) {
          this.form.get(SHOP_PARAM)?.setValue(shopId);
          localStorage.setItem(SHOP_PARAM, shopId.toString());
          localStorage.setItem(FLAG_SHOP_PARAM, '');
          this.load();
        }
      }
    })
  );

  @ViewChild(IncidentExtendedFilterComponent) extend!: IncidentExtendedFilterComponent;
  @ViewChild(FilterComponent) filter!: FilterComponent;

  constructor(private service: SearchService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const params = this.service.route.snapshot.params;
    this.fillForm(params);
  }

  checkOnClosed(shopId: number): boolean {
    const item = localStorage.getItem(FLAG_SHOP_PARAM);
    return item === `${shopId}`;
  }

  fillForm(param: Params): void {
    Object.keys(param).forEach((key) => {
      this.form.controls[key].setValue(
        key === 'incidentRequestStatusType'
          ? param[key].split(',').map((a: string) => +a)
          : isNaN(Number(param[key]))
          ? param[key]
          : +param[key]
      );
      const field = this.service.findField(key);
      if (field) {
        field.value = param[key];
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.extend && this.filter) {
      this.filter.dropdownLists = this.extend.dropdownLists;
      this.formChanges$ = this.service.formChanges(this.form);
      this.params$ = this.service.routeParams();
      this.load();
      this.setReactiveField();

      this.isShop = this.service
        .getProfile()
        .pipe(
          tap((shopName) => {
            if (shopName) {
              const cn = this.extend.dropdownLists.find((a) => a.controlName === SHOP_PARAM);
              if (cn) {
                cn.startValue = shopName;
              }
            }
          }),
          switchMap((shopName) => (shopName ? this.isStore$ : EMPTY))
        )
        .subscribe(() => (this.params$ = this.service.routeParams()));
    }
  }

  setReactiveField(): void {
    const arr = this.reactiveFields.map((key) => this.form.controls[key].valueChanges);
    this.reactiveSubscription = merge(arr)
      .pipe(mergeAll(), debounceTime(300))
      .subscribe(() => this.load());
  }

  ngOnDestroy(): void {
    this.reactiveSubscription.unsubscribe();
    this.isShop.unsubscribe();
  }

  setPaginatedQuery(value: { pageIndex: number; pageSize: number }): void {
    this.paginatedQuery = value;
    this.load();
  }

  apply(): void {
    this.showExpanded = false;
    this.load();
  }

  load(): void {
    this.service.load(this.form.value, this.paginatedQuery);
  }

  excel(): void {
    this.service.excel(this.form.value, this.paginatedQuery);
  }

  search(text: string): void {
    this.service.search(text);
  }
}
