import { Host, Pipe, PipeTransform } from '@angular/core';

import { IrmGridComponent } from './irm-grid.component';
import { GridConfigOption, GridConfigOptionsKeys } from './models';

@Pipe({
  name: 'extract',
})
export class ExtractPipe implements PipeTransform {
  constructor(@Host() private view: IrmGridComponent) {}

  transform(value: string, option: GridConfigOptionsKeys): null | string {
    const config = this.view.gridConfig[value];
    if (typeof config === 'string') {
      return option === GridConfigOption.header ? config : null;
    } else if (config && option in config) {
      const data = config[option];
      return data as string;
    }

    return null;
  }
}
