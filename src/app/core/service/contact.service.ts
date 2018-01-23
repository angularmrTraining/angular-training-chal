import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

import { Contact } from '../model/contact'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain' })                       
};

@Injectable()
export class ContactService {

  private _contacts: BehaviorSubject<Contact[]>;
  private dataStore: {
    contacts: Contact[],
    favorites: Contact[]
  };
  private APIUrl = 'https://mini-crm-api.herokuapp.com/api/v1/contacts';  

  contacts: Observable<Contact[]>;

  constructor( private http: HttpClient ) {
    this.dataStore = { contacts: [], favorites: [] };
    this._contacts = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
    this.contacts = this._contacts.asObservable();
  }

  loadAll() {
    this.http.get(`${this.APIUrl}`).subscribe(data => {
      this.dataStore.contacts = data['contacts'];
      this.dataStore.contacts.forEach((c,i) => {
        c.favorite = (this.dataStore.favorites.indexOf(c) > -1 )? true:false
      })
      this._contacts.next(Object.assign({}, this.dataStore).contacts);
    }, error => console.log('Could not load contacts.'));
  }

  loadFavorites() {
    this.http.get(`${this.APIUrl}`).subscribe(data => {
      //meeeh!!
      this.dataStore.contacts = data['contacts'];
      this._contacts.next(Object.assign({}, this.dataStore).favorites);
    }, error => console.log('Could not load favorite contacts.'));
  }


  load(contact: Contact | string) {
    console.log(contact)
    const id = typeof contact === 'string' ? contact : contact['_id'];
    const url = `${this.APIUrl}/${id}`;

    this.http.get(`${url}`).subscribe(data => {
      let notFound = true;

      this.dataStore.contacts.forEach((item, index) => {
        if (item['_id'] === data['_id']) {
          this.dataStore.contacts[index] = data['contact'];
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.contacts.push(data['contact']);
      }

      this._contacts.next(Object.assign({}, this.dataStore).contacts);
    }, error => console.log('Could not load contact.'));
  }

  create(contact: Contact) {
    return this.http.post(`${this.APIUrl}`, contact)
    .pipe(
      tap(data => {
        this.dataStore.contacts.push(data['contact']);
        this._contacts.next(Object.assign({}, this.dataStore).contacts);
        this.log(`new Contact name=${contact.firstName}`)
      }),
      catchError(this.handleError<Contact>('Add Contact'))
    )
  }

  update(contact: Contact) {
    const url = `${this.APIUrl}/${contact['_id']}`;

    return this.http.put(`${url}`, JSON.stringify(contact))
    .pipe(
      tap(data => {
        this.dataStore.contacts.forEach((t, i) => {
          if (t['_contact'] === data['_id']) { 
            this.dataStore.contacts[i] = data['contact'];
           }
        });

        this._contacts.next(Object.assign({}, this.dataStore).contacts);
      }), 
      catchError(this.handleError<Contact>('Update Contact'))
    )
  }

  remove(contact: Contact | string) {
    const id = typeof contact === 'string' ? contact : contact['_id'];
    const url = `${this.APIUrl}/${id}`;

    return this.http.delete<Contact>(`${url}`, httpOptions).pipe(
      tap(data => { 
        this.dataStore.contacts.forEach((t, i) => {
          if (t['_id'] === id) { this.dataStore.contacts.splice(i, 1); }
        });
        this._contacts.next(Object.assign({}, this.dataStore).contacts);
      }),
      catchError(this.handleError<Contact>('Delete Contact'))
    );
  }

  removeFromFavorite(contact: Contact){
    this.dataStore.favorites.filter( c => c === contact)
  }

  addToFavorite(contact: Contact){
    this.dataStore.favorites.push(contact);
  }

  private log (message: string){
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      // contact: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
