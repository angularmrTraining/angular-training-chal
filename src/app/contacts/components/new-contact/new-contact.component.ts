import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../model/contact';
import { ContactService} from '../../../services/contact.service';

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
    this.contact = new Contact();
  }

  onSubmit() {
    console.log(this);
    this.contactService.addContact(this.contact)
     .subscribe(() => this.submitted = true);
  }
  get diagnostic() {
    return JSON.stringify(this.contact);
  }

  newContact() {
    this.contact = new Contact();
  }


}
