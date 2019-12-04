import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User;
  loggedIn = false
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {

  }

  onLogin() {
    this.authService.login().then(() => {
      this.router.navigate(['/todos'])
    })
  }

}
