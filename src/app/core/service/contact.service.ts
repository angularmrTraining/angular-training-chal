import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from '../model/contact'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContactService {

  private APIUrl = 'https://mini-crm-api.herokuapp.com/api/v1/contacts';  

  constructor( private http: HttpClient ) {
    
  }

  getContact(id: string): Observable<Contact>{
    const url = `${this.APIUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(_ => this.log(`fetched Contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.APIUrl).pipe(
      catchError(this.handleError('getContacts', []))
    );
  }

  addContact (contact: Contact):  Observable<any> {
    return this.http.post(this.APIUrl, contact , httpOptions).pipe(
      tap(_ => this.log(`new Contact name=${contact.firstName}`)),
      catchError(this.handleError<Contact>('Add Contact'))
    );
  }

  updateContact (contact:Contact): Observable<any> {
    const url = `${this.APIUrl}/${contact._id}`;
    return this.http.put(url, contact, httpOptions).pipe(
      tap(_ => this.log(`updated Contact id=${contact.firstName} ${contact.lastName}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  private log (message: string){
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
