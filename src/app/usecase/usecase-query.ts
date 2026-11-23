import { HttpParams } from '@angular/common/http';
import { PagingQuery, pagingParams } from '../shared/paging/paging-query';
import { SortingQuery, sortingParams } from '../shared/sorting/sorting-query';

export interface UsecaseFilter {
  maincategory: string | null;
  subcategory: string | null;
  descriptors: [string | null, string | null][];
}

export interface UsecaseQuery extends PagingQuery, SortingQuery {
  levels: readonly string[];
  filters: readonly UsecaseFilter[];
}

export function usecaseParams(query: UsecaseQuery): HttpParams {
  let params = sortingParams(query, pagingParams(query))
    .set('project', 'noor')
    .set('filter_json', JSON.stringify(query.filters));
  for (const level of query.levels) {
    params = params.append('level', level);
  }
  return params;
}
