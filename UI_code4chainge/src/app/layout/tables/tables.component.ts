import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable, of } from 'rxjs';
import { RestClientService } from "../../services/rest-client.service";
import { Bank } from "../../services/factory/bank";


@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    public allBanks:  Observable<Bank[]> ;
    constructor(private dataService : RestClientService ) {

    }

    ngOnInit() {
       this.allBanks = this.dataService.getAllBanks();
    }

    getTransactionsByBank(id) {
    	console.log("id===",id);
    }
}
