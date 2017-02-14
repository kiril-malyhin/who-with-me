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
var http_1 = require("@angular/http");
var LoginComponent = (function () {
    function LoginComponent(router, ref, http) {
        var _this = this;
        this.router = router;
        this.ref = ref;
        this.http = http;
        this.showErrorName = false;
        this.showErrorPassword = false;
        this.isRememberMe = false;
        this.showErrorCredentials = false;
        Rx_1.Observable.fromEvent(this.ref.nativeElement, 'keyup').subscribe(function (e) {
            if (e.keyCode === 13) {
                _this.login();
            }
        });
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.showErrorCredentials = false;
        this.showErrorName = !this.name;
        this.showErrorPassword = !this.password;
        if (!this.name || !this.password) {
            return;
        }
        this.http.get("http://localhost:4000/users")
            .toPromise()
            .then(function (res) {
            var self = _this;
            res.json().forEach(function (user) {
                if (user.name === self.name) {
                    self.id = user.id;
                }
            });
        })
            .then(function () {
            var data = {
                user: {
                    'id': _this.id,
                    'name': _this.name,
                    'password': _this.password,
                }
            };
            _this.http.post("http://localhost:4000/user_auth", data)
                .toPromise()
                .then(function (res) {
                authentication_service_1.AuthenticationService.login(res.json().name, res.json().id);
                _this.router.navigate(['/search']);
            })
                .catch(function () {
                _this.showErrorCredentials = true;
            });
        });
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
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, http_1.Http])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map