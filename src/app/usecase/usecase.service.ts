import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  getTableData(wordsString: string, level: string, size: number, page: number,
               column: string, direction: string) {
    return this.http
      .get(this.EtLexApiEndpoint + '/usecases?project=noor&limit=' + size + '&offset=' + page + column + direction + '&filter_json=' + wordsString + level);
  }
}
