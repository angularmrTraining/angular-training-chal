import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  repos: any;
  constructor(private _githubService: GithubService) {
  }

  ngOnInit() {
    this._githubService.getUser().subscribe(user => {
      this.user = user;
    });
  }

}
