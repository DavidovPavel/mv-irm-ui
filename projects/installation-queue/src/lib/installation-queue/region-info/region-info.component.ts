import { Component, Input } from '@angular/core';
import * as _moment from 'moment';

import { Limit, Region } from '../../store/models';

const moment = _moment;

@Component({
  selector: 'irm-installation-queue-region-info',
  templateUrl: './region-info.component.html',
  styleUrls: ['./region-info.component.scss'],
})
export class RegionInfoComponent {
  @Input() region!: Region;
  getFirst(limits: Limit[]): string {
    const day = limits.find((a) => a.limit > a.reserve);
    return day ? moment(day.date).format('DD.MM.yyyy') : 'Квот нет';
  }
}
