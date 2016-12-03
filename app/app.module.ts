import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from "@angular/common";
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './home/login/login.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {AppComponent} from "./app.component";
import {NavBarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
    imports: [
        BrowserModule,
        Ng2BootstrapModule,
        AppRoutingModule,
        MyDatePickerModule
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        HomeComponent,
        SearchComponent,
        NavBarComponent,
        FooterComponent
    ],
    bootstrap: [AppComponent],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class AppModule {
}
