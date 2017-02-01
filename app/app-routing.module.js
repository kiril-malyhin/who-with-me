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
var router_1 = require('@angular/router');
var start_component_1 = require("./components/start/start.component");
var search_component_1 = require("./components/search/search.component");
var login_ban_guard_1 = require("./guards/login-ban-guard");
var auth_guard_service_1 = require("./guards/auth-guard.service");
var profile_component_1 = require("./components/profile/profile.component");
var registration_component_1 = require("./components/registration/registration.component");
exports.routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'start', component: start_component_1.HomeComponent, canActivate: [login_ban_guard_1.LoginBanGuard] },
    { path: 'search', component: search_component_1.SearchComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: '**', redirectTo: '/start', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map