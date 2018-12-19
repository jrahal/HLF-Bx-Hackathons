import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private dataService: DataService) {}

  secondScreen = false;
  refreshed = false;

  name; 
  address; 
  dob;
  email;

  gpa;
  satScore;

  studentKey = '' +  Math.floor(Math.random() * Math.floor(10000));
  
  assetKey = '' +  Math.floor(Math.random() * Math.floor(10000))

  ngOnInit() {
    // let id = '6704';
    // this.dataService.getStudentIdentity(id).subscribe(x => {
    //   console.log('success...')
    //   console.log(x)
    // },
    // error => {
    //   console.log('error...')
    //   console.log(error)
    // });
  }

  refreshData() {
    this.refreshed = false;
    console.log('assetKey');
    console.log(this.assetKey)
    this.dataService.getStudentIdentity(this.assetKey).subscribe(x => {
      console.log('success...')
      console.log(x)
      // for (let i = 0; i < x.length; i++) {
      //   if (x[i].owner.studentKey === this.studentKey) {
      //   // if (x[i].owner.studentKey === '6547') {
          this.gpa = x.gpa;
          this.satScore = x.satScore;

      //   } 
      // }

      this.refreshed = true;

    }, 
    error => {
      console.log('error...')
      console.log(error)
    }
    )
  }

  submitForm() {
    let participantData = {
      "$class": "org.acme.model.Student",
      "name": this.name,
      "address": this.address,
      "dob": this.dob,
      "email": this.email,
      "studentKey": this.studentKey
    }

    console.log('submitForm...')
    console.log(participantData)

    this.dataService.createStudent(participantData).subscribe(x => {
      console.log('success...')
      console.log(x)
      let identityData = {
        "$class": "org.acme.model.StudentIdentity",
        "owner": participantData,
        "assetKey": this.assetKey,
        "gpa": 0,
        "decision": false,
        "satScore": 0
      }
      this.dataService.createStudentIdentity(identityData).subscribe(x => {
        console.log('success pt.2 ...')
        console.log(x)
      },
      error => {
        console.log('error...')
        console.log(error)
      }
      );
      this.secondScreen = true;
      this.refreshed = true;
    }, 
    error => {
      console.log('error...')
      console.log(error)
    }
  )
  }

  
}
