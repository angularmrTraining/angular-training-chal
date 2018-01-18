import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { ContactService } from '../../../core/service/contact.service';


@Component({
  selector: 'contact-book-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  genders = ['male', 'female'];
  @Input() contact: Contact;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() { }

}
