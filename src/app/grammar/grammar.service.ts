import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {
  public EtLexApiEndpoint = environment.EtLexApiEndpoint;

  constructor(private http: HttpClient) {
  }

  getCheckboxData() {
    return this.http.get(this.EtLexApiEndpoint + '/v1.0/projects?asdict=1');
  }

  getTypeData() {
    return this.http.get(this.EtLexApiEndpoint + '/v1.0/gramcategories');
  }

  getTypeValues() {
    return this.http.get(this.EtLexApiEndpoint + '/v1.0/gramdescriptors');
  }

  getTableData(project:string, wordsString: string, level: string, size: number, page: number,
               column: string, direction: string) {
    return this.http
      .get(this.EtLexApiEndpoint + '/v1.0/gramprofiles?project='+project+'&limit=' + size + '&offset=' + page + column + direction + '&filter_json=' + wordsString + level);
  }
}
