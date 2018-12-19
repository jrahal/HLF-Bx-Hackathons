import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Registration} from './registration';


@Injectable()
export class RegistrationService {

  constructor(private http: Http) {
  }

  register(registration: Registration): Observable<Response> {
    return this.http
      .post(
        'http://localhost:3000/users',
        JSON.stringify(registration),
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

