import { Component, OnInit, Input } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { RequestForProposalService } from './RequestForProposal.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-RequestForProposal',
	templateUrl: './RequestForProposal.component.html',
	styleUrls: ['./RequestForProposal.component.css'],
	providers: [RequestForProposalService]
})
export class RequestForProposalComponent implements OnInit {
	myForm: FormGroup;

	private hardCodedStudentId: '7580';
	private allAssets;
	private asset;
	private currentId;
	private errorMessage;
	private rfp;

	courseId = new FormControl('', Validators.required);
	studId = new FormControl(''ƒ, Validators.required);
	rfpId = new FormControl('', Validators.required);
	status = new FormControl('', Validators.required);
	fundAmt = new FormControl('', Validators.required);
	benefits = new FormControl('', Validators.required);
	timelines = new FormControl('', Validators.required);
	intrestedParty = new FormControl('', Validators.required);
	selectedInvestor = new FormControl('', Validators.required);

	constructor(
		private serviceRequestForProposal: RequestForProposalService,
		fb: FormBuilder
	) {
		this.myForm = fb.group({
			courseId: this.courseId,
			studId: '7580',
			rfpId: this.rfpId,
			status: 'open',
			fundAmt: this.fundAmt,
			benefits: this.benefits,
			timelines: this.timelines,
			intrestedParty: [''],
			selectedInvestor: ['']
		});
	}

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): Promise<any> {
		let tempList = [];
		return this.serviceRequestForProposal
			.getAll()
			.toPromise()
			.then(result => {
				this.errorMessage = null;
				result.forEach(asset => {
					tempList.push(asset);
				});
				this.allAssets = tempList;
			})
			.catch(error => {
				if (error == 'Server error') {
					this.errorMessage =
						'Could not connect to REST server. Please check your configuration details';
				} else if (error == '404 - Not Found') {
					this.errorMessage =
						'404 - Could not find API route. Please check your available APIs.';
				} else {
					this.errorMessage = error;
				}
			});
	}

	/**
	 * Event handler for changing the checked state of a checkbox (handles array enumeration values)
	 * @param {String} name - the name of the asset field to update
	 * @param {any} value - the enumeration value for which to toggle the checked state
	 */
	changeArrayValue(name: string, value: any): void {
		const index = this[name].value.indexOf(value);
		if (index === -1) {
			this[name].value.push(value);
		} else {
			this[name].value.splice(index, 1);
		}
	}

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
	 * only). This is used for checkboxes in the asset updateDialog.
	 * @param {String} name - the name of the asset field to check
	 * @param {any} value - the enumeration value to check for
	 * @return {Boolean} whether the specified asset field contains the provided value
	 */
	hasArrayValue(name: string, value: any): boolean {
		return this[name].value.indexOf(value) !== -1;
	}

	addRequest(form: any): Promise<any> {
		this.rfp = {
			$class: 'org.edu.RequestForSponsorship',
			transactionId: '',
			timestamp: new Date().toISOString(),
			rfp: {
				$class: 'org.edu.RequestForProposal',
				courseId: 'resource:org.edu.Course#courseId:' + this.courseId.value,
				studId: 'resource:org.edu.Student#studId:7580',
				rfpId: 'rfpId:' + this.rfpId.value,
				status: 'open',
				fundAmt: this.fundAmt.value,
				benefits: this.benefits.value,
				timelines: this.timelines.value,
				intrestedParty: [''],
				selectedInvestor: ''
			}
		};

		return this.serviceRequestForProposal
			.submitRequestForSponsorship(this.rfp)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
			})
			.catch(error => {
				if (error == 'Server error') {
					this.errorMessage =
						'Could not connect to REST server. Please check your configuration details';
				} else {
					this.errorMessage = error;
					console.log(this.errorMessage);
				}
			});
	}

	showInterest(rfpId: string) {
		//TODo

		var interest = {
			$class: 'org.edu.ExpressInterest',
			rfp: rfpId,
			investorId: 'investorId:8587',
			transactionId: '',
			timestamp: new Date().toISOString()
		};

		return this.serviceRequestForProposal
			.expressInterest(interest)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
			})
			.catch(error => {
				if (error == 'Server error') {
					this.errorMessage =
						'Could not connect to REST server. Please check your configuration details';
				} else {
					this.errorMessage = error;
					console.log(this.errorMessage);
				}
			});
	}

	setId(id: any): void {
		this.currentId = id;
	}

	getForm(id: any): Promise<any> {
		return this.serviceRequestForProposal
			.getAsset(id)
			.toPromise()
			.then(result => {
				this.errorMessage = null;
				let formObject = {
					courseId: null,

					studId: null,

					rfpId: null,

					status: null,

					fundAmt: null,

					benefits: null,

					timelines: null,

					intrestedParty: null,

					selectedInvestor: null
				};

				if (result.courseId) {
					formObject.courseId = result.courseId;
				} else {
					formObject.courseId = null;
				}

				if (result.studId) {
					formObject.studId = result.studId;
				} else {
					formObject.studId = null;
				}

				if (result.rfpId) {
					formObject.rfpId = result.rfpId;
				} else {
					formObject.rfpId = null;
				}

				if (result.status) {
					formObject.status = result.status;
				} else {
					formObject.status = null;
				}

				if (result.fundAmt) {
					formObject.fundAmt = result.fundAmt;
				} else {
					formObject.fundAmt = null;
				}

				if (result.benefits) {
					formObject.benefits = result.benefits;
				} else {
					formObject.benefits = null;
				}

				if (result.timelines) {
					formObject.timelines = result.timelines;
				} else {
					formObject.timelines = null;
				}

				if (result.intrestedParty) {
					formObject.intrestedParty = result.intrestedParty;
				} else {
					formObject.intrestedParty = null;
				}

				if (result.selectedInvestor) {
					formObject.selectedInvestor = result.selectedInvestor;
				} else {
					formObject.selectedInvestor = null;
				}

				this.myForm.setValue(formObject);
			})
			.catch(error => {
				if (error == 'Server error') {
					this.errorMessage =
						'Could not connect to REST server. Please check your configuration details';
				} else if (error == '404 - Not Found') {
					this.errorMessage =
						'404 - Could not find API route. Please check your available APIs.';
				} else {
					this.errorMessage = error;
				}
			});
	}

	resetForm(): void {
		this.myForm.setValue({
			courseId: null,

			studId: null,

			rfpId: null,

			status: null,

			fundAmt: null,

			benefits: null,

			timelines: null,

			intrestedParty: null,

			selectedInvestor: null
		});
	}
}
