import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";


import { GithubUser } from '../../app/core/model/github-user'
import { GithubApiService } from '../core/service/github-api.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  cache = {
    users: [],
    selectedUser: [],
  };

  users: GithubUser[] = [];
  search: Subject<string> = new Subject<string>();
  selectedUser: GithubUser = new GithubUser();
  loadingFollowers: boolean = false;

  constructor(private githubapiService: GithubApiService) {
    this.search.debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.githubapiService.search(term))
      .subscribe(res => this.users = <GithubUser[]> res['items'])
  }

  ngOnInit() {
    this.githubapiService.getUsers().subscribe(res => {
      this.cache.users = res; // store cached for next time.
      this.users = res;
    }, error => console.log(error));
  }


  /**
   * On user typing key to search.
   */
  onSearch(q: string) {

    if (q !== "") {
      this.search.next(q);
    } else {
      //if empty search box we restore first users
      this.users = this.cache.users;
    }

  }

  go(s: string) {
    if (s == 'home') {
      this.selectedUser = new GithubUser();
      this.users = this.cache.users;
    }
  }

  viewUser(user: GithubUser) {

    this.selectedUser = user;

    let userInCache: GithubUser = this.findUserInCache(user);
    // let find if existing in cache we return and no longer call to api again
    if (userInCache) {
      this.selectedUser = userInCache;
    } else {
      // get followers of this user
      this.loadingFollowers = true;

      this.githubapiService.getUserFollowers(user.login).subscribe(res => {
        this.selectedUser.followers = res as GithubUser[];
        this.cacheSelectUser(this.selectedUser);
        this.loadingFollowers = false;

      }, err => {
        console.log(err);
        this.loadingFollowers = false;
      });
    }
  }

  cacheSelectUser(user: GithubUser) {
    if (!this.findUserInCache(user)) {
      this.cache.selectedUser.push(user);
    }

  }

  findUserInCache(user: GithubUser): GithubUser {
    for (var i = 0; i < this.cache.selectedUser.length; i++) {
      if (this.cache.selectedUser[i].login == user.login) {
        return this.cache.selectedUser[i];
      }
    }
    return null;
  }
}
