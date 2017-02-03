import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from "@angular/common";
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './components/login/login.component';
import {SearchComponent} from './components/search/search.component';
import {AppComponent} from "./app.component";
import {NavBarComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";

import {HttpModule, Http} from "@angular/http";
import { AuthGuard } from './guards/auth-guard.service';
import { LoginBanGuard } from './guards/login-ban-guard';
import {AuthenticationService} from "./services/utils/authentication.service";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {StartComponent} from "./components/start/start.component";
import {HomeComponent} from "./components/home/home.component";

import {CalendarModule} from 'primeng/components/calendar/calendar';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
import {TabViewModule} from 'primeng/components/tabview/tabview';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import {DataListModule} from 'primeng/components/datalist/datalist';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {SliderModule} from 'primeng/components/slider/slider';
import {RadioButtonModule} from 'primeng/components/radiobutton/radiobutton';

@NgModule({
    imports: [
        BrowserModule,
        Ng2BootstrapModule,
        AppRoutingModule,
        MyDatePickerModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        }),
        CalendarModule,
        AutoCompleteModule,
        TabViewModule,
        AccordionModule,
        DataListModule,
        DialogModule,
        InputTextModule,
        SliderModule,
        RadioButtonModule
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        HomeComponent,
        SearchComponent,
        NavBarComponent,
        FooterComponent,
        ProfileComponent,
        RegistrationComponent,
        StartComponent
    ],
    bootstrap: [AppComponent],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, AuthGuard, LoginBanGuard, AuthenticationService]
})

export class AppModule {
}
