import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Region } from '../../store/models';
import { selectSettings } from '../../store/selectors';

import { State } from '../../store/state';

@Component({
  selector: 'irm-quotas',
  templateUrl: './quotas.component.html',
  styleUrls: ['./quotas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotasComponent implements OnInit {
  @Input() regions: Region[];

  days$!: Observable<string[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    const now = new Date();
    this.days$ = this.store.select(selectSettings).pipe(
      filter((a) => a !== null),
      switchMap((x) =>
        of(
          Array(x.numberOfDaysWithDateTo)
            .fill(0)
            .map((_, i) =>
              new Date(now.getFullYear(), now.getMonth(), now.getDate() + i + x.numberOfDaysWithDateFrom).toISOString()
            )
        )
      )
    );
  }
}
