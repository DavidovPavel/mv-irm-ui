import { Component, OnInit } from '@angular/core';
import { ServiceCompanyStoreSelectors } from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { getQuotaGroups, initQuotas } from '../store/actions';
import { QuotaGroup, QuotaGroups } from '../store/models';
import { selectInitQuotas, selectLoadProcess, selectQuotaGroups } from '../store/selectors';
import { State } from '../store/state';

@Component({
  selector: 'irm-installation-queue-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class InstallationQueueWidgetComponent implements OnInit {
  hasQuotas$: Observable<boolean>;
  quotaGroups$: Observable<QuotaGroups>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    const serviceCompany$ = this.store.select(ServiceCompanyStoreSelectors.select).pipe(filter((c) => c !== null));
    const initQuotas$ = this.store.select(selectInitQuotas).pipe(filter((q) => q));

    const dispatchInitQuotas$ = serviceCompany$.pipe(
      tap(() => this.store.dispatch(initQuotas())),
      switchMap(() => initQuotas$)
    );

    const load$ = this.store.select(selectLoadProcess);
    const selectQuotaGroups$ = this.store.select(selectQuotaGroups);
    const dispatchQuotaGroups$ = this.store.select(ServiceCompanyStoreSelectors.selectSapId).pipe(
      filter((x) => !!x),
      tap((sapId) => this.store.dispatch(getQuotaGroups({ sapId })))
    );

    this.quotaGroups$ = combineLatest([
      dispatchInitQuotas$,
      dispatchQuotaGroups$,
      load$.pipe(
        filter((a) => !a),
        switchMap(() => selectQuotaGroups$)
      ),
    ]).pipe(
      filter((a) => a[0] && !!a[2]),
      map((a) => ({
        ...a[2],
        quotaGroups: this.sortItem(a[2]),
      }))
    );
  }

  sortItem(group: QuotaGroups): QuotaGroup[] {
    return group.quotaGroups.sort((b, c) => (b.name < c.name ? -1 : b.name > c.name ? 1 : 0));
  }
}
