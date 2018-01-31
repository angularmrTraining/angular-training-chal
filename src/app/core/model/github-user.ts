export class GithubUser {
    public login?: string;
    public id?: string;
    public avatar_url?: string;
    public url?: string;
    public followers_url?: string;
    public email?: string;
    public followers?: GithubUser[];
}
