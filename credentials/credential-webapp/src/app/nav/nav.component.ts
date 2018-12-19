import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  title = 'Credential Manager';
  isLoggedIn = false;
  displayName = null;

  constructor() {

  }

  ngOnInit() {

  }

}
