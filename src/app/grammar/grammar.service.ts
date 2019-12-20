import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  constructor(private http: HttpClient) {
  }

  getCheckboxData() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/projects?asdict=1');
  }

  getTypeData() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/gramcategories');
  }

  getTypeValues() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/gramdescriptors');
  }

  getTableData(wordsString: string, level: string, size: number, page: number,
               column: string, direction: string) {
    return this.http
      .get('https://elo.eki.ee/etLex/api/v1.0/gramprofiles?project=noor&limit=' + size + '&offset=' + page + column + direction + '&filter_json=' + wordsString + level);
  }
}
