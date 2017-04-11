webpackJsonp([1,4],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(312);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.getUrl = '/webapi/data';
        this.usageUrl = '/webapi/usage';
        this.nameUrl = '/webapi/name';
        this.deviceUrl = '/webapi/device';
    }
    DataService.prototype.get = function (id) {
        var lineChartData$ = this.http
            .get((this.getUrl + "/" + id + "/group/hour"), { headers: this.getHeaders() })
            .map(mapData);
        return lineChartData$;
    };
    DataService.prototype.pick = function (id, group, date1, date2) {
        var lineChartData$ = this.http
            .get((this.getUrl + "/" + id + "/group/" + group + "/" + date1 + "/" + date2), { headers: this.getHeaders() })
            .map(mapData);
        return lineChartData$;
    };
    DataService.prototype.usage = function (id) {
        var usageData$ = this.http
            .get((this.usageUrl + "/" + id), { headers: this.getHeaders() })
            .map(mapUsage);
        return usageData$;
    };
    DataService.prototype.name = function (id) {
        var nameData$ = this.http
            .get((this.nameUrl + "/" + id), { headers: this.getHeaders() })
            .map(mapName);
        return nameData$;
    };
    DataService.prototype.devices = function () {
        var devices$ = this.http
            .get(("" + this.deviceUrl), { headers: this.getHeaders() })
            .map(mapDevice);
        return devices$;
    };
    DataService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Headers */]();
        headers.append('Accept', 'application/json');
        return headers;
    };
    DataService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], DataService);
    return DataService;
    var _a;
}());
function mapData(response) {
    var TOE1S = response.json().map(toe1ToData);
    var TOE2S = response.json().map(toe2ToData);
    var HOV = response.json().map(hovToData);
    var TTE1S = response.json().map(tte1ToData);
    var TTE2S = response.json().map(tte2ToData);
    var HTV = response.json().map(htvToData);
    var HT = response.json().map(htToData);
    var times = response.json().map(timeToData);
    var Toe1Line = ({ data: TOE1S, label: "Totaal Energieverbruik tarief 1" });
    var Toe2Line = ({ data: TOE2S, label: "Totaal Energieverbruik tarief 2" });
    var HovLine = ({ data: HOV, label: "Huidig Energieverbruik" });
    var Tte1Line = ({ data: TTE1S, label: "Totaal terug Energieverbruik tarief 1" });
    var Tte2Line = ({ data: TTE2S, label: "Totaal terug Energieverbruik tarief 2" });
    var HtvLine = ({ data: HTV, label: "Huidig terug Energieverbruik" });
    var HtLine = ({ data: HT, label: "Huidig Tarief" });
    var label = ({ data: times });
    var graph = ({ TOE1: Toe1Line, TOE2: Toe2Line, HOV: HovLine, TTE1: Tte1Line, TTE2: Tte2Line, HTV: HtvLine, HT: HtLine, labels: label });
    return graph;
}
function toe1ToData(r) {
    var TOE1 = r.TOE1;
    return TOE1;
}
function toe2ToData(r) {
    var TOE2 = r.TOE2;
    return TOE2;
}
function hovToData(r) {
    var HOV = r.HOV;
    return HOV;
}
function tte1ToData(r) {
    var TTE1 = r.TTE1;
    return TTE1;
}
function tte2ToData(r) {
    var TTE2 = r.TTE2;
    return TTE2;
}
function htvToData(r) {
    var HTV = r.HTV;
    return HTV;
}
function htToData(r) {
    var HT = r.HT;
    return HT;
}
function timeToData(r) {
    var times = r.time.substring(11, 19);
    return times;
}
function mapUsage(response) {
    var usage = response.json().map(toUsage);
    return usage[0];
}
function toUsage(r) {
    var htname = "nacht";
    if (r.HT == 2) {
        htname = "dag";
    }
    var usage = ({
        HOV: r.HOV,
        HTV: r.HTV,
        HT: r.HT,
        HTN: htname,
        TOE1: r.TOE1,
        TOE2: r.TOE2,
        TTE1: r.TTE1,
        TTE2: r.TTE2,
        tarief1: r.tarief1,
        tarief2: r.tarief2
    });
    return usage;
}
function mapName(response) {
    var name = response.json().map(toName);
    return name[0];
}
function toName(r) {
    return r.name;
}
function mapDevice(response) {
    var devices = response.json().map(toDevice);
    return devices;
}
function toDevice(r) {
    var device = ({
        sn: r.SN,
        name: r.name
    });
    return device;
}
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/data.service.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabelData; });
var LabelData = (function () {
    function LabelData() {
    }
    return LabelData;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/label-data.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineData; });
var LineData = (function () {
    function LineData() {
    }
    return LineData;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/line-data.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_IntervalObservable__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = (function () {
    function DashboardComponent(dataService) {
        this.dataService = dataService;
        this.mloaded = false;
        this.kloaded = false;
        this.dbloaded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refreshData();
        this.subscription = __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_IntervalObservable__["IntervalObservable"].create(7500).subscribe(function (n) { return _this.refreshData(); });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DashboardComponent.prototype.refreshData = function () {
        var _this = this;
        console.log("Refreshing data");
        this.label = ({ data: ["Huidig opgenomen", "Huidig terug"] });
        this.dataService
            .usage("4530303035303031353538313833363134")
            .subscribe(function (res) {
            _this.data1 = ({ data: [res.HOV, res.HTV], label: "Verbruik Martijn" });
            _this.mloaded = true;
        });
        this.dataService
            .usage("4530303235303030303636383733323136")
            .subscribe(function (res) {
            _this.data2 = ({ data: [res.HOV, res.HTV], label: "Verbruik Kenneth" });
            _this.kloaded = true;
        });
        this.dataService
            .get("4530303235303030303636383733323136")
            .subscribe(function (res) {
            _this.data3 = res.HOV;
            _this.label2 = res.labels;
        });
        this.dataService
            .get("4530303035303031353538313833363134")
            .subscribe(function (res) {
            _this.data4 = res.HOV;
            console.log(_this.data4);
            _this.dbloaded = true;
        });
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'dashboard',
            template: __webpack_require__(676)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]) === 'function' && _a) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/dashboard.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DetailComponent = (function () {
    function DetailComponent(dataService, route) {
        this.dataService = dataService;
        this.route = route;
        this.id = 'Loading';
        this.name = "Loading";
        this.hov = 0;
        this.htv = 0;
        this.ht = "loading";
        this.money = 0;
        this.loaded = false;
        this.pieloaded = false;
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        this.refreshData(this.id);
        this.subscription = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(7500).subscribe(function (n) { return _this.refreshData(_this.id); });
    };
    DetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DetailComponent.prototype.refreshData = function (id) {
        var _this = this;
        console.log("Refreshing data for ", this.id);
        this.labelpie1 = ({ data: ["Huidig opgenomen", "Huidig terug"] });
        this.labelpie2 = ({ data: ["Totaal opgenomen 2", "Totaal terug 2"] });
        this.labelpie3 = ({ data: ["Totaal opgenomen 1", "Totaal terug 1"] });
        this.dataService
            .get(id)
            .subscribe(function (res) {
            _this.label = res.labels;
            _this.data1 = res.HOV;
            _this.data2 = res.HTV;
            _this.data3 = res.TOE2;
            _this.data4 = res.TTE2;
            _this.data3 = res.TOE1;
            _this.data4 = res.TTE1;
            _this.loaded = true;
        });
        this.dataService
            .usage(id)
            .subscribe(function (res) {
            _this.hov = res.HOV;
            _this.htv = res.HTV;
            _this.ht = res.HTN;
            _this.money = ((res.TOE1 - res.TTE1) * res.tarief1) + ((res.TOE2 - res.TTE2) * res.tarief2);
            _this.datapie1 = ({ data: [res.HOV, res.HTV], label: "Huidig verbruik" });
            _this.datapie2 = ({ data: [res.TOE2, res.TTE2], label: "Totaal 2" });
            _this.datapie3 = ({ data: [res.TOE1, res.TTE1], label: "Totaal 1" });
            _this.pieloaded = true;
        });
        this.dataService
            .name(id)
            .subscribe(function (res) {
            _this.name = res;
        });
    };
    DetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'detail',
            template: __webpack_require__(677)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], DetailComponent);
    return DetailComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/detail.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(215);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeviceComponent = (function () {
    function DeviceComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
    }
    DeviceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService
            .devices()
            .subscribe(function (res) {
            _this.devices = res;
        });
    };
    DeviceComponent.prototype.goToDetails = function (id) {
        this.router.navigate(['/detail', id]);
    };
    DeviceComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'device',
            template: __webpack_require__(678)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]) === 'function' && _b) || Object])
    ], DeviceComponent);
    return DeviceComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/device.component.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PickerComponent = (function () {
    function PickerComponent(dataService) {
        this.dataService = dataService;
        this.loaded = false;
    }
    PickerComponent.prototype.refreshData = function (id, group, date1, date2, property) {
        var _this = this;
        this.dataService
            .pick(id, group, date1, date2)
            .subscribe(function (res) {
            _this.label = res.labels;
            _this.data = res[property];
            _this.loaded = true;
        });
    };
    PickerComponent.prototype.onSubmit = function (form) {
        this.loaded = false;
        console.log(form);
        this.refreshData(form.meter, form.group, form.date1, form.date2, form.datatype);
    };
    PickerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'picker',
            template: __webpack_require__(680)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]) === 'function' && _a) || Object])
    ], PickerComponent);
    return PickerComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/picker.component.js.map

/***/ }),

/***/ 393:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 393;


/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(513);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/main.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__device_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__picker_component__ = __webpack_require__(338);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */] },
    { path: 'device', component: __WEBPACK_IMPORTED_MODULE_3__device_component__["a" /* DeviceComponent */] },
    { path: 'picker', component: __WEBPACK_IMPORTED_MODULE_5__picker_component__["a" /* PickerComponent */] },
    { path: 'detail/:id', component: __WEBPACK_IMPORTED_MODULE_4__detail_component__["a" /* DetailComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/app-routing.module.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(674),
            styles: [__webpack_require__(673)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/app.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chart_component__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__piechart_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__doublelinechart_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__device_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__detail_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__picker_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__data_service__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__chart_component__["a" /* LineChartComponent */],
                __WEBPACK_IMPORTED_MODULE_9__doublelinechart_component__["a" /* DoubleLineChartComponent */],
                __WEBPACK_IMPORTED_MODULE_8__piechart_component__["a" /* PieChartComponent */],
                __WEBPACK_IMPORTED_MODULE_10__dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_11__device_component__["a" /* DeviceComponent */],
                __WEBPACK_IMPORTED_MODULE_12__detail_component__["a" /* DetailComponent */],
                __WEBPACK_IMPORTED_MODULE_13__picker_component__["a" /* PickerComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_14__data_service__["a" /* DataService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/app.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_data__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__label_data__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LineChartComponent = (function () {
    function LineChartComponent() {
        // lineChart
        this.lineChartData = [
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'Verbruik' }
        ];
        this.lineChartLabels = ['-1', '-2', '-3', '-4', '-5', '-6', '-7'];
        this.lineChartOptions = {
            responsive: true,
            title: {
                display: true,
                position: 'left',
                text: 'KiloWatt'
            }
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    LineChartComponent.prototype.ngOnInit = function () {
        this.lineChartLabels = this.label.data.slice();
        var newDataSet = [];
        var newLine = { data: this.data.data, label: this.data.label };
        newDataSet.push(newLine);
        this.lineChartData = newDataSet;
    };
    LineChartComponent.prototype.ngOnChanges = function () {
        if (this.chart.chart != undefined) {
            this.chart.chart.update();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */]) === 'function' && _a) || Object)
    ], LineChartComponent.prototype, "data", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__label_data__["a" /* LabelData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__label_data__["a" /* LabelData */]) === 'function' && _b) || Object)
    ], LineChartComponent.prototype, "label", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"]), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"]) === 'function' && _c) || Object)
    ], LineChartComponent.prototype, "chart", void 0);
    LineChartComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'line-chart',
            template: __webpack_require__(675)
        }), 
        __metadata('design:paramtypes', [])
    ], LineChartComponent);
    return LineChartComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/chart.component.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_data__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__label_data__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoubleLineChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DoubleLineChartComponent = (function () {
    function DoubleLineChartComponent() {
        // line2Chart
        this.doublelineChartData = [
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'Verbruik' },
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'Verbruik2' }
        ];
        this.doublelineChartLabels = ['-1', '-2', '-3', '-4', '-5', '-6', '-7'];
        this.doublelineChartOptions = {
            responsive: true,
            title: {
                display: true,
                position: 'left',
                text: 'KiloWatt'
            }
        };
        this.doublelineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(148,159,255,0.2)',
                borderColor: 'rgba(148,159,255,1)',
                pointBackgroundColor: 'rgba(148,159,255,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,255,0.8)'
            }
        ];
        this.doublelineChartLegend = true;
        this.doublelineChartType = 'line';
    }
    DoubleLineChartComponent.prototype.ngOnInit = function () {
        this.doublelineChartLabels = this.label.data.slice();
        var newDataSet = [];
        var newLine = { data: this.data.data, label: this.data.label };
        var newLine2 = { data: this.data2.data, label: this.data2.label };
        newDataSet.push(newLine);
        newDataSet.push(newLine2);
        this.doublelineChartData = newDataSet;
        console.log(this.doublelineChartData);
    };
    DoubleLineChartComponent.prototype.ngOnChanges = function () {
        if (this.chart.chart != undefined) {
            this.chart.chart.update();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */]) === 'function' && _a) || Object)
    ], DoubleLineChartComponent.prototype, "data", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */]) === 'function' && _b) || Object)
    ], DoubleLineChartComponent.prototype, "data2", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__label_data__["a" /* LabelData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__label_data__["a" /* LabelData */]) === 'function' && _c) || Object)
    ], DoubleLineChartComponent.prototype, "label", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"]), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"]) === 'function' && _d) || Object)
    ], DoubleLineChartComponent.prototype, "chart", void 0);
    DoubleLineChartComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'doubleline-chart',
            template: __webpack_require__(679)
        }), 
        __metadata('design:paramtypes', [])
    ], DoubleLineChartComponent);
    return DoubleLineChartComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/doublelinechart.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_data__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__label_data__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PieChartComponent = (function () {
    function PieChartComponent() {
        // lineChart
        this.pieChartData = [0, 0];
        this.pieChartLabels = ['-1', '-2'];
        this.pieChartType = 'pie';
    }
    PieChartComponent.prototype.ngOnInit = function () {
        this.pieChartLabels = this.label.data.slice();
        this.pieChartData = this.data.data.slice();
    };
    PieChartComponent.prototype.ngOnChanges = function () {
        if (this.chart.chart != undefined) {
            this.chart.chart.update();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__line_data__["a" /* LineData */]) === 'function' && _a) || Object)
    ], PieChartComponent.prototype, "data", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__label_data__["a" /* LabelData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__label_data__["a" /* LabelData */]) === 'function' && _b) || Object)
    ], PieChartComponent.prototype, "label", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"]), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["BaseChartDirective"]) === 'function' && _c) || Object)
    ], PieChartComponent.prototype, "chart", void 0);
    PieChartComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'pie-chart',
            template: __webpack_require__(681)
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartComponent);
    return PieChartComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/piechart.component.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/avans/Documents/Angular/Smarthome-local/mean-app/src/environment.js.map

/***/ }),

/***/ 673:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 674:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n  <nav class=\"navbar navbar-default\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n          <span class=\"sr-only\">Toggle navigation</span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\">Energiemeter</a>\r\n      </div>\r\n      <div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n        <ul class=\"nav navbar-nav\">\r\n          <li routerLink=\"/dashboard\" routerLinkActive=\"active\"><a routerLink=\"/dashboard\" routerLinkActive=\"active\">Dashboard</a></li>\r\n          <li routerLink=\"/device\" routerLinkActive=\"active\"><a routerLink=\"/device\" routerLinkActive=\"active\">Device</a></li>\r\n          <li routerLink=\"/picker\" routerLinkActive=\"active\"><a routerLink=\"/picker\" routerLinkActive=\"active\">Picker</a></li>\r\n        </ul>\r\n      </div><!--/.nav-collapse -->\r\n    </div><!--/.container-fluid -->\r\n  </nav>\r\n\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-md-12\">\r\n      <div class=\"page-header\">\r\n        <h1>Energiemeter <small>Avans</small></h1>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ 675:
/***/ (function(module, exports) {

module.exports = "<div style=\"display: block;\">\r\n<canvas baseChart width=\"400\" height=\"200\"\r\n            [datasets]=\"lineChartData\"\r\n            [labels]=\"lineChartLabels\"\r\n            [options]=\"lineChartOptions\"\r\n            [colors]=\"lineChartColors\"\r\n            [legend]=\"lineChartLegend\"\r\n            [chartType]=\"lineChartType\"></canvas>\r\n</div>"

/***/ }),

/***/ 676:
/***/ (function(module, exports) {

module.exports = "<span *ngIf=\"mloaded\">\r\n\r\n\t<div class=\"col-md-6\">\r\n    <h3>Martijn</h3>\r\n\t\t<pie-chart [label]=\"label\" [data]=\"data1\"></pie-chart>\r\n\t</div>\r\n\r\n</span>\r\n\r\n<span *ngIf=\"kloaded\">\r\n\t<div class=\"col-md-6\">\r\n    <h3>Kenneth</h3>\r\n\t\t<pie-chart [label]=\"label\" [data]=\"data2\"></pie-chart>\r\n\t</div>\r\n\r\n</span>\r\n\r\n<span *ngIf=\"dbloaded\">\r\n\t<div class=\"col-md-12\">\r\n    <h3>Vergelijking</h3>\r\n\t\t<doubleline-chart [label]=\"label2\" [data]=\"data3\" [data2]=\"data4\"></doubleline-chart>\r\n\t</div>\r\n\r\n</span>"

/***/ }),

/***/ 677:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\r\n\t<h2>{{name}}</h2>\r\n</div>\r\n\r\n<div class=\"col-md-12\">\r\n\t<div class=\"well\">\r\n\t\t<b>Huidig opgenomen vermogen:</b> {{hov}} kW <br>\r\n\t\t<b>Huidig teruggeleverd vermogen:</b> {{htv}} kW <br>\r\n\t\t<b>Huidig tarief:</b> {{ht}} <br>\r\n\t\t<b>Totale kosten:</b> €{{money}}\r\n\t</div>\r\n</div>\r\n\r\n<span *ngIf=\"pieloaded\">\r\n\r\n\t<div class=\"col-md-4\">\r\n\t\t<pie-chart [label]=\"labelpie1\" [data]=\"datapie1\"></pie-chart>\r\n\t</div>\r\n\r\n\t<div class=\"col-md-4\">\r\n\t\t<pie-chart [label]=\"labelpie2\" [data]=\"datapie2\"></pie-chart>\r\n\t</div>\r\n\r\n\t<div class=\"col-md-4\">\r\n\t\t<pie-chart [label]=\"labelpie3\" [data]=\"datapie3\"></pie-chart>\r\n\t</div>\r\n\r\n</span>\r\n\r\n<span *ngIf=\"loaded\">\r\n\r\n\t<div class=\"col-md-12\">\r\n\t\t<doubleline-chart [label]=\"label\" [data]=\"data1\" [data2]=\"data2\"></doubleline-chart>\r\n\t</div>\r\n\r\n\t<div class=\"col-md-12\">\r\n\t\t<doubleline-chart [label]=\"label\" [data]=\"data3\" [data2]=\"data4\"></doubleline-chart>\r\n\t</div>\r\n\r\n\t<div class=\"col-md-12\">\r\n\t\t<doubleline-chart [label]=\"label\" [data]=\"data5\" [data2]=\"data6\"></doubleline-chart>\r\n\t</div>\r\n</span>\r\n\r\n"

/***/ }),

/***/ 678:
/***/ (function(module, exports) {

module.exports = "<div>\r\n\r\n<ul>\r\n        <li *ngFor=\"let device of devices\" (click)=\"goToDetails(device.sn)\">\r\n          {{device.name}}\r\n        </li>\r\n</ul>\r\n\r\n</div>"

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

module.exports = "<div style=\"display: block;\">\r\n  <canvas baseChart width=\"400\" height=\"200\"\r\n          [datasets]=\"doublelineChartData\"\r\n          [labels]=\"doublelineChartLabels\"\r\n          [options]=\"doublelineChartOptions\"\r\n          [colors]=\"doublelineChartColors\"\r\n          [legend]=\"doublelineChartLegend\"\r\n          [chartType]=\"doublelineChartType\"></canvas>\r\n</div>\r\n"

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"col-md-12\">\r\n\r\n <form #form=\"ngForm\" (ngSubmit)=\"onSubmit(form.value)\">\r\n\r\n  <div class=\"form-group\">  \r\n    <label>Meter</label>  \r\n    <select name=\"meter\" class=\"form-control\" required ngModel>\r\n    \t<option value=\"4530303035303031353538313833363134\" selected>Martijn</option>\r\n    \t<option value=\"4530303235303030303636383733323136\">Kenneth</option>\r\n    </select>\r\n  </div>\r\n\r\n  <div class=\"form-group\">  \r\n    <label>Data type</label>  \r\n    <select name=\"datatype\" class=\"form-control\" required ngModel>\r\n    \t<optgroup label=\"Huidig\">\r\n        \t<option value=\"HOV\" selected>Huidig opgenomen vermogen</option>\r\n        \t<option value=\"HTV\">Huidig teruggeleverd vermogen</option>\r\n        </optgroup>\r\n    \t<optgroup label=\"Tarief 1\">\r\n        \t<option value=\"TOE1\">Totaal opgenomen energie</option>\r\n        \t<option value=\"TTE1\">Totaal teruggeleverde energie</option>\r\n        </optgroup>\r\n        <optgroup label=\"Tarief 2\">\r\n        \t<option value=\"TOE2\">Totaal opgenomen energie</option>\r\n        \t<option value=\"TTE2\">Totaal teruggeleverde energie</option>\r\n        </optgroup>\r\n    </select>\r\n  </div>\r\n\r\n  <div class=\"form-group\">  \r\n    <label>Groupering</label>  \r\n    <select name=\"group\" class=\"form-control\" required ngModel>\r\n    \t<option value=\"minute\">Minuut</option>\r\n    \t<option value=\"hour\" selected>Uur</option>\r\n    \t<option value=\"day\">Dag</option>\r\n    \t<option value=\"month\">Maand</option>\r\n    \t<option value=\"year\">Jaar</option>\r\n    </select>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n  \t<label>Startdatum</label>\r\n  \t<input type=\"date\" name=\"date1\" class=\"form-control\" required ngModel>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n  \t<label>Einddatum</label>\r\n  \t<input type=\"date\" name=\"date2\" class=\"form-control\" required ngModel>\r\n  </div>\r\n\r\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Update\" />\r\n\r\n  </form>\r\n</div>\r\n\r\n<span *ngIf=\"loaded\">\r\n\r\n\t<div class=\"col-md-12\">\r\n\t\t<line-chart [label]=\"label\" [data]=\"data\"></line-chart>\r\n\t</div>\r\n\r\n</span>\r\n"

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = "<div style=\"display: block;\">\r\n  <canvas baseChart\r\n          [data]=\"pieChartData\"\r\n          [labels]=\"pieChartLabels\"\r\n          [chartType]=\"pieChartType\"></canvas>\r\n</div>\r\n"

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(394);


/***/ })

},[706]);
//# sourceMappingURL=main.bundle.map