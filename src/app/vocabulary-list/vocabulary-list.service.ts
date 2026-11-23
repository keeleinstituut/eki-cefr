import { VocabularyFilters, VocabularyQuery, vocabularyFilterParams, vocabularyParams } from './vocabulary-query';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VocabularyListService {
  public EtLexApiEndpoint = environment.EtLexApiEndpoint;


  constructor(private http: HttpClient) {
  }

  getCheckboxData() {
    return this.http.get(this.EtLexApiEndpoint + '/projects?asdict=1');
  }


  getThemesData() {
    return this.http.get(this.EtLexApiEndpoint + '/themes');
  }

  getExportUrl(query: VocabularyFilters, format: string): string {
    const params = vocabularyFilterParams(query).set('format', format);
    return this.EtLexApiEndpoint + '/projects/' + encodeURIComponent(query.project) + '/lemmas?' + params.toString();
  }

  sendToFile(query: VocabularyFilters, format: string) {
    window.location.href = this.getExportUrl(query, format);
  }

  getTableData(query: VocabularyQuery) {
    return this.http.get(this.EtLexApiEndpoint + '/projects/' + encodeURIComponent(query.project) + '/lemmas', {
      params: vocabularyParams(query)
    });
  }
}
