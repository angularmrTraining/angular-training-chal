import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../../core/model/address';

@Component({
  selector: 'app-contact-address',
  templateUrl: './contact-address.component.html',
  styleUrls: ['./contact-address.component.css']
})
export class ContactAddressComponent implements OnInit {

  @Input() address: Address;

  constructor() {
    //this.address = new Address();
   }

  ngOnInit() {
  }

}
