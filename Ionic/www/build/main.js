webpackJsonp([1],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return M1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_speech_recognition__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_Storage__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var M1Page = /** @class */ (function () {
    function M1Page(navCtrl, alrtCtrl, http, storage, tts, speechRecognition, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alrtCtrl = alrtCtrl;
        this.http = http;
        this.storage = storage;
        this.tts = tts;
        this.speechRecognition = speechRecognition;
        this.platform = platform;
        this.start = function () {
            _this.startrecognition();
        };
        this.errorCallback = function (message) {
            if (message != "Already opened.") {
                _this.tts.speak(message);
            }
        };
        platform.ready().then(function () {
            _this.m = 0;
            platform.registerBackButtonAction(function () {
                if (_this.b == 1) {
                    document.removeEventListener("volumedownbutton", _this.start, false);
                }
                _this.storage.clear();
                _this.navCtrl.pop();
            });
        });
    }
    M1Page.prototype.ionViewDidEnter = function () {
        if (this.a != 1) {
            this.getstatus();
            //this.check();
        }
    };
    M1Page.prototype.ngOnInit = function () {
        this.ip = 'http://192.168.43.29:3000/';
        this.num = 0;
        this.str = '';
        this.states = new Array();
        this.states.push("Unknown", "Unknown", "Unknown", "Unknown", "Unknown");
        this.check();
    };
    M1Page.prototype.check = function () {
        var _this = this;
        this.storage.get("mode").then(function (data) {
            if (data == "normal") {
                _this.a = 1;
                _this.title = "This mode is for those community who are physically paralyzed and have unability or difficulty in movement from one place to another but are able to easily operate their cell phone ";
                _this.getstatus();
            }
            else if (data == "medium") {
                _this.a = 2;
                _this.title = "This mode is for those community who are visually impaired and wish to automate household stuffs via sound, also for visually impaired voiceless people we have keypad control";
                _this.getstatus();
            }
            else {
                _this.a = 3;
                _this.title = "This mode is for those community who are unable to even hold their cell phones. We allow them to control this app and the automation process via their eye blinking capability";
                _this.getstatus();
            }
        });
    };
    M1Page.prototype.ngOnDestroy = function () {
    };
    M1Page.prototype.startrecognition = function () {
        var _this = this;
        if (this.m == 0) {
            this.tts.speak("Please speak the device name to toggle its state or speak the device name with suffix \"S\" for knowing its state").then(function () {
                _this.speakup();
                _this.m++;
            });
        }
        else {
            this.tts.speak("Speak up").then(function () {
                _this.speakup();
                _this.m++;
            });
        }
    };
    M1Page.prototype.speakup = function () {
        this.voice();
    };
    M1Page.prototype.voice = function () {
        var _this = this;
        var a, b;
        var d = ["light", "lite", "ite", "like", "lake"];
        var d1 = ["lights", "lites", "ites", "likes", "lakes"];
        this.speechRecognition.startListening().subscribe(function (matches) {
            d.forEach(function (val) {
                if (matches.indexOf(val) != -1) {
                    a = true;
                }
            });
            d1.forEach(function (val) {
                if (matches.indexOf(val) != -1) {
                    b = true;
                }
            });
            if (a == true) {
                _this.light();
            }
            else if (b == true) {
                _this.saystate("light");
            }
            else {
                _this.tts.speak("Sorry!!! Could not recognize the voice input as the required ones!!! Please try again!!!").then(function (success) {
                    _this.startrecognition();
                });
            }
        }, function (onerror) {
            var t = "Sorry!!! Speech recognition denied on this device";
            _this.tts.speak(t);
        });
    };
    M1Page.prototype.getstatus = function (data, n) {
        var _this = this;
        var a;
        var url = this.ip + "getstatus";
        this.http.get(url).subscribe(function (res) {
            _this.states = new Array();
            if (res["light"] == true) {
                a = "On";
            }
            else {
                a = "Off";
            }
            _this.states.push(a, "Unknown", "Unknown", "Unknown", "Unknowm");
            if (data != undefined) {
                if (data == "togglelightstatus") {
                    data = "light";
                }
                if (n != undefined) {
                    _this.elaborate(data, n);
                }
                else {
                    _this.elaborate(data);
                }
            }
            else {
                if (_this.a == 2) {
                    _this.tts.speak("Welcome to the controlling page").then(function () {
                        _this.storage.get("type").then(function (val) {
                            if (val == "voice") {
                                _this.b = 1;
                                document.addEventListener("volumedownbutton", _this.start, false);
                            }
                            else {
                                _this.b = 2;
                                _this.readarduinoper();
                            }
                        });
                    });
                }
                if (_this.a == 3) {
                    _this.tts.speak("Welcome to the controlling page").then(function () {
                        _this.readarduinoper();
                    });
                }
            }
        }, function (err) {
            _this.errorit(0);
        });
    };
    M1Page.prototype.errorit = function (n) {
        var _this = this;
        if (n == 0) {
            this.txt = "We are unable to fetch the devices state. Either you are not connected to the board wifi or the automation board is not on. Please try again after proper configuration. So, we are taking you back to the home page.";
        }
        else {
            this.txt = "We are unable to change the device state. Either you are not connected to the board wifi or the automation board is not on. Please try again after proper configuration. So, we are taking you back to the home page.";
        }
        if (this.a == 1) {
            this.makealert("We are unable to fetch the devices state. Either you are not connected to the board wifi or the automation board is not on. Please try again after proper configuration.", 1);
        }
        else {
            this.tts.speak(this.txt).then(function () {
                _this.navCtrl.pop();
            });
        }
    };
    M1Page.prototype.elaborate = function (data, n) {
        var t;
        switch (data) {
            case "light":
                t = "The light has been turned " + this.states[0];
                break;
            case "fan":
                t = "The fan is now " + this.states[1];
                break;
            case "tv":
                t = "The TV has been turned " + this.states[2];
                break;
            case "door":
                t = "The door has been " + this.states[3];
                break;
            case "curtain":
                t = "The curtain has been " + this.states[4];
                break;
        }
        if (n == undefined) {
            this.tts.speak(t);
        }
        else {
            this.makealert(t);
        }
    };
    M1Page.prototype.saystate = function (data) {
        var t;
        switch (data) {
            case "light":
                t = "The present state of light is " + this.states[0];
                break;
            case "fan":
                t = "The present state of fan is " + this.states[1];
                break;
            case "tv":
                t = "The present state of TV is " + this.states[2];
                break;
            case "door":
                t = "The present state of door is " + this.states[3];
                break;
            case "curtain":
                t = "The present state of curtain is " + this.states[4];
                break;
        }
        this.tts.speak(t);
    };
    M1Page.prototype.readarduinoper = function () {
        var _this = this;
        window.serial.requestPermission(function (successMessage) {
            _this.readarduino1();
        }, function (err) {
            _this.tts.speak("Sorry!!! No any sensor board found to be connected or may have been denied!!! Please try replugging the board and re starting the app!!!");
        });
    };
    M1Page.prototype.readarduino1 = function () {
        var _this = this;
        window.serial.open({ baudRate: 9600, sleepOnPause: false }, function (successMessage) {
            window.serial.registerReadCallback(function (data) {
                var view = new Uint8Array(data);
                if (view.length >= 1) {
                    for (var i = 0; i < view.length; i++) {
                        if (view[i] == 13) {
                            if (_this.str.includes("down")) {
                                window.serial.write("O", function (success) {
                                    if (success == "OK") {
                                        _this.str = '';
                                        if (_this.num < 4) {
                                            _this.num++;
                                        }
                                        else {
                                            _this.num = 4;
                                        }
                                        _this.hover();
                                    }
                                });
                            }
                            else if (_this.str.includes("up")) {
                                window.serial.write("O", function (success) {
                                    if (success == "OK") {
                                        _this.str = '';
                                        if (_this.num > 0) {
                                            _this.num--;
                                        }
                                        else {
                                            _this.num = 0;
                                        }
                                        _this.hover();
                                    }
                                });
                            }
                            else if (_this.str.includes("ok")) {
                                window.serial.write("O", function (success) {
                                    if (success == "OK") {
                                        _this.str = '';
                                        _this.sendit();
                                    }
                                });
                            }
                            else if (_this.str.includes("back")) {
                                window.serial.write("O", function (success) {
                                    if (success == "OK") {
                                        _this.str = '';
                                        _this.tts.speak("Going back to home page").then(function () {
                                            _this.storage.clear();
                                            _this.navCtrl.pop();
                                        });
                                    }
                                });
                            }
                            else {
                                _this.str = '';
                            }
                        }
                        else {
                            var temp_str = String.fromCharCode(view[i]);
                            _this.str += temp_str;
                        }
                    }
                }
            }, _this.errorCallback);
        }, this.errorCallback);
    };
    M1Page.prototype.hover = function () {
        var xy;
        switch (this.num) {
            case 0:
                xy = document.getElementById("m1light").getBoundingClientRect();
                this.amn(xy);
                this.saystate("light");
                break;
            case 1:
                xy = document.getElementById("m1fan").getBoundingClientRect();
                this.amn(xy);
                this.saystate("fan");
                break;
            case 2:
                xy = document.getElementById("m1tv").getBoundingClientRect();
                this.amn(xy);
                this.saystate("tv");
                break;
            case 3:
                xy = document.getElementById("m1door").getBoundingClientRect();
                this.amn(xy);
                this.saystate("door");
                break;
            case 4:
                xy = document.getElementById("m1curtain").getBoundingClientRect();
                this.amn(xy);
                this.saystate("curtain");
                break;
        }
    };
    M1Page.prototype.amn = function (xy) {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollTo(0, xy.top, 300);
        }, 1000);
    };
    M1Page.prototype.sendit = function () {
        switch (this.num) {
            case 0:
                this.light();
                break;
            case 1:
                this.fan();
                break;
            case 2:
                this.tv();
                break;
            case 3:
                this.door();
                break;
            case 4:
                this.curtain();
                break;
        }
    };
    M1Page.prototype.makealert = function (a, n) {
        var _this = this;
        var prompt = this.alrtCtrl.create({
            enableBackdropDismiss: false,
            title: "",
            subTitle: a,
            buttons: [{
                    text: "OK",
                    handler: function () {
                        if (n != undefined) {
                            _this.storage.clear();
                            _this.navCtrl.pop();
                        }
                    }
                }]
        });
        prompt.present();
    };
    M1Page.prototype.light = function (n) {
        if (n == undefined) {
            this.toggle("togglelightstatus");
        }
        else {
            this.toggle("togglelightstatus", n);
        }
    };
    M1Page.prototype.fan = function (n) {
        if (n == undefined) {
            this.toggle("togglefanstatus");
        }
        else {
            this.toggle("togglefanstatus", n);
        }
    };
    M1Page.prototype.tv = function (n) {
        if (n == undefined) {
            this.toggle("toggletvstatus");
        }
        else {
            this.toggle("toggletvstatus", n);
        }
    };
    M1Page.prototype.door = function (n) {
        if (n == undefined) {
            this.toggle("toggledoorstatus");
        }
        else {
            this.toggle("toggledoorstatus", n);
        }
    };
    M1Page.prototype.curtain = function (n) {
        if (n == undefined) {
            this.toggle("togglecurtainstatus");
        }
        else {
            this.toggle("togglecurtainstatus", n);
        }
    };
    M1Page.prototype.toggle = function (n, a) {
        var _this = this;
        var url = this.ip + n;
        this.http.get(url).subscribe(function (res) {
            if (res == "done") {
                if (a != undefined) {
                    _this.getstatus(n, a);
                }
                else {
                    _this.getstatus(n);
                }
            }
            else {
                _this.errorit(1);
            }
        }, function (err) {
            _this.errorit(1);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], M1Page.prototype, "content", void 0);
    M1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-m1',template:/*ion-inline-start:"C:\Users\User\Documents\iot-at\src\pages\m1\m1.html"*/'<ion-content class="m1" padding>\n  <div text-center class="m1button">\n    <h2>{{title}}</h2>\n    <button ion-button id="m1light" full (click)="light(1)" class="button active">Light Control</button>\n    <p id="lightstat">Status: {{this.states[0]}}</p>\n    <button ion-button id="m1fan" full (click)="fan(1)" class="button">Fan Control</button>\n    <p id="fanstat">Status: {{this.states[1]}}</p>\n    <button ion-button id="m1tv" full (click)="tv(1)" class="button">TV Control</button>\n    <p id="tvstat">Status: {{this.states[2]}}</p>\n    <button ion-button id="m1door" full (click)="door(1)" class="button">Door Control</button>\n    <p id="doorstat">Status: {{this.states[3]}}</p>\n    <button ion-button id="m1curtain" full (click)="curtain(1)" class="button">Curtain Control</button>\n    <p id="curtainstat">Status: {{this.states[4]}}</p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\User\Documents\iot-at\src\pages\m1\m1.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__["a" /* TextToSpeech */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], M1Page);
    return M1Page;
}());

//# sourceMappingURL=m1.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/m1/m1.module": [
		333,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__m1_m1__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, tts, storage, alrtCtrl, speechRecognition, platform, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.tts = tts;
        this.storage = storage;
        this.alrtCtrl = alrtCtrl;
        this.speechRecognition = speechRecognition;
        this.platform = platform;
        this.events = events;
        this.domode = function () {
            _this.startpage(0);
        };
        this.errorCallback = function (message) {
            if (message != "Already opened.") {
                _this.tts.speak(message);
            }
        };
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                platform.exitApp();
            });
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom(300);
        }, 1000);
    };
    HomePage.prototype.ionViewWillEnter = function () {
        document.addEventListener("volumedownbutton", this.domode, false);
        this.ionViewDidLoad();
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.readarduino();
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.str = '';
        document.addEventListener("volumedownbutton", this.domode, false);
        this.storage.get("mode").then(function (val) {
            if (val != undefined) {
                document.removeEventListener("volumedownbutton", _this.domode, false);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__m1_m1__["a" /* M1Page */]);
            }
            else {
                _this.speechavail();
            }
        });
    };
    HomePage.prototype.readarduino1 = function () {
        var _this = this;
        window.serial.open({ baudRate: 9600, sleepOnPause: false }, function (successMessage) {
            window.serial.registerReadCallback(function (data) {
                var view = new Uint8Array(data);
                if (view.length >= 1) {
                    for (var i = 0; i < view.length; i++) {
                        if (view[i] == 13) {
                            if (_this.str.includes("ok")) {
                                window.serial.write("O", function (success) {
                                    if (success == "OK") {
                                        _this.str = '';
                                        _this.acutemode();
                                    }
                                });
                            }
                            else if (_this.str.includes("ok1")) {
                                window.serial.write("O", function (success) {
                                    if (success == "OK") {
                                        _this.str = '';
                                        _this.startpage(1);
                                    }
                                });
                            }
                            else {
                                _this.str = '';
                            }
                        }
                        else {
                            var temp_str = String.fromCharCode(view[i]);
                            _this.str += temp_str;
                        }
                    }
                }
            }, _this.errorCallback);
        }, this.errorCallback);
    };
    HomePage.prototype.readarduino = function () {
        var _this = this;
        window.serial.requestPermission(function (successMessage) {
            if (!successMessage) {
                _this.makealert("Since sensor board reading is denied, Mode 3 or button controlled mode 2 may not be applicable");
            }
            else {
                _this.readarduino1();
            }
        }, function (err) {
        });
    };
    HomePage.prototype.speechavail = function () {
        var _this = this;
        this.speechRecognition.isRecognitionAvailable().then(function (available) {
            if (available) {
                _this.speechRecognition.hasPermission().then(function (hasPermission) {
                    if (!hasPermission) {
                        _this.speechRecognition.requestPermission().then(function () {
                            _this.readarduino();
                        }, function () {
                            var t = "Speech recognition denied";
                            _this.makealert(t);
                            _this.readarduino();
                        });
                    }
                    else {
                        _this.readarduino();
                    }
                });
            }
            else {
                var t = "No speech recognition allowed on this device";
                _this.makealert(t);
                _this.readarduino();
            }
        });
    };
    HomePage.prototype.startpage = function (n) {
        var _this = this;
        if (n == 0) {
            this.storage.set("mode", "medium").then(function () {
                _this.storage.set("type", "voice").then(function () {
                    _this.tts.speak("Voice mode enabled").then(function () {
                        document.removeEventListener("volumedownbutton", _this.domode, false);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__m1_m1__["a" /* M1Page */]);
                    });
                });
            });
        }
        else {
            this.storage.set("mode", "medium").then(function () {
                _this.storage.set("type", "button").then(function () {
                    _this.tts.speak("Button mode enabled").then(function () {
                        document.removeEventListener("volumedownbutton", _this.domode, false);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__m1_m1__["a" /* M1Page */]);
                    });
                });
            });
        }
    };
    HomePage.prototype.makealert = function (a, n) {
        var prompt = this.alrtCtrl.create({
            enableBackdropDismiss: false,
            title: "",
            subTitle: a,
            buttons: ["OK"]
        });
        prompt.present();
    };
    HomePage.prototype.modes = function (n) {
        var _this = this;
        switch (n) {
            case 1:
                this.storage.set("mode", "normal").then(function () {
                    document.removeEventListener("volumedownbutton", _this.domode, false);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__m1_m1__["a" /* M1Page */]);
                });
                break;
            case 2:
                this.makeprompt();
                break;
            case 3:
                this.acutemode();
                break;
        }
    };
    HomePage.prototype.acutemode = function () {
        var _this = this;
        this.storage.set("mode", "acute").then(function () {
            document.removeEventListener("volumedownbutton", _this.domode, false);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__m1_m1__["a" /* M1Page */]);
        });
    };
    HomePage.prototype.ngOnDestroy = function () {
    };
    HomePage.prototype.makeprompt = function () {
        var _this = this;
        var prompt = this.alrtCtrl.create({
            enableBackdropDismiss: false,
            title: "",
            subTitle: "Please select one among the following modes",
            buttons: [{
                    text: "Done",
                    handler: function (val) {
                        if (val == "voice") {
                            _this.startpage(0);
                        }
                        else if (val == "button") {
                            _this.startpage(1);
                        }
                        else {
                            _this.makealert("You must select a value");
                        }
                    }
                }, {
                    text: "Cancel"
                }]
        });
        prompt.addInput({
            type: "radio",
            label: "Voice controlled",
            value: "voice"
        });
        prompt.addInput({
            type: "radio",
            label: "Button controlled",
            value: "button"
        });
        prompt.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\User\Documents\iot-at\src\pages\home\home.html"*/'<ion-content padding>\n  <ion-img id="iot" class="w3-animate-left" src="assets/imgs/iot.png" width="100%" height="105%"></ion-img>\n  <div text-center>\n    <h1 id="head" class="w3-animate-left">IOT for Assitive Technology</h1>\n  </div>\n  <div text-center class="w3-animate-left modes"> \n    <button ion-button full id="m1"  (click)="modes(1)">Mode 1</button>\n    <button ion-button full id="m2"  (click)="modes(2)">Mode 2</button>\n    <button ion-button full id="m3"  (click)="modes(3)">Mode 3</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\User\Documents\iot-at\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */], __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(245);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_serial__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_Storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_speech_recognition__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_hotspot__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_m1_m1__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng_socket_io__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var config = { url: 'http://192.168.43.29:3000', options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_m1_m1__["a" /* M1Page */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_Storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_14_ng_socket_io__["SocketIoModule"].forRoot(config),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/m1/m1.module#M1PageModule', name: 'M1Page', segment: 'm1', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_m1_m1__["a" /* M1Page */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_serial__["a" /* Serial */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_hotspot__["a" /* Hotspot */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\User\Documents\iot-at\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\User\Documents\iot-at\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 330:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[225]);
//# sourceMappingURL=main.js.map