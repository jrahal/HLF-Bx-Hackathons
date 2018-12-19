import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RestClientService } from "../../services/rest-client.service";
import { Observable, of } from 'rxjs';
import { Contract } from "../../services/factory/contract";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [routerTransition()]
})
export class GridComponent implements OnInit {
    public allContracts:  Observable<Contract[]> ;
    constructor(private dataService : RestClientService ) {}

    ngOnInit() {
       this.allContracts = this.dataService.getAllContracts();
    }
}
