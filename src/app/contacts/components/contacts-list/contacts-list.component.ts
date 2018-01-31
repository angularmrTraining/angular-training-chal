import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { ContactService } from '../../../core/service/contact.service';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/operators/concat';

@Component({
  selector: 'contact-book-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Observable<Contact[]>;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.contacts;
    this.contactService.loadAll();
  }

  deleteContact(contact) {
    if(window.confirm(`Are sure you want to remove ${contact.email} ?`)){
      this.contactService.remove(contact).subscribe(data => console.log('deleted'));
    } 
  }

  togglefavoriteContact(contact) {
    if(contact.favorite){
      this.contactService.removeFromFavorite(contact)
    } else { 
      this.contactService.addToFavorite(contact)
    }
    contact.favorite =   contact.favorite
  }
}
