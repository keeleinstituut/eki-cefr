import { HttpParams } from '@angular/common/http';
import { PagingQuery, pagingParams } from '../shared/paging/paging-query';
import { SortingQuery, sortingParams } from '../shared/sorting/sorting-query';

export interface VocabularyFilters {
  project: string;
  word?: string;
  levels?: readonly string[];
  partsOfSpeech?: readonly string[];
  theme?: string;
}

export interface VocabularyQuery extends VocabularyFilters, PagingQuery, SortingQuery {}

export function vocabularyFilterParams(query: VocabularyFilters): HttpParams {
  let params = new HttpParams();
  if (query.word) {
    params = params.set('word', query.word);
  }
  for (const level of query.levels ?? []) {
    params = params.append('level', level);
  }
  for (const part of query.partsOfSpeech ?? []) {
    params = params.append('pos', part);
  }
  if (query.theme) {
    params = params.set('themes', query.theme);
  }
  return params;
}

export function vocabularyParams(query: VocabularyQuery): HttpParams {
  return sortingParams(query, pagingParams(query, vocabularyFilterParams(query)));
}
