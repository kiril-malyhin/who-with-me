import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/utils/authentication.service";
import {AuthGuard} from "./guards/auth-guard.service";
import {LanguageService} from "./services/utils/language.service";
import {TranslateService} from "ng2-translate";

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
export class AppComponent implements OnInit{
    constructor(private translateService: TranslateService) {}
    ngOnInit(): void {
        this.setDefaultUiLanguage();
    }

    private setDefaultUiLanguage() {
        const browserLang = LanguageService.getLanguage() || this.translateService.getBrowserLang();
        if (browserLang.match(/en|ru/)) {
            this.translateService.use(browserLang);
        } else {
            this.translateService.use('en');
        }
    }
}