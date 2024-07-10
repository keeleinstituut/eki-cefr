import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrammarDetailService {
  public EtLexApiEndpoint = environment.EtLexApiEndpoint;


  constructor(private http: HttpClient) { }

  sendData(item) {
    localStorage.setItem('data', item);
  }

  saveSearchData(listType: string, item: any, size: number, page: number) {
    localStorage.setItem('listType', JSON.stringify(listType));
    localStorage.setItem('search', JSON.stringify(item));
    localStorage.setItem('size', JSON.stringify(size));
    localStorage.setItem('page', JSON.stringify(page));
  }

  getData() {
    return this.http.get(this.EtLexApiEndpoint + '/gramprofiles/' + localStorage.getItem('data'));
  }
}
