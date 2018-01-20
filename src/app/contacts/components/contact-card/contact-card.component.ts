
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../../model/contact';
import {ContactService} from '../../../services/contact.service';

@Component({
  selector: 'contact-book-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contact;
  @Output() DeleteContactevent: EventEmitter<Contact> = new EventEmitter();
  @Output() FavoriteContactevent: EventEmitter<Contact> = new EventEmitter();

  constructor(
    private contactService: ContactService
  ) { }
  ngOnInit() {
  }

  delete(contact: Contact) {
    this.DeleteContactevent.emit(contact);
  }
  favorite(contact: Contact) {
    this.FavoriteContactevent.emit(contact);
  }

}
