import {User} from './../model/User';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = 'http://localhost:8081/users';
  token?: string | null;
  public loggedUser?: string;
  public isLoggedIn: boolean = false;
  public roles?: string[];
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, {
      observe: 'response',
    });
  }

  register(user: User) {
    return this.http.post<void>(this.apiURL + '/register', user);
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isLoggedIn = true;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }

  getToken(): string {
    return this.token!;
  }

  logout() {
    this.loggedUser = undefined;
    this.roles = undefined;
    this.token = undefined;
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token!);
  }
}
