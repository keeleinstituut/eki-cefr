import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsecaseService {

  constructor(private http: HttpClient) {
  }

  getCheckboxData() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/projects?asdict=1');
  }

  getTypeData() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/usecasecategories');
  }

  getTypeValues() {
    return this.http.get('https://elo.eki.ee/etLex/api/v1.0/usecasedescriptors');
  }

  getTableData(wordsString: string, level: string, size: number, page: number,
               column: string, direction: string) {
    return this.http
      .get('https://elo.eki.ee/etLex/api/v1.0/usecases?project=noor&limit=' + size + '&offset=' + page + column + direction + '&filter_json=' + wordsString + level);
  }
}
