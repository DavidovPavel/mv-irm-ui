import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

import { GridConfig, GridConfigOption } from './models';
import { NgTemplateNameDirective } from './ng-template-name.directive';
import { RowClassByPropertyDirective } from './options/row-class-by-property.directive';

@Component({
  selector: 'irm-grid',
  templateUrl: './irm-grid.component.html',
  styleUrls: ['./irm-grid.component.scss'],
})
export class IrmGridComponent implements OnInit {
  options = GridConfigOption;
  columns: string[] = [];

  selection = new SelectionModel<unknown>(true, []);

  @Input()
  pageSizeOptions = [10, 50, 100];

  @Input()
  paginatedQuery = { pageIndex: 0, pageSize: 10 };

  @Input() totalSize: number;

  @Input() dataSource!: unknown[];

  /**
   * Добавляет чекбокс в первую колонку каждого ряда
   */
  @Input() selectable = true;

  /**
   * Добавляет кнопку-ссылку на карточку объекта
   */
  @Input() editable = true;

  /**
   * Шаблоны для отображения св-в в колонках ряда
   * @deprecated
   */
  @Input() templates: { [key: string]: TemplateRef<NgTemplateNameDirective> };

  @Input() gridConfig: GridConfig | null = null;

  @Input() rowCssClass: string | string[] | Set<string> | { [key: string]: any };

  @Output() changePaginatedQuery = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  @ContentChildren(NgTemplateNameDirective) columnTemplates: QueryList<NgTemplateNameDirective>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Optional() @Inject(RowClassByPropertyDirective) public readonly rowClassByProperty: RowClassByPropertyDirective
  ) {}

  getClassProperty(row: unknown): string {
    if (this.rowClassByProperty) {
      const props = this.rowClassByProperty.classByProperty.split('.');
      let obj = row;
      const output = props.map((key) => {
        const p = obj[key] ?? '';
        if (typeof p === 'object') {
          obj = p;
        }
        return p;
      });
      const [result] = output.reverse();
      return result;
    }
    return '';
  }

  ngOnInit(): void {
    if (this.gridConfig) {
      this.columns = Object.keys(this.gridConfig);

      if (this.editable) {
        this.columns = ['edit', ...this.columns];
      }

      if (this.selectable) {
        this.columns = ['select', ...this.columns];
      }
    }
  }

  pageEvent(e: PageEvent): void {
    const { pageIndex, pageSize } = e;
    this.paginatedQuery = { pageIndex, pageSize };
    this.changePaginatedQuery.emit(this.paginatedQuery);
  }

  masterToggle(data: unknown[]): void {
    this.isAllSelected(data.length) ? this.selection.clear() : data.forEach((row) => this.selection.select(row));
  }

  isAllSelected(numRows: number): boolean {
    const numSelected = this.selection.selected.length;
    return numSelected === numRows;
  }

  toDetails(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
