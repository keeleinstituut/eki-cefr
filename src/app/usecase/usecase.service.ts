import { UsecaseQuery, usecaseParams } from './usecase-query';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsecaseService {
  public EtLexApiEndpoint = environment.EtLexApiEndpoint;


  constructor(private http: HttpClient) {
  }

  getCheckboxData() {
    return this.http.get(this.EtLexApiEndpoint + '/projects?asdict=1');
  }

  getTypeData() {
    return this.http.get(this.EtLexApiEndpoint + '/usecasecategories');
  }

  getTypeValues() {
    return this.http.get(this.EtLexApiEndpoint + '/usecasedescriptors');
  }

  getTableData(query: UsecaseQuery) {
    return this.http.get(this.EtLexApiEndpoint + '/usecases', { params: usecaseParams(query) });
  }
}
