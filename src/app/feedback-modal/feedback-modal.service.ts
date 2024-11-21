import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackModalService {
  public FeedBackEndpoint = environment.FeedBackEndpoint;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  sendFeedback(body): Observable<any> {
    return this.http.post(this.FeedBackEndpoint, JSON.stringify(body), this.httpOptions);
  }
}
