import { Injectable } from '@angular/core';
import { Contact } from '../model/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ContactService {

  contacts: Contact[];
  favoriteContacts: Contact[];
  private contactsUrl = 'https://mini-crm-api.herokuapp.com/api/v1/contacts';  // URL to web api

  constructor(
    private http: HttpClient) {
      this.contacts = [];
      this.favoriteContacts = [];
     }


  getContact(id: string): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(data => {
        this.contacts = data['contacts'];
        this.contacts.filter(c => !this.favoriteContacts.includes(c));
      }),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }


  getfavoriteContacts(): Observable<Contact[]> {
    return of(this.favoriteContacts);
  }

  getContacts(): Observable<Contact[]> {
    console.log(this.contactsUrl);
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      catchError(this.handleError('getContacts', []))
    );
  }

  addContact (contact: Contact): Observable<any> {
    return this.http.post(this.contactsUrl, contact, httpOptions).pipe(
      tap(_ => this.log(` contact name =${contact.firstName}`)),
      catchError(this.handleError<any>('create contact'))
    );
  }

  updateContact (contact: Contact): Observable<any> {
    const url = `${this.contactsUrl}/`;
    return this.http.put(url, contact, httpOptions).pipe(
      tap(_ => this.log(`updated Contact id=${contact.firstName} ${contact.lastName}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  deleteContact (contact: Contact): Observable<Contact> {
    const id = contact['_id'];
    const url = `${this.contactsUrl}/${id}`;
    console.log(url);
    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted contact id = ${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  addToFavorite(contact: Contact) {
    this.favoriteContacts.push(contact);
    this.log('added to favorites');
  }


  removeFromFavorite(contact: Contact) {
    const i = this.favoriteContacts.indexOf(contact);
    this.favoriteContacts.splice(i, 1);
    this.log('added to favorites');
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
  // getContacts(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(this.contactsUrl);  }
}
