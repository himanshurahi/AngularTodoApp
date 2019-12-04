import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User: Observable<any>
  loggedIn = false
  uid;
  newUser;

  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(data => {
      this.uid = data && data.uid
     
    })
    this.User = this.afAuth.authState
    if (this.User) {

      this.User.pipe(map(user => {
        if (user) {

          this.loggedIn = true
          return { id: user.uid, displayName: user.displayName, email: user.email }
        }

      }))
    } else {

    }


  }

  login() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  getUser() {
    return this.User
  }

  getCurrentUserid(){
    return this.uid 
  }

 



  




  // getCurrentUserId(){
  //   this.afAuth.user.subscribe(data => {
  //     return data.uid
  //   })
  // }

}
