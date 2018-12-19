import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../org.carepay';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PatientService {

	
		private NAMESPACE: string = 'org.carepay.Patient';
	



    constructor(private dataService: DataService<Patient>) {
    };

    public getAll(): Observable<Patient[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Patient> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Patient> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Patient> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Patient> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
