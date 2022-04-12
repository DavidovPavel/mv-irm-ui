import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceCompanyStoreSelectors } from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { getQuotaGroups, getServiceCenters, getSettings } from '../store/actions';
import { QuotaGroup, QuotaGroups, ServiceCenter, ServiceCenters } from '../store/models';
import { selectLoadProcess, selectQuotaGroups, selectServiceCenters } from '../store/selectors';
import { State } from '../store/state';

@Component({
  selector: 'irm-installation-queue',
  templateUrl: './installation-queue.component.html',
  styleUrls: ['./installation-queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationQueueComponent implements OnInit {
  quotaGroups$: Observable<QuotaGroups>;
  serviceCenters$: Observable<ServiceCenters>;

  sapId: string;
  quotaGroupId: number;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(getSettings());

    const load$ = this.store.select(selectLoadProcess);
    const selectQuotaGroups$ = this.store.select(selectQuotaGroups);

    const dispatchQuotaGroups$ = this.store.select(ServiceCompanyStoreSelectors.selectSapId).pipe(
      filter((x) => !!x),
      tap((sapId) => {
        this.sapId = sapId;
        this.store.dispatch(getQuotaGroups({ sapId }));
      })
    );

    this.quotaGroups$ = combineLatest([
      dispatchQuotaGroups$,
      load$.pipe(
        filter((a) => !a),
        switchMap(() => selectQuotaGroups$)
      ),
    ]).pipe(
      filter((a) => !!a[1]),
      map((a) => ({ ...a[1], quotaGroups: this.sortItem<QuotaGroup>([...a[1].quotaGroups]) }))
    );
  }

  showServiceCenters(quotaGroupId: number): void {
    this.quotaGroupId = quotaGroupId;
    const sapId = this.sapId;
    const load$ = this.store.select(selectLoadProcess);
    const selectServiceCenters$ = this.store.select(selectServiceCenters).pipe(filter((a) => a !== null));

    this.store.dispatch(getServiceCenters({ sapId, quotaGroupId }));

    this.serviceCenters$ = load$.pipe(
      filter((a) => !a),
      switchMap(() => selectServiceCenters$),
      map((a) => ({ ...a, serviceCenters: this.sortItem<ServiceCenter>([...a.serviceCenters]) }))
    );
  }

  sortItem<T extends { name: string }>(o: T[]): T[] {
    return o.map((a) => ({ ...a, isExpand: false })).sort((b, c) => (b.name < c.name ? -1 : b.name > c.name ? 1 : 0));
  }
}
