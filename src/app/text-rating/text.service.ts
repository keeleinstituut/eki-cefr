import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  public EtLexApiEndpoint = environment.EtLexApiEndpoint;


  constructor(private http: HttpClient) { }

  getTextData(text: string, list: string) {
    const payload = {'text':text };
    return this.http.post(this.EtLexApiEndpoint + '/projects/' + list + '/evaluation', payload);
 }
 
  getLevels(list: string) {
    return this.http.get(this.EtLexApiEndpoint + '/projects/' + list);
  }
}
