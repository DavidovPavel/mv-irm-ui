import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';

import { BaseItem } from '../models/base-item';
import { InfinityScrollService } from './infinity-scroll.service';

@Component({
  selector: 'irm-infinity-scroll-select',
  templateUrl: './infinity-scroll-select.component.html',
  providers: [InfinityScrollService],
})
export class InfinityScrollSelectComponent implements OnInit, OnDestroy {
  private currentPage = 0;
  private pageSize = 20;

  selectedItem!: BaseItem;
  source$!: Observable<BaseItem[]>;
  displayControl = new FormControl();
  startValue = '';

  one!: Subscription;

  @Input() label!: string;
  @Input() controlName!: string;
  @Input() form!: FormGroup;

  constructor(private service: InfinityScrollService) {}

  ngOnInit(): void {
    const id = this.form.controls[this.controlName].value;
    if (id) {
      this.initSelected(+id);
    }

    const reset$ = this.form.controls[this.controlName].valueChanges.pipe(
      filter((a) => !a),
      tap(() => this.displayControl.setValue(''))
    );

    const source$ = this.displayControl.valueChanges.pipe(
      startWith(''),
      tap((name) =>
        this.service.dispatchSelectSource(this.controlName, {
          name,
          'pagination.pageIndex': `${this.currentPage}`,
          'pagination.pageSize': `${this.pageSize}`,
        })
      ),
      switchMap(() => this.service.getSource(this.controlName))
    );

    this.source$ = merge(reset$, source$).pipe(filter((a) => Array.isArray(a)));
  }

  initSelected(id: number): void {
    this.service.getOneById(id, this.controlName);
    this.one = this.service
      .selectOne(this.controlName, id)
      .pipe(filter((a) => a !== null))
      .subscribe((a) => {
        this.selectedItem = a;
        this.startValue = a.name;
      });
  }

  ngOnDestroy(): void {
    if (this.one) {
      this.one.unsubscribe();
    }
  }

  displayFn(item: BaseItem): string {
    return item?.name ?? '';
  }

  selected(e: MatAutocompleteSelectedEvent): void {
    this.selectedItem = e.option.value;
    this.form.controls[this.controlName].setValue(this.selectedItem.id);
  }

  nextPage(): void {
    const count = this.currentPage * this.pageSize;
    const totalSize = this.service.totalSize;
    if (count < totalSize) {
      this.currentPage++;
      this.service.dispatchSelectSource(this.controlName, {
        'pagination.pageIndex': `${this.currentPage}`,
        'pagination.pageSize': `${this.pageSize}`,
      });
    }
  }
}
