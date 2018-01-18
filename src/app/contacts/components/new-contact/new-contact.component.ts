import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { ContactService } from '../../../core/service/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  contact: Contact;
  submitted = false;
  
  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contact = new Contact()
  }

  onSubmit() {
    this.contactService.addContact(this.contact)
      .subscribe(() => this.submitted = true);
  }

  newContact() {
    this.contact = new Contact();
  }

}
