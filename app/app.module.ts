import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from "@angular/common";
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

// import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/start/start.component';
import {SearchComponent} from './components/search/search.component';
import {AppComponent} from "./app.component";
import {NavBarComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HttpModule, Http} from "@angular/http";
import { AuthGuard } from './guards/auth-guard.service';
import { LoginBanGuard } from './guards/login-ban-guard';
import {AuthenticationService} from "./services/utils/authentication.service";

@NgModule({
    imports: [
        BrowserModule,
        Ng2BootstrapModule,
        AppRoutingModule,
        MyDatePickerModule,
        HttpModule,
        // TranslateModule.forRoot({
        //     provide: TranslateLoader,
        //     useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
        //     deps: [Http]
        // }),
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
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, AuthGuard, LoginBanGuard, AuthenticationService]
})

export class AppModule {
}
