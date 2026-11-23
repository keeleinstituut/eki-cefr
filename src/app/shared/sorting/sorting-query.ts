import { HttpParams } from '@angular/common/http';
import { SortDirection } from '../../services/sortable.directive';

export interface SortingQuery {
  sort?: string;
  direction?: SortDirection;
}

export function sortingParams(query: SortingQuery, params: HttpParams): HttpParams {
  return query.sort
    ? params.set('sort', query.sort).set('direction', query.direction ?? '')
    : params;
}
