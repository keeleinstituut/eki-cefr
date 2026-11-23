import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  standalone: false,
  template: `
    <ngb-pagination [collectionSize]="total" [page]="page" [pageSize]="pageSize"
      (pageChange)="pageChange.emit($event)" [maxSize]="10">
      <ng-template ngbPaginationPrevious>Eelmine</ng-template>
      <ng-template ngbPaginationNext>Järgmine</ng-template>
    </ngb-pagination>
  `
})
export class PagingComponent {
  @Input() total = 0;
  @Input() page = 1;
  @Input() pageSize = 20;
  @Output() pageChange = new EventEmitter<number>();
}
