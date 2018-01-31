import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../core/service/contact.service';
import { Contact } from '../../../core/model/contact';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Observable<Contact>;
  submitted = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contact = of(new Contact());
    this.contact = this.route.paramMap
    .switchMap((params: ParamMap) => 
        this.contactService.contacts.pipe(
          map(contacts => contacts.find(contact => contact['_id'] === params.get('id'))))
    ); 
    this.contactService.loadAll();   
  }

  onSubmit() {
    this.contact.subscribe(c => 
      this.contactService.update(c)
      .subscribe(_=> this.router.navigate(['/contacts']))
    )
    
  }

  cancelEdit(){
    this.router.navigate(['/contacts']);
  }
}
