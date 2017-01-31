import { Component } from '@angular/core';
import {AuthenticationService} from "./services/utils/authentication.service";
import {AuthGuard} from "./guards/auth-guard.service";

@Component({
    moduleId: module.id,
    selector: 'app-main',
    providers: [AuthGuard, AuthenticationService],
    template: `
    <app-navbar></app-navbar> 
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent { }