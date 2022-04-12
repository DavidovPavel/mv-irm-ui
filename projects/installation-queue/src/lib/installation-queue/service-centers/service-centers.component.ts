import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServiceCenters } from '../../store/models';

export interface IFilter {
  name: string;
  byQuotas: 0 | 1 | 2;
}

@Component({
  selector: 'irm-installation-queue-service-centers',
  templateUrl: './service-centers.component.html',
  styleUrls: ['./service-centers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCentersComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataSource!: ServiceCenters;
  @Input() quotaGroupId!: number;
  @Input() sapId: string;

  nameControl = new FormControl();
  filterSubscribtion: Subscription;
  filter: IFilter = { name: '', byQuotas: 0 };

  constructor() {}

  filtering(byQuotas: 0 | 1 | 2): void {
    this.filter = { ...this.filter, byQuotas };
  }

  ngOnInit(): void {
    this.filterSubscribtion = this.nameControl.valueChanges.subscribe((name: string) => {
      this.filter = { ...this.filter, name };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dataSource, sapId, quotaGroupId } = changes;
    if (dataSource && sapId && quotaGroupId) {
      this.filter = { name: '', byQuotas: 0 };
      this.dataSource = dataSource.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.filterSubscribtion?.unsubscribe();
  }
}
