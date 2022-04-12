import { Component, OnInit } from '@angular/core';
import { ServiceCompanyStoreSelectors } from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { hasQuotas, initQuotas } from '../../store/actions';
import { selectHasQuotas, selectInitQuotas } from '../../store/selectors';
import { State } from '../../store/state';

@Component({
  selector: 'irm-installation-queue-quota-group-info-widget',
  templateUrl: './quota-group-info-widget.component.html',
  styleUrls: ['./quota-group-info-widget.component.scss'],
})
export class QuotaGroupInfoWidgetComponent implements OnInit {
  hasQuotas$!: Observable<boolean>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    const scompany$ = this.store.select(ServiceCompanyStoreSelectors.select).pipe(filter((c) => c !== null));
    const initQuotas$ = this.store.select(selectInitQuotas).pipe(filter((q) => q));
    const hasQuotas$ = this.store.select(selectHasQuotas).pipe(filter((x) => x !== null));

    this.hasQuotas$ = scompany$.pipe(
      tap(() => this.store.dispatch(initQuotas())),
      switchMap(() =>
        initQuotas$.pipe(
          tap(() => this.store.dispatch(hasQuotas())),
          switchMap(() => hasQuotas$)
        )
      )
    );
  }
}
