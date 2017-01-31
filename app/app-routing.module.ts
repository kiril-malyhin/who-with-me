import {NgModule}             from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/start/start.component";
import {SearchComponent} from "./components/search/search.component";
import {LoginBanGuard} from "./guards/login-ban-guard";
import {AuthGuard} from "./guards/auth-guard.service";

export const routes: Routes = [
    {path: '', redirectTo: '/start', pathMatch: 'full'},
    {path: 'start',component: HomeComponent, canActivate: [LoginBanGuard]},
    {path: 'search',component: SearchComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
