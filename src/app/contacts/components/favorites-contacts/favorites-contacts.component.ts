import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { ContactService } from '../../../core/service/contact.service';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'contact-book-favorites-contacts',
  templateUrl: './favorites-contacts.component.html',
  styleUrls: ['./favorites-contacts.component.css']
})
export class FavoritesContactsComponent implements OnInit {

  contacts: Observable<Contact[]>;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.contacts;
    this.contactService.loadFavorites();
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
