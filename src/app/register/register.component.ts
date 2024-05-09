import {Router} from '@angular/router';
import {User} from './../model/User';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  user = new User();
  err: number = 0;

  constructor(private authService: AuthService,
              public router: Router) {
  }

  onRegister() {
    this.err = 0;
    this.authService.register(this.user).subscribe(() => {
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
      this.err = 1;
    });
  }


}
