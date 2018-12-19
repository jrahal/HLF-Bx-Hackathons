import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  login(userID: String, userSecret: String): Observable<Response> {
    return this.http
      .post(
        'http://localhost:3000/sessions',
        JSON.stringify({
          userID: userID,
          userSecret: userSecret
        }),
        {headers: this.getHeaders()}
      );
  }


  getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'bearer ChathuZu2epabREyEfU*avAw2NEkespu');
    return headers;
  }


}

