import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  sendToFile(search: string, list: string, item: string, level?: string, words?: string, theme?: string) {
    return window.location.href = this.EtLexApiEndpoint + '/projects/' + list + '/lemmas?' + search + level + words + theme + '&format=' + item;
  }

  getTableData(search: string, list: string, size: number, page: number, column: string, direction: string, level?: string, words?: string, theme?: string) {
    return this.http
      .get(this.EtLexApiEndpoint + '/projects/' + list + '/lemmas?&limit=' + size + '&offset=' + page + column + direction + search + level + words + theme);
  }
}
