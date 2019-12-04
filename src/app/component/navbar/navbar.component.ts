import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false
  User;
  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router, private todoService: TodosService) {

  }

  ngOnInit() {

    this.authService.getUser().subscribe(data => {

      if (data) {
        this.User = data
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    })
  }

  onLogout() {
    this.afAuth.auth.signOut().then(data => [
      
      this.router.navigate(['/'])
    ])
  }

}
