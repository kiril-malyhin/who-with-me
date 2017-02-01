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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../services/utils/authentication.service");
var language_service_1 = require("../../services/utils/language.service");
var ng2_translate_1 = require("ng2-translate");
var NavBarComponent = (function () {
    function NavBarComponent(router, translateService) {
        var _this = this;
        this.router = router;
        this.translateService = translateService;
        authentication_service_1.AuthenticationService.logged.subscribe(function (value) {
            _this.isUserLogged = !!value;
            if (!value) {
                _this.goToHome();
            }
        });
    }
    NavBarComponent.prototype.goToHome = function () {
        this.router.navigate(['/start']);
    };
    NavBarComponent.prototype.setLanguage = function (language) {
        this.translateService.use(language);
        language_service_1.LanguageService.setLanguage(language);
    };
    NavBarComponent.prototype.logout = function () {
        authentication_service_1.AuthenticationService.logout();
    };
    NavBarComponent.prototype.openProfile = function () {
        this.router.navigate(['/profile']);
    };
    NavBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-navbar',
            templateUrl: 'header.component.html',
            styleUrls: ['header.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_translate_1.TranslateService])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=header.component.js.map