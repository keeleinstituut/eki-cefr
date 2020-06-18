import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrammarDetailService {

  constructor(private http: HttpClient) { }

  sendData(item) {
    localStorage.setItem('data', item);
  }

  saveSearchData(item: any, size: number, page: number) {
    localStorage.setItem('search', JSON.stringify(item));
    localStorage.setItem('size', JSON.stringify(size));
    localStorage.setItem('page', JSON.stringify(page));
  }

  getData() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/gramprofiles/' + localStorage.getItem('data'));
  }
}
