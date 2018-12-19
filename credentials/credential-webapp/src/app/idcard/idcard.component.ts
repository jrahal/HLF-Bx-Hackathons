import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {QRCodeComponent} from 'ng2-qrcode';


import {IDCard} from './idcard';


@Component({
  selector: 'app-idcard',
  templateUrl: './idcard.component.html',
  styleUrls: ['./idcard.component.css']
})


export class IDCardComponent implements OnInit, OnDestroy {

  idCard = null;
  idCardName = null;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.idCard = IDCard.fromJSON(JSON.parse(sessionStorage.getItem('newregistration')));
  }

  ngOnDestroy() {
    sessionStorage.removeItem('newregistration');
  }

  onSubmit() {
    if ((this.idCardName != null) && (this.idCardName.trim() !== '')) {
      this.idCard.save(this.idCardName);
    }
  }

}
