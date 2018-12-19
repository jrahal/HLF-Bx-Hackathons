import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
//import {QRCodeComponent} from 'ng2-qrcode';

import {RegistrationService} from '../../../credentialwebapp/src/app/register/registration.service';
import {LoginService} from '../../../credentialwebapp/src/app/login/login.service';

import {AppComponent} from './app.component';
import {NavComponent} from '../../../credentialwebapp/src/app/nav/nav.component';
import {FooterComponent} from '../../../credentialwebapp/src/app/footer/footer.component';
import {WelcomeComponent} from '../../../credentialwebapp/src/app/welcome/welcome.component';
import {RegisterComponent} from '../../../credentialwebapp/src/app/register/register.component';
import {IDCardComponent} from '../../../credentialwebapp/src/app/idcard/idcard.component';
import {LoginComponent} from '../../../credentialwebapp/src/app/login/login.component';
import {ManageComponent} from '../../../credentialwebapp/src/app/manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    WelcomeComponent,
    RegisterComponent,
    IDCardComponent,
    LoginComponent,
    ManageComponent/*,
    QRCodeComponent
    */
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'register/idcard',
        component: IDCardComponent
      },
      {
        path: 'manage',
        component: ManageComponent
      }
    ])
  ],
  providers: [RegistrationService, LoginService, {provide: Window, useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
