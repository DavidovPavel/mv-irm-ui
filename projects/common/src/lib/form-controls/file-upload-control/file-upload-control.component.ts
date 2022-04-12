import { Component, ElementRef, EventEmitter, OnInit, Output, Type, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import { EditableList } from '../../form-factory/editable-list';
import { ListItemDirective } from '../../form-factory/list-item.directive';

const MAX_SIZE_FILE_MB = 10;

/**
 * TODO: требует доработки, добавление и удаление файлов - часная задача редактируемого списка
 * формирование данных для отправки на сервер должно происходить в компоненте с формой (карточка объекта)
 */
@Component({
  selector: 'irm-file-upload-control',
  templateUrl: './file-upload-control.component.html',
  styleUrls: ['./file-upload-control.component.scss'],
  providers: [{ provide: EditableList, useExisting: FileUploadControlComponent }],
})
export class FileUploadControlComponent extends EditableList implements OnInit {
  notifyError = '';
  attachedCount = 0;
  items: unknown[];

  @Output() remove = new EventEmitter<number>();
  @Output() add = new EventEmitter<unknown>();

  @ViewChild('fileUploadInput')
  fileUploadInput!: ElementRef;

  get files(): File[] {
    return this.control?.value;
  }

  ngOnInit(): void {
    (this.control as FormArray).clear();
  }

  show(): void {
    this.fileUploadInput.nativeElement.click();
  }

  addItem(): void {
    this.add.emit();
  }

  removeItem(item: unknown): void {
    const id = (item as { id: number }).id;
    this.remove.emit(id);
  }

  showError(): void {}

  removeFile(item: unknown): void {
    const cnt = this.control as FormArray;
    const name = (item as File).name;
    const v = cnt.controls.filter((a) => a.value.name !== name);
    cnt.clear();
    v.forEach((a) => cnt.push(a));
    this.notifyError = '';
    this.showError();
  }

  fileUploadHandler(e: Event): void {
    if (e) {
      const fileUploader = e.target as HTMLInputElement;
      const files = fileUploader?.files;

      if (files) {
        const fc = this.control as FormArray;
        const length = files.length;

        for (let i = 0; i < length; i++) {
          const file = files.item(i);
          if (file && this.notExist(fc, file.name) && this.checkSize(file.size)) {
            fc.push(new FormControl(file));
          }
        }
        this.fileUploadInput.nativeElement.value = '';
      }
    }
  }

  notExist(filesControl: FormArray, name: string): boolean {
    const isError =
      filesControl.controls.some((a) => a.value.name === name) ||
      this.items.some((a: { id: number; file: File }) => a.file.name === name);
    this.notifyError = isError ? 'Файл с таким именем уже добавлен!' : '';
    return !isError;
  }

  checkSize(size: number): boolean {
    const a = Math.ceil(size / (1024 * 1000));
    const isError = a > MAX_SIZE_FILE_MB;
    this.notifyError = isError ? `Размер загружаемого файла больше ${MAX_SIZE_FILE_MB}Mb!` : '';
    return !isError;
  }

  attachAddComponent(c: Type<ListItemDirective>): void {}
}
