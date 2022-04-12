import { Host, Pipe, PipeTransform, TemplateRef } from '@angular/core';

import { IrmGridComponent } from './irm-grid.component';
import { GridTemplate } from './models';

@Pipe({
  name: 'template',
})
export class TemplatePipe implements PipeTransform {
  constructor(@Host() private view: IrmGridComponent) {}

  transform(propName: string, option?: 'header' | 'cell'): TemplateRef<GridTemplate> {
    if (this.view.columnTemplates.length && option !== 'header') {
      const item = this.view.columnTemplates.find((a) => a.name === propName);
      return item?.template || null;
    }
    return null;
  }
}
