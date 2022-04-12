import { Component, Input, OnInit } from '@angular/core';
import * as _moment from 'moment';

import { Limit } from '../../store/models';

const moment = _moment;

@Component({
  selector: 'irm-installation-queue-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
})
export class RegionComponent implements OnInit {
  @Input() day!: string;
  @Input() limits!: Limit[];

  limit: Limit;

  ngOnInit(): void {
    this.limit = this.limits.find((a) => moment(a.date).isSame(this.day)) ?? {
      limit: 0,
      reserve: 0,
      date: '',
      id: null,
    };
  }
}
