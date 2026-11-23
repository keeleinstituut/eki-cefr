import { GrammarQuery, grammarParams } from './grammar-query';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {
  public EtLexApiEndpoint = environment.EtLexApiEndpoint;

  constructor(private http: HttpClient) {
  }

  getCheckboxData() {
    return this.http.get(this.EtLexApiEndpoint + '/projects?asdict=1');
  }

  getTypeData() {
    return this.http.get(this.EtLexApiEndpoint + '/gramcategories');
  }

  getTypeValues() {
    return this.http.get(this.EtLexApiEndpoint + '/gramdescriptors');
  }

  getTableData(query: GrammarQuery) {
    return this.http.get(this.EtLexApiEndpoint + '/gramprofiles', { params: grammarParams(query) });
  }
}
