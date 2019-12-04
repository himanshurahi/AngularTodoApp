import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class IsLoggedIn implements Resolve<any>{
    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    resolve(): void {

        this.authService.getUser().subscribe(data => {
            if (data && data.uid) {
                this.router.navigate(['/todos'])
            }
        })

    }
}