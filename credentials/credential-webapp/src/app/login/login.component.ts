import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  walletList = null;
  @Input() userID = null;
  @Input() userSecret = null;
  @Input() actualUserSecret = null;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.walletList = localStorage.getItem('WalletList');
    if (this.walletList !== null) {
      this.walletList = JSON.parse(this.walletList);
      this.walletList.unshift('');
    }
  }

  ngOnInit() {
  }

  onUserSecretChange(event: string): void {
    this.actualUserSecret = event;
  }

  onWalletChange(event: string): void {
    const walletEntry = JSON.parse(localStorage.getItem(event));
    this.userID = walletEntry.userID;
    this.userSecret = '############';
    this.actualUserSecret = walletEntry.userSecret;
  }

  onSubmit() {
    this.loginService.login(this.userID, this.actualUserSecret).subscribe( r => {
      console.log(r);
      sessionStorage.setItem('token', r.json().token);
      return this.router.navigate(['/manage']);
    });
  }

}
