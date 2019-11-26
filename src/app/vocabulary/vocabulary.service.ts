import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  constructor(private http: HttpClient) { }

  getSearchData( keyWord: string) {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/lemmas/' + keyWord);
  }
}
