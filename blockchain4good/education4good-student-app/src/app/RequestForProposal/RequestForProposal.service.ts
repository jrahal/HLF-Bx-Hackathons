import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import {
	RequestForProposal,
	RequestForSponsorship,
	ExpressInterest
} from '../org.edu';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RequestForProposalService {
	private NAMESPACE: string = 'RequestForProposal';

	constructor(
		private dataService: DataService<RequestForProposal>,
		private requestService: DataService<RequestForSponsorship>,
		private interestService: DataService<ExpressInterest>
	) {}

	public getAll(): Observable<RequestForProposal[]> {
		return this.dataService.getAll(this.NAMESPACE);
	}

	public getAsset(id: any): Observable<RequestForProposal> {
		return this.dataService.getSingle(this.NAMESPACE, id);
	}

	public addAsset(itemToAdd: any): Observable<RequestForProposal> {
		return this.dataService.add(this.NAMESPACE, itemToAdd);
	}

	public updateAsset(
		id: any,
		itemToUpdate: any
	): Observable<RequestForProposal> {
		return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
	}

	public deleteAsset(id: any): Observable<RequestForProposal> {
		return this.dataService.delete(this.NAMESPACE, id);
	}

	public submitRequestForSponsorship(
		itemToAdd: any
	): Observable<RequestForSponsorship> {
		return this.requestService.add('RequestForSponsorship', itemToAdd);
	}

	public expressInterest(targetItem: any): Observable<ExpressInterest> {
		return this.interestService.add('ExpressInterest', targetItem);
	}
}
