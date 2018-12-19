import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatientService } from './Patient.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Patient',
	templateUrl: './Patient.component.html',
	styleUrls: ['./Patient.component.css'],
  providers: [PatientService]
})
export class PatientComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          patient_id = new FormControl("", Validators.required);
        
  
      
          provider = new FormControl("", Validators.required);
        
  
      
          payor = new FormControl("", Validators.required);
        
  


  constructor(private servicePatient:PatientService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          patient_id:this.patient_id,
        
    
        
          provider:this.provider,
        
    
        
          payor:this.payor
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
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
      $class: "org.carepay.Patient",
      
        
          "patient_id":this.patient_id.value,
        
      
        
          "provider":this.provider.value,
        
      
        
          "payor":this.payor.value
        
      
    };

    this.myForm.setValue({
      
        
          "patient_id":null,
        
      
        
          "provider":null,
        
      
        
          "payor":null
        
      
    });

    return this.servicePatient.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "patient_id":null,
        
      
        
          "provider":null,
        
      
        
          "payor":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.carepay.Patient",
      
        
          
        
    
        
          
            "provider":this.provider.value,
          
        
    
        
          
            "payor":this.payor.value
          
        
    
    };

    return this.servicePatient.updateAsset(form.get("patient_id").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePatient.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicePatient.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "patient_id":null,
          
        
          
            "provider":null,
          
        
          
            "payor":null 
          
        
      };



      
        if(result.patient_id){
          
            formObject.patient_id = result.patient_id;
          
        }else{
          formObject.patient_id = null;
        }
      
        if(result.provider){
          
            formObject.provider = result.provider;
          
        }else{
          formObject.provider = null;
        }
      
        if(result.payor){
          
            formObject.payor = result.payor;
          
        }else{
          formObject.payor = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "patient_id":null,
        
      
        
          "provider":null,
        
      
        
          "payor":null 
        
      
      });
  }

}
