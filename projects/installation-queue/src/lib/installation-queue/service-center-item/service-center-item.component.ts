import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { expandServiceCenter } from '../../store/actions';
import { Regions, ServiceCenter } from '../../store/models';
import { selectLoadProcess, selectServiceCenterRegions } from '../../store/selectors';
import { State } from '../../store/state';

@Component({
  selector: 'irm-installation-queue-service-center-item',
  templateUrl: './service-center-item.component.html',
  styleUrls: ['./service-center-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterItemComponent {
  serviceCenterRegions$: Observable<Regions>;

  @Input() item!: ServiceCenter;
  @Input() quotaGroupId!: number;
  @Input() sapId: string;

  constructor(private store: Store<State>) {}

  expand(): void {
    this.item.isExpand = !this.item.isExpand;
    if (!this.item.regions) {
      const sapId = this.sapId;
      const quotaGroupId = this.quotaGroupId;
      const serviceCenterId = this.item.id;

      const load$ = this.store.select(selectLoadProcess);
      const selecServiceCentterRegions$ = this.store.select(selectServiceCenterRegions).pipe(filter((a) => a !== null));

      this.store.dispatch(expandServiceCenter({ sapId, quotaGroupId, serviceCenterId }));

      this.serviceCenterRegions$ = load$.pipe(
        filter((a) => !a),
        switchMap(() => selecServiceCentterRegions$),
        take(1),
        tap((a) => (this.item.regions = a))
      );
    }
  }
}
