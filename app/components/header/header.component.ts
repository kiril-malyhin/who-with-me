import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {LanguageService} from "../../services/utils/language.service";
import {TranslateService} from "ng2-translate";

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'header.component.html',
    styleUrls: [ 'header.component.css' ]
})

export class NavBarComponent {

    isUserLogged: boolean;

    constructor(private router: Router, private translateService: TranslateService,) {
        AuthenticationService.logged.subscribe(value => {
            this.isUserLogged = !!value;
            if (!value) {
                this.goToHome();
            }
        });
    }
    goToHome(): void {
        this.router.navigate(['/start']);
    }

    setLanguage(language: string): void {
        this.translateService.use(language);
        LanguageService.setLanguage(language);
    }

    logout() {
        AuthenticationService.logout();
    }

    openProfile() {
        this.router.navigate(['/profile']);
    }
}