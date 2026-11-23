import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-size',
  standalone: false,
  template: `
    <label [for]="selectId" class="form-label">Näita</label>
    <select [id]="selectId" class="select-num" [ngModel]="pageSize"
      (ngModelChange)="pageSizeChange.emit($event)">
      @for (size of sizes; track size) {
        <option [ngValue]="size">{{ size }}</option>
      }
      <option [ngValue]="total">kõik</option>
    </select>
  `
})
export class PageSizeComponent {
  private static nextId = 0;
  readonly selectId = `page-size-${PageSizeComponent.nextId++}`;
  readonly sizes = [10, 20, 30, 50, 100];
  @Input() total = 0;
  @Input() pageSize = 20;
  @Output() pageSizeChange = new EventEmitter<number>();
}
