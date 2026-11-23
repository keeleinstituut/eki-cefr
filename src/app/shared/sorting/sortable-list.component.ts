import { Directive, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortDirection, SortEvent } from '../../services/sortable.directive';

@Directive()
export abstract class SortableListComponent {
  public column = '';
  public direction: SortDirection = '';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent): void {
    this.column = column;
    this.direction = direction;
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.reloadAfterSort();
  }

  protected abstract reloadAfterSort(): void;
}
