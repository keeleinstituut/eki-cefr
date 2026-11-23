import { HttpParams } from '@angular/common/http';
import { PagingQuery, pagingParams } from '../shared/paging/paging-query';
import { SortingQuery, sortingParams } from '../shared/sorting/sorting-query';

export interface GrammarFilter {
  maincategory: string | null;
  subcategory: string | null;
  descriptors: [string | null, string | null][];
}

export interface GrammarQuery extends PagingQuery, SortingQuery {
  project: string;
  levels: readonly string[];
  filters: readonly GrammarFilter[];
}

export function grammarParams(query: GrammarQuery): HttpParams {
  let params = sortingParams(query, pagingParams(query))
    .set('project', query.project)
    .set('filter_json', JSON.stringify(query.filters));
  for (const level of query.levels) {
    params = params.append('level', level);
  }
  return params;
}
