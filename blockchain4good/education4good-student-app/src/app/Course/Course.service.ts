import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../org.edu';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CourseService {
	private NAMESPACE: string = 'Course';

	constructor(private dataService: DataService<Course>) {}

	public getAll(): Observable<Course[]> {
		return this.dataService.getAll(this.NAMESPACE);
	}

	public getAsset(id: any): Observable<Course> {
		return this.dataService.getSingle(this.NAMESPACE, id);
	}

	public addAsset(itemToAdd: any): Observable<Course> {
		return this.dataService.add(this.NAMESPACE, itemToAdd);
	}

	public updateAsset(id: any, itemToUpdate: any): Observable<Course> {
		return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
	}

	public deleteAsset(id: any): Observable<Course> {
		return this.dataService.delete(this.NAMESPACE, id);
	}
}
