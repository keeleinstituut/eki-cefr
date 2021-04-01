import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TextRatingGlobalService {

  constructor(private http: HttpClient) { }

  getTextData( text: string, list: string) {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/projects/' + list + '/grammarevaluation?text=' + text);
  }
  getLevels(list: string) {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/projects/' + list);
  }
}
