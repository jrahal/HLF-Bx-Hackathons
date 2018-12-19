import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { EducationalContract } from '../org.edu';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class EducationalContractService {
	private NAMESPACE: string = 'EducationalContract';

	constructor(private dataService: DataService<EducationalContract>) {}

	public getAll(): Observable<EducationalContract[]> {
		return this.dataService.getAll(this.NAMESPACE);
	}

	public getAsset(id: any): Observable<EducationalContract> {
		return this.dataService.getSingle(this.NAMESPACE, id);
	}

	public addAsset(itemToAdd: any): Observable<EducationalContract> {
		return this.dataService.add(this.NAMESPACE, itemToAdd);
	}

	public updateAsset(
		id: any,
		itemToUpdate: any
	): Observable<EducationalContract> {
		return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
	}

	public deleteAsset(id: any): Observable<EducationalContract> {
		return this.dataService.delete(this.NAMESPACE, id);
	}
}
