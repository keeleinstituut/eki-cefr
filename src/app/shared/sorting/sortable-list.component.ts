import { Directive, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../../services/sortable.directive';

@Directive()
export abstract class SortableListComponent {
  public column = '';
  public direction = '';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent): void {
    // Preserve the query fragments expected by the existing search services.
    this.column = '&sort=' + column;
    this.direction = '&direction=' + direction;
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.reloadAfterSort();
  }

  protected abstract reloadAfterSort(): void;
}
