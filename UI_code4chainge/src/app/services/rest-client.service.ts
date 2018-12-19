import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {
  readonly ALL_BANKS_URL = 'http://vps177348.vps.ovh.ca:3000/api/queries/selectAllBanks';
  readonly BANKBYID_URL = "http://vps177348.vps.ovh.ca:3000/api/org.acme.biznet.Banque/";
  readonly ALL_CONTRACT_URL = 'http://vps177348.vps.ovh.ca:3000/api/queries/selectAllContrat';
  public login:string;
  public superUser = false;
  constructor(private http : HttpClient) {
  }

  getAllBanks() {
  	return  this.http.get<any[]>(this.ALL_BANKS_URL);
  }

  getBankByLogin() {
    let params = new HttpParams().set('Idbanque', this.login);
  	return  this.http.get<any>(this.BANKBYID_URL+ this.login);
  }


  getAllContracts() {
  	return  this.http.get<any[]>(this.ALL_CONTRACT_URL);
  }

   setLogin(login) {
   	this.login = login;
   }

   setSuperUser(flag){
   	this.superUser= flag;
   }

}
