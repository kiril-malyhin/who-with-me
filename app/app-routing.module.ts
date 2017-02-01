import {NgModule}             from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {SearchComponent} from "./components/search/search.component";
import {LoginBanGuard} from "./guards/login-ban-guard";
import {AuthGuard} from "./guards/auth-guard.service";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
    {path: '', redirectTo: '/start', pathMatch: 'full'},
    {path: 'start',component: StartComponent, canActivate: [LoginBanGuard]},
    {path: 'search',component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'profile',component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'home',component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'registration',component: RegistrationComponent},
    { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
