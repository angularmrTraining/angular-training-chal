import { Component, OnInit, Input } from '@angular/core';


import { Contact } from '../../../model/contact';
import { ContactService} from '../../../services/contact.service';
import { containerEnd } from '@angular/core/src/render3/instructions';
@Component({
  selector: 'contact-book-contact-form', 
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  genders = ['female', 'male'];
  @Input() contact: Contact;
  submitted = false;

  constructor( private contactService: ContactService) {
  }
  ngOnInit() { }

  // onSubmit() {
  //   console.log(this);
  //   this.contactService.addContact(this.contact)
  //    .subscribe(() => this.submitted = true);
  // }
  // get diagnostic() {
  //   return JSON.stringify(this.contact);
  // }

  // newContact() {
  //   this.contact = new Contact();
  // }


}
