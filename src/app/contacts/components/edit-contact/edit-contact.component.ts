import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../core/service/contact.service';
import { Contact } from '../../../core/model/contact';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact;
  submitted = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contact = new Contact();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.contactService.getContact(params.get('id')))
      .subscribe((data) => this.contact = data['contact'] );
  }


  onSubmit() {
      this.contactService.updateContact(this.contact)
      .subscribe(() => this.submitted = true);
  }

}
