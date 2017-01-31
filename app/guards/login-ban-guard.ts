import { AuthenticationService } from '../services/utils/authentication.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginBanGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        if (AuthenticationService.isLogged()) {
            this.router.navigate(['/search']);
            return false;
        }
        return true;
    }
}
