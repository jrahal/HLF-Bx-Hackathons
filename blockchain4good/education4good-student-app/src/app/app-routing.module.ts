import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { CourseComponent } from './Course/Course.component';
import { RequestForProposalComponent } from './RequestForProposal/RequestForProposal.component';
import { EducationalContractComponent } from './EducationalContract/EducationalContract.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Course', component: CourseComponent},
		
		{ path: 'RequestForProposal', component: RequestForProposalComponent},
		
		{ path: 'EducationalContract', component: EducationalContractComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
