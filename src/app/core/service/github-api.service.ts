import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { GithubUser } from '../model/github-user';
import { error } from 'selenium-webdriver';

@Injectable()
export class GithubApiService {

  private headers: Headers = new Headers();
  private apiServer: string = "https://api.github.com";


  constructor(private http: HttpClient) {
    this.headers.set("Content-Type", "application/json");
  }

  getUsers(filter?: string): Observable<GithubUser[]> {
    let endPoint = '/users';
    return this.get(endPoint);
  }

  search(q: string): Observable<GithubUser[]> {
    let endPoint = '/search/users?q=' + q;
    return this.get(endPoint);
  }

  getUserFollowers(user: string): Observable<GithubUser[]> {
    let endPoint = '/users/' + user + '/followers';
    return this.get(endPoint)
  }

  get(endPoint: string): Observable<GithubUser[]> {
    return this.http.get(this.createUrl(endPoint)).map((res) => res as GithubUser[])
  }

  createUrl(endPoint): string {
    let url = this.apiServer + endPoint;
    if (!endPoint.startsWith('/')) {
      url = this.apiServer + '/' + endPoint;
    }
    return url;
  }

}
