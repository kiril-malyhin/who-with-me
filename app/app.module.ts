import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from "@angular/common";
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        Ng2BootstrapModule,
        AppRoutingModule
    ],
    declarations: [LoginComponent, AppComponent, HomeComponent],
    bootstrap: [AppComponent],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class AppModule {
}
