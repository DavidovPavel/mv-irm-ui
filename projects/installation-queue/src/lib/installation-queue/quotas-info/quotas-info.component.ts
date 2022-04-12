import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Region } from '../../store/models';

@Component({
  selector: 'irm-quotas-info',
  templateUrl: './quotas-info.component.html',
  styleUrls: ['./quotas-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotasInfoComponent {
  @Input() regions!: Region[];
}
