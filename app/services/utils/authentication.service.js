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
require('node_modules/rxjs/add/operator/map');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Subject_1 = require("rxjs/Subject");
var AuthenticationService = (function () {
    function AuthenticationService() {
    }
    AuthenticationService.isLogged = function () {
        return this.logged.getValue();
    };
    AuthenticationService.login = function (name, id) {
        localStorage.setItem('name', name);
        localStorage.setItem('id', id);
        this.logged.next(true);
    };
    AuthenticationService.getUserCredentials = function () {
        var name = localStorage.getItem('name');
        var id = localStorage.getItem('id');
        return { name: name, id: id };
    };
    AuthenticationService.logout = function () {
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('destinationFrom');
        localStorage.removeItem('destinationTo');
        localStorage.removeItem('destinationDate');
        this.logged.next(false);
    };
    AuthenticationService.logged = new BehaviorSubject_1.BehaviorSubject(!!localStorage.getItem('name'));
    AuthenticationService.incorrectCredentials = new Subject_1.Subject();
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map