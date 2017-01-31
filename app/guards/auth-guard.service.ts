import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/utils/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        if (!AuthenticationService.isLogged()) {
            this.router.navigate(['/start']);
            return true;
        }
        return true;
    }
}
