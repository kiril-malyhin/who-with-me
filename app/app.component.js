"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_guard_service_1 = require("./guards/auth-guard.service");
var language_service_1 = require("./services/utils/language.service");
var ng2_translate_1 = require("ng2-translate");
var AppComponent = (function () {
    function AppComponent(translateService) {
        this.translateService = translateService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.setDefaultUiLanguage();
    };
    AppComponent.prototype.setDefaultUiLanguage = function () {
        var browserLang = language_service_1.LanguageService.getLanguage() || this.translateService.getBrowserLang();
        if (browserLang.match(/en|ru/)) {
            this.translateService.use(browserLang);
        }
        else {
            this.translateService.use('en');
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-main',
            providers: [auth_guard_service_1.AuthGuard],
            template: "\n    <app-navbar></app-navbar> \n    <router-outlet></router-outlet>\n    <app-footer></app-footer>\n  "
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map