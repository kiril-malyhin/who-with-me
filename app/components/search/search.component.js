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
var dataCountries_1 = require("../../services/data/dataCountries");
var router_1 = require("@angular/router");
var search_service_1 = require("../../services/utils/search.service");
var SearchComponent = (function () {
    function SearchComponent(router) {
        this.router = router;
        this.countryTo = search_service_1.SearchService.getParameters().destinationTo || '';
        this.countryFrom = search_service_1.SearchService.getParameters().destinationFrom || '';
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.setDate();
    };
    SearchComponent.prototype.setDate = function () {
        var today = new Date();
        var month = today.getMonth();
        var prevMonth = (month === 0) ? 11 : month - 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
    };
    SearchComponent.prototype.filterCountrySingle = function (event) {
        var query = event.query;
        this.filteredCountriesSingle = this.filterCountry(query, dataCountries_1.default);
    };
    SearchComponent.prototype.filterCountry = function (query, countries) {
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    };
    SearchComponent.prototype.findTrip = function () {
        var date = this.dateTo.toString();
        date = date.substring(0, date.indexOf(" GMT"));
        if (!this.countryFrom['name'] || !this.countryTo['name'] || !date) {
            if (!this.countryFrom || !this.countryTo || !date) {
                alert('Error! Check input!');
                return;
            }
            else {
                search_service_1.SearchService.setParameters(this.countryFrom, this.countryTo, date);
                this.router.navigate(['/home']);
            }
        }
        else {
            search_service_1.SearchService.setParameters(this.countryFrom['name'], this.countryTo['name'], date);
            this.router.navigate(['/home']);
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map