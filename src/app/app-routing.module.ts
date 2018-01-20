import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ContactsListComponent,
  NewContactComponent,
  EditContactComponent,
  FavoritesContactsComponent
} from './contacts/components';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'contacts', component: ContactsListComponent },
  { path: 'favorites', component: FavoritesContactsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-contact', component: NewContactComponent },
  { path: 'contacts/:id', component: EditContactComponent },
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
