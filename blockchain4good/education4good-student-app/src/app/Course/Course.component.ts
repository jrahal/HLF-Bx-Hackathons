import { Component, OnInit, Input } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { CourseService } from './Course.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Course',
	templateUrl: './Course.component.html',
	styleUrls: ['./Course.component.css'],
	providers: [CourseService]
})
export class CourseComponent implements OnInit {
	myForm: FormGroup;

	private allAssets;
	private asset;
	private currentId;
	private errorMessage;

	courseId = new FormControl('', Validators.required);

	courseCost = new FormControl('', Validators.required);

	courseDuration = new FormControl('', Validators.required);

	courseTitle = new FormControl('', Validators.required);

	uniId = new FormControl('', Validators.required);

	constructor(private serviceCourse: CourseService, fb: FormBuilder) {
		this.myForm = fb.group({
			courseId: this.courseId,

			courseCost: this.courseCost,

			courseDuration: this.courseDuration,

			courseTitle: this.courseTitle,

			uniId: this.uniId
		});
	}

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): Promise<any> {
		let tempList = [];
		return this.serviceCourse
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
			$class: 'org.edu.Course',

			courseId: this.courseId.value,

			courseCost: this.courseCost.value,

			courseDuration: this.courseDuration.value,

			courseTitle: this.courseTitle.value,

			uniId: this.uniId.value
		};

		this.myForm.setValue({
			courseId: null,

			courseCost: null,

			courseDuration: null,

			courseTitle: null,

			uniId: null
		});

		return this.serviceCourse
			.addAsset(this.asset)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
				this.myForm.setValue({
					courseId: null,

					courseCost: null,

					courseDuration: null,

					courseTitle: null,

					uniId: null
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
			$class: 'org.edu.Course',

			courseCost: this.courseCost.value,

			courseDuration: this.courseDuration.value,

			courseTitle: this.courseTitle.value,

			uniId: this.uniId.value
		};

		return this.serviceCourse
			.updateAsset(form.get('courseId').value, this.asset)
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
		return this.serviceCourse
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
		return this.serviceCourse
			.getAsset(id)
			.toPromise()
			.then(result => {
				this.errorMessage = null;
				let formObject = {
					courseId: null,

					courseCost: null,

					courseDuration: null,

					courseTitle: null,

					uniId: null
				};

				if (result.courseId) {
					formObject.courseId = result.courseId;
				} else {
					formObject.courseId = null;
				}

				if (result.courseCost) {
					formObject.courseCost = result.courseCost;
				} else {
					formObject.courseCost = null;
				}

				if (result.courseDuration) {
					formObject.courseDuration = result.courseDuration;
				} else {
					formObject.courseDuration = null;
				}

				if (result.courseTitle) {
					formObject.courseTitle = result.courseTitle;
				} else {
					formObject.courseTitle = null;
				}

				if (result.uniId) {
					formObject.uniId = result.uniId;
				} else {
					formObject.uniId = null;
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

			courseCost: null,

			courseDuration: null,

			courseTitle: null,

			uniId: null
		});
	}
}
