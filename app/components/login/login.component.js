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
var Rx_1 = require("rxjs/Rx");
var LoginComponent = (function () {
    function LoginComponent(router, ref) {
        var _this = this;
        this.router = router;
        this.ref = ref;
        this.showErrorUsername = false;
        this.showErrorPassword = false;
        this.isRememberMe = false;
        this.showErrorCredentials = false;
        authentication_service_1.AuthenticationService.logged.subscribe(function (value) {
            if (value) {
                _this.goToSearch();
            }
        });
        authentication_service_1.AuthenticationService.incorrectCredentials.subscribe(function (value) {
            _this.showErrorCredentials = value;
        });
        Rx_1.Observable.fromEvent(this.ref.nativeElement, 'keyup').subscribe(function (e) {
            if (e.keyCode === 13) {
                _this.login();
            }
        });
    }
    LoginComponent.prototype.goToSearch = function () {
        this.router.navigate(['/search']);
    };
    LoginComponent.prototype.login = function () {
        this.showErrorCredentials = false;
        this.showErrorUsername = !this.username;
        this.showErrorPassword = !this.password;
        if (!this.username || !this.password) {
            return;
        }
        authentication_service_1.AuthenticationService.login(this.username, this.password);
    };
    LoginComponent.prototype.register = function () {
        this.router.navigate(['/registration']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map