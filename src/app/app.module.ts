import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ContactService } from './core/service/contact.service';
import { GithubApiService } from './core/service/github-api.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './blocks/header/header.component';
import { SidebarComponent } from './blocks/sidebar/sidebar.component';
import {
  ContactsListComponent,
  ContactCardComponent,
  EditContactComponent,
  NewContactComponent,
  ContactFormComponent,
  FavoritesContactsComponent,
  ContactAddressComponent
} from './contacts/components';

import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContactsListComponent,
    ContactCardComponent,
    ContactFormComponent,
    ProfileComponent,
    DashboardComponent,
    FavoritesContactsComponent,
    ContactAddressComponent,
    EditContactComponent,
    NewContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ContactService, GithubApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
