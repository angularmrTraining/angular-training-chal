import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';




import { AppComponent } from './app.component';
import { HeaderComponent } from './blocks/header/header.component';
import { SidebarComponent } from './blocks/sidebar/sidebar.component';
import {
  ContactsListComponent,
  ContactCardComponent,
  ContactFormComponent,
  FavoritesContactsComponent,
  NewContactComponent,
  EditContactComponent
} from './contacts/components';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ContactService } from './services/contact.service';
import { GithubService } from './services/github.service';

import { AdressComponent } from './contacts/components/contact-form/adress/adress.component';



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
    AdressComponent,
    NewContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule

  ],
    providers: [ ContactService, GithubService ],
    bootstrap: [AppComponent]
})
export class AppModule { }


