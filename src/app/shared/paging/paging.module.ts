import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagingComponent } from './paging.component';
import { PageSizeComponent } from './page-size.component';

@NgModule({
  declarations: [PagingComponent, PageSizeComponent],
  imports: [FormsModule, NgbPaginationModule],
  exports: [PagingComponent, PageSizeComponent]
})
export class PagingModule {}
