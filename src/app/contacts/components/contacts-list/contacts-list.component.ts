import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { ContactService } from '../../../core/service/contact.service';

@Component({
  selector: 'contact-book-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contactList:  Contact[];

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
  }

}
