import { HttpParams } from '@angular/common/http';

export interface PagingQuery {
  page: number;
  pageSize: number;
}

export function pagingParams({ page, pageSize }: PagingQuery): HttpParams {
  const currentPage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  return new HttpParams()
    .set('limit', String(pageSize))
    .set('offset', String((currentPage - 1) * pageSize + 1));
}
