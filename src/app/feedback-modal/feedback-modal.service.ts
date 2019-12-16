import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackModalService {

  constructor(private http: HttpClient) { }

  sendFeedback(body) {
   return this.http.post('https://ekitest.tripledev.ee/ekilex/send_feedback', { });
  }
}
