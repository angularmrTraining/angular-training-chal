import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../core/model/contact';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contact-book-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  @Input() contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }


}
