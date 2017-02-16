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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require("@angular/common");
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var my_date_picker_module_1 = require('mydatepicker/dist/my-date-picker.module');
var ng2_translate_1 = require('ng2-translate');
var app_routing_module_1 = require("./app-routing.module");
var login_component_1 = require('./components/login/login.component');
var search_component_1 = require('./components/search/search.component');
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/header/header.component");
var footer_component_1 = require("./components/footer/footer.component");
var http_1 = require("@angular/http");
var auth_guard_service_1 = require('./guards/auth-guard.service');
var login_ban_guard_1 = require('./guards/login-ban-guard');
var authentication_service_1 = require("./services/utils/authentication.service");
var profile_component_1 = require("./components/profile/profile.component");
var registration_component_1 = require("./components/registration/registration.component");
var start_component_1 = require("./components/start/start.component");
var home_component_1 = require("./components/home/home.component");
var calendar_1 = require('primeng/components/calendar/calendar');
var autocomplete_1 = require('primeng/components/autocomplete/autocomplete');
var tabview_1 = require('primeng/components/tabview/tabview');
var accordion_1 = require('primeng/components/accordion/accordion');
var datalist_1 = require('primeng/components/datalist/datalist');
var dialog_1 = require('primeng/components/dialog/dialog');
var inputtext_1 = require('primeng/components/inputtext/inputtext');
var slider_1 = require('primeng/components/slider/slider');
var radiobutton_1 = require('primeng/components/radiobutton/radiobutton');
var progressbar_1 = require('primeng/components/progressbar/progressbar');
var confirmdialog_1 = require('primeng/components/confirmdialog/confirmdialog');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var datatable_1 = require('primeng/components/datatable/datatable');
var dropdown_1 = require('primeng/components/dropdown/dropdown');
var fileupload_1 = require('primeng/components/fileupload/fileupload');
var request_service_1 = require("./services/utils/request.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng2_bootstrap_1.Ng2BootstrapModule,
                app_routing_module_1.AppRoutingModule,
                my_date_picker_module_1.MyDatePickerModule,
                http_1.HttpModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, '/assets/i18n', '.json'); },
                    deps: [http_1.Http]
                }),
                calendar_1.CalendarModule,
                autocomplete_1.AutoCompleteModule,
                tabview_1.TabViewModule,
                accordion_1.AccordionModule,
                datalist_1.DataListModule,
                dialog_1.DialogModule,
                inputtext_1.InputTextModule,
                slider_1.SliderModule,
                radiobutton_1.RadioButtonModule,
                progressbar_1.ProgressBarModule,
                confirmdialog_1.ConfirmDialogModule,
                primeng_2.SharedModule,
                datatable_1.DataTableModule,
                dropdown_1.DropdownModule,
                fileupload_1.FileUploadModule
            ],
            declarations: [
                login_component_1.LoginComponent,
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                search_component_1.SearchComponent,
                header_component_1.NavBarComponent,
                footer_component_1.FooterComponent,
                profile_component_1.ProfileComponent,
                registration_component_1.RegistrationComponent,
                start_component_1.StartComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, auth_guard_service_1.AuthGuard, login_ban_guard_1.LoginBanGuard, authentication_service_1.AuthenticationService, request_service_1.RequestService, primeng_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map