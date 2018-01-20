import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {
  private username: string;
  private client_id = '7a2cc1dbb590d7d96d79';
  private client_secret = '3479077532071c6ca40327135806f09266052991';
  constructor(private _http: Http) {
    this.username = 'Lazhari';
  }

  getUser() {
    return this._http.get(`http://api.github.com/users/${this.username}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
      .map(res => res.json());
  }
  getRepos() {
    return this._http.get(`http://api.github.com/users/${this.username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&sort=created`)
      .map(res => res.json());
  }

  updateUser(username: string) {
    this.username = username;
  }


}
