import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate {
  loggedIn: Observable<any>
  constructor(public AuthService: AuthService, public af: AngularFireAuth, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.af.authState.pipe(map((res) => {
      if (res && res.uid) {

       
        return true
      } else {
        this.router.navigate(['/'])


      }

    }))


  }
}
