import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request }	from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    constructor(private http: Http) { }
    
    createStudent(data): Observable<any> {
        const url = "http://52.170.82.100:3000/api/Student";

        let myHeaders = new Headers({accept: 'application/json'});
        myHeaders.append('Access-Control-Allow-Origin', '*')
        
        const reqOptions = new RequestOptions({
			url: url,
			method: RequestMethod.Post,
            headers: myHeaders,
            body: data
		});

        const req = new Request(reqOptions);

		return this.http.request(req)
			.map((response: Response) => response.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')); 

    } 

    createStudentIdentity(data): Observable<any> {
        /* tslint:disable */
		const url = "http://52.170.82.100:3000/api/StudentIdentity/";
        /* tslint:enable */
        
        let myHeaders = new Headers({accept: 'application/json'});
        myHeaders.append('Access-Control-Allow-Origin', '*')
        
        const reqOptions = new RequestOptions({
			url: url,
			method: RequestMethod.Post,
            headers: myHeaders,
            body: data
		});

		const req = new Request(reqOptions);

		return this.http.request(req)
			.map((response: Response) => response.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } 

    getStudentIdentity(id): Observable<any> {
        /* tslint:disable */
		const url = "http://52.170.82.100:3000/api/StudentIdentity/" + id;
		/* tslint:enable */

		const reqOptions = new RequestOptions({
			url: url,
			method: RequestMethod.Get,
			headers: new Headers({accept: 'application/json' })
		});

		const req = new Request(reqOptions);

		return this.http.request(req)
			.map((response: Response) => response.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
  }


}
