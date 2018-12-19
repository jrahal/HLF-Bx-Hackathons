import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { RestClientService } from '../services/rest-client.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    myLogin = "";
    authorizedLogin = ["tijeriBank", "centralBank","Banque1-T", "Banque2-T"];
    superUserArray = ["centralBank"];
    constructor(public router: Router, private dataService : RestClientService) {}
    ngOnInit() {

    }

    onLoggedin() {
    	if (this.authorizedLogin.indexOf(this.myLogin)!== -1) {
        	this.dataService.setLogin(this.myLogin)
            this.dataService.setSuperUser(this.superUserArray.indexOf(this.myLogin)!== -1)

	        localStorage.setItem('isLoggedin', 'true');
	        this.router.navigate(['./dashboard']);
    	} else {
    		this.myLogin = ''
    	}
    }
}
