import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../model/contact';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'contact-book-favorites-contacts',
  templateUrl: './favorites-contacts.component.html',
  styleUrls: ['./favorites-contacts.component.css']
})
export class FavoritesContactsComponent implements OnInit {

  contactFavoriteList:  Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getFavoritContacts();
  }

  getFavoritContacts(): void {
    this.contactService.getfavoriteContacts()
      .subscribe(response => {
        this.contactFavoriteList = response;
        console.log(response);
      });
      console.log(this.contactFavoriteList);
  }
  deleteContact(contact: Contact) {

   if (window.confirm('do you realy want to delete this contact ?')) {
    this.contactFavoriteList = this.contactFavoriteList.filter(obj => obj !== contact);
    this.contactService.deleteContact(contact).subscribe();
  }
  }

}
