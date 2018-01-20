import { Component, OnInit, Input } from '@angular/core';
import { Adress } from '../../../../model/adress';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {
  @Input() adress: Adress;
  constructor() { }

  ngOnInit() { }

}
