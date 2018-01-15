import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ContactsListComponent,
  ContactFormComponent
} from './contacts/components';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'contacts', component: ContactsListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'favorites', component: ContactsListComponent },
  { path: 'new-contact', component: ContactFormComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
