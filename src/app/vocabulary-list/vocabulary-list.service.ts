import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VocabularyListService {

  constructor(private http: HttpClient) { }

  getCheckboxData() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/projects?asdict=1');
  }

  sendToFile(search: string, list: string, item: string,  level?: string, words?: string) {
    // return this.http.get('https://elo.eki.ee/etLex/api/v1.0/projects/' + list + '/lemmas?' + search + level + words + '&format=' + item);
    return window.location.href = 'https://elo.eki.ee/etLex/api/v1.0/projects/' + list + '/lemmas?' + search + level + words + '&format=' + item;
  }

  getTableData(search: string, list: string, size: number, page: number, column: string, direction: string, level?: string, words?: string) {
    console.log(page);
    return this.http
      .get('https://elo.eki.ee/etLex/api/v1.0/projects/' + list + '/lemmas?&limit=' + size + '&offset=' + page + column + direction + search + level + words);
  }
}
