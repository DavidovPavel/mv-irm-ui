import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

import { ServiceCenter } from '../../store/models';
import { IFilter } from '../service-centers/service-centers.component';

@Component({
  selector: 'irm-installation-queue-service-center-items',
  templateUrl: './service-center-items.component.html',
  styleUrls: ['./service-center-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterItemsComponent {
  @Input() sapId: string;
  @Input() quotaGroupId!: number;
  @Input() dataSource!: ServiceCenter[];

  filtered: ServiceCenter[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  @Input() set filter(flag: IFilter) {
    const { name, byQuotas } = flag;
    this.filtered = this.applyFilter(name, byQuotas);
    this.cdRef.detectChanges();
  }

  setItem(sc: ServiceCenter): ServiceCenter {
    const item = this.filtered.find((b) => b.id === sc.id);
    return item ?? sc;
  }

  applyFilter(name: string, byQuotas: 0 | 1 | 2): ServiceCenter[] {
    const ds = this.filtered.length ? this.dataSource.map((a) => this.setItem(a)) : this.dataSource;

    const resultByQuotas = ds
      ? byQuotas === 0
        ? ds
        : byQuotas === 1
        ? ds.filter((a) => a.hasQuotas)
        : ds.filter((a) => !a.hasQuotas)
      : [];
    return resultByQuotas.filter((a) => a.name.toLowerCase().includes(name.toLowerCase()));
  }
}
