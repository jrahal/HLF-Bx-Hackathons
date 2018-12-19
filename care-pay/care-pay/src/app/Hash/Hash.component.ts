import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HashService } from './Hash.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Hash',
	templateUrl: './Hash.component.html',
	styleUrls: ['./Hash.component.css'],
  providers: [HashService]
})
export class HashComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          tx_description = new FormControl("", Validators.required);
        
  
      
          hash = new FormControl("", Validators.required);
        
  
      
          pointer = new FormControl("", Validators.required);
        
  
      
          patient = new FormControl("", Validators.required);
        
  


  constructor(private serviceHash:HashService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          tx_description:this.tx_description,
        
    
        
          hash:this.hash,
        
    
        
          pointer:this.pointer,
        
    
        
          patient:this.patient
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceHash.getAll()
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
      $class: "org.carepay.Hash",
      
        
          "tx_description":this.tx_description.value,
        
      
        
          "hash":this.hash.value,
        
      
        
          "pointer":this.pointer.value,
        
      
        
          "patient":this.patient.value
        
      
    };

    this.myForm.setValue({
      
        
          "tx_description":null,
        
      
        
          "hash":null,
        
      
        
          "pointer":null,
        
      
        
          "patient":null
        
      
    });

    return this.serviceHash.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "tx_description":null,
        
      
        
          "hash":null,
        
      
        
          "pointer":null,
        
      
        
          "patient":null 
        
      
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
      $class: "org.carepay.Hash",
      
        
          
            "tx_description":this.tx_description.value,
          
        
    
        
          
        
    
        
          
            "pointer":this.pointer.value,
          
        
    
        
          
            "patient":this.patient.value
          
        
    
    };

    return this.serviceHash.updateAsset(form.get("hash").value,this.asset)
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

    return this.serviceHash.deleteAsset(this.currentId)
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

    return this.serviceHash.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "tx_description":null,
          
        
          
            "hash":null,
          
        
          
            "pointer":null,
          
        
          
            "patient":null 
          
        
      };



      
        if(result.tx_description){
          
            formObject.tx_description = result.tx_description;
          
        }else{
          formObject.tx_description = null;
        }
      
        if(result.hash){
          
            formObject.hash = result.hash;
          
        }else{
          formObject.hash = null;
        }
      
        if(result.pointer){
          
            formObject.pointer = result.pointer;
          
        }else{
          formObject.pointer = null;
        }
      
        if(result.patient){
          
            formObject.patient = result.patient;
          
        }else{
          formObject.patient = null;
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
      
        
          "tx_description":null,
        
      
        
          "hash":null,
        
      
        
          "pointer":null,
        
      
        
          "patient":null 
        
      
      });
  }

}
