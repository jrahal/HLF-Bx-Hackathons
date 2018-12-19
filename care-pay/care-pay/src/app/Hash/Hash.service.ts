import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Hash } from '../org.carepay';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class HashService {

	
		private NAMESPACE: string = 'org.carepay.Hash';
	



    constructor(private dataService: DataService<Hash>) {
    };

    public getAll(): Observable<Hash[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Hash> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Hash> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Hash> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Hash> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
