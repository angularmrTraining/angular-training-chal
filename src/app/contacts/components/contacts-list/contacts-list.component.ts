import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../model/contact';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'contact-book-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contactList:  Contact[];
  favoriteContact: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts()
      .subscribe(response => {
        this.contactList = response['contacts'];
        console.log(response);
      });
      console.log(this.contactList);
  }
  deleteContact(contact: Contact) {
   if (window.confirm('do you realy want to delete this contact ?')) {
    this.contactList = this.contactList.filter(obj => obj !== contact);
    this.contactService.deleteContact(contact).subscribe();
  }
  }
  favoriteContacts(contact: Contact) {
    console.log("hete");
    console.log(contact.firstName);
    this.contactService.addToFavorite(contact);
  }

}
