import { Component, OnInit, Input } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { EducationalContractService } from './EducationalContract.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-EducationalContract',
	templateUrl: './EducationalContract.component.html',
	styleUrls: ['./EducationalContract.component.css'],
	providers: [EducationalContractService]
})
export class EducationalContractComponent implements OnInit {
	myForm: FormGroup;

	private allAssets;
	private asset;
	private currentId;
	private errorMessage;

	contractId = new FormControl('', Validators.required);
	contractType = new FormControl('', Validators.required);
	status = new FormControl('', Validators.required);
	fundAgreed = new FormControl('', Validators.required);
	fundReleased = new FormControl('', Validators.required);
	courseId = new FormControl('', Validators.required);
	studId = new FormControl('', Validators.required);
	investorId = new FormControl('', Validators.required);

	constructor(
		private serviceEducationalContract: EducationalContractService,
		fb: FormBuilder
	) {
		this.myForm = fb.group({
			contractId: this.contractId,
			contractType: this.contractType,
			status: this.status,
			fundAgreed: this.fundAgreed,
			fundReleased: this.fundReleased,
			courseId: this.courseId,
			studId: this.studId,
			investorId: this.investorId
		});
	}

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): Promise<any> {
		let tempList = [];
		return this.serviceEducationalContract
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

	addAsset(form: any): Promise<any> {
		this.asset = {
			$class: 'org.edu.EducationalContract',

			contractId: this.contractId.value,
			contractType: this.contractType.value,
			status: this.status.value,
			fundAgreed: this.fundAgreed.value,
			fundReleased: this.fundReleased.value,
			courseId: this.courseId.value,
			studId: this.studId.value,
			investorId: this.investorId.value
		};

		this.myForm.setValue({
			contractId: null,
			contractType: null,
			status: null,
			fundAgreed: null,
			fundReleased: null,
			courseId: null,
			studId: null,
			investorId: null
		});

		return this.serviceEducationalContract
			.addAsset(this.asset)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
				this.myForm.setValue({
					contractId: null,
					contractType: null,
					status: null,
					fundAgreed: null,
					fundReleased: null,
					courseId: null,
					studId: null,
					investorId: null
				});
			})
			.catch(error => {
				if (error == 'Server error') {
					this.errorMessage =
						'Could not connect to REST server. Please check your configuration details';
				} else {
					this.errorMessage = error;
				}
			});
	}

	updateAsset(form: any): Promise<any> {
		this.asset = {
			$class: 'org.edu.EducationalContract',

			contractType: this.contractType.value,
			status: this.status.value,
			fundAgreed: this.fundAgreed.value,
			fundReleased: this.fundReleased.value,
			courseId: this.courseId.value,
			studId: this.studId.value,
			investorId: this.investorId.value
		};

		return this.serviceEducationalContract
			.updateAsset(form.get('contractId').value, this.asset)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
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

	deleteAsset(): Promise<any> {
		return this.serviceEducationalContract
			.deleteAsset(this.currentId)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
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

	setId(id: any): void {
		this.currentId = id;
	}

	getForm(id: any): Promise<any> {
		return this.serviceEducationalContract
			.getAsset(id)
			.toPromise()
			.then(result => {
				this.errorMessage = null;
				let formObject = {
					contractId: null,
					contractType: null,
					status: null,
					fundAgreed: null,
					fundReleased: null,
					courseId: null,
					studId: null,
					investorId: null
				};

				if (result.contractId) {
					formObject.contractId = result.contractId;
				} else {
					formObject.contractId = null;
				}

				if (result.contractType) {
					formObject.contractType = result.contractType;
				} else {
					formObject.contractType = null;
				}

				if (result.status) {
					formObject.status = result.status;
				} else {
					formObject.status = null;
				}

				if (result.fundAgreed) {
					formObject.fundAgreed = result.fundAgreed;
				} else {
					formObject.fundAgreed = null;
				}

				if (result.fundReleased) {
					formObject.fundReleased = result.fundReleased;
				} else {
					formObject.fundReleased = null;
				}

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

				if (result.investorId) {
					formObject.investorId = result.investorId;
				} else {
					formObject.investorId = null;
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
			contractId: null,
			contractType: null,
			status: null,
			fundAgreed: null,
			fundReleased: null,
			courseId: null,
			studId: null,
			investorId: null
		});
	}
}
