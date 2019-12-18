import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackModalService {
  public httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
  };
  constructor(private http: HttpClient) { }

  sendFeedback(body): Observable<any> {
   return this.http.post('https://ekitest.tripledev.ee/ekilex/send_feedback', JSON.stringify(body), this.httpOptions);
  }
}
