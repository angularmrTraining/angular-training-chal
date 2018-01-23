import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'contact-book-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
})
export class ContactCardComponent implements OnInit {

  @Input() contact: Contact;
  @Output() deleteEvent: EventEmitter<Contact> = new EventEmitter();
  @Output() favoriteEvent: EventEmitter<Contact> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onDelete(contact) {
    this.deleteEvent.emit(contact);
  }

  onFavorite(contact) {
    this.favoriteEvent.emit(contact);
    this.contact.favorite = !this.contact.favorite
  }
}
