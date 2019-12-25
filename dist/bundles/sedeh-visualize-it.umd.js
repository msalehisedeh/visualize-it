(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/visualize-it', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['visualize-it'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var VisualizeItComponent = /** @class */ (function () {
        function VisualizeItComponent(factory) {
            var _this = this;
            this.factory = factory;
            this.showLegend = false;
            this.showHelp = false;
            this.expanded = false;
            this.visualizerId = 'd3-container';
            this.gradientsEnabled = true;
            this.repealForce = 300;
            this.fixedDistance = 60;
            this.typeMapping = {};
            this.onVisualization = new core.EventEmitter();
            this.renderer = this.factory.createRenderer(null, null);
            if (navigator.platform.toUpperCase().indexOf('MAC') < 0) {
                document.addEventListener("webkitfullscreenchange", function (event) {
                    if (!window.screenTop && !window.screenY) {
                        _this.expand(false);
                    }
                });
                document.addEventListener("mozfullscreenchange", function (event) {
                    var win = window;
                    var isFullScreen = win.fullScreen ||
                        (win.innerWidth == screen.width && win.innerHeight == screen.height);
                    if (!isFullScreen) {
                        _this.expand(false);
                    }
                });
                document.addEventListener("MSFullscreenChange", function (event) {
                    var win = window;
                    var isFullScreen = win.fullScreen ||
                        (win.innerWidth == screen.width && win.innerHeight == screen.height);
                    if (!isFullScreen) {
                        _this.expand(false);
                    }
                });
            }
        }
        VisualizeItComponent.prototype.triggerEvaluation = function (points) {
            if (points.length) {
                var indexOf_1 = {};
                var errors_1 = [];
                var dataSet_1 = {
                    links: [],
                    nodes: []
                };
                this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "";
                points.map(function (node, index) { return indexOf_1[node.id] = index; });
                points.map(function (node, i) {
                    dataSet_1.nodes.push({
                        size: node.size ? node.size : 10,
                        group: node.group ? node.group : 0,
                        type: node.type && node.type.length ? node.type : "circle",
                        name: node.name,
                        image: node.image,
                        data: node.data ? node.data : []
                    });
                    if (node.sources) {
                        node.sources.map(function (id) {
                            var item = indexOf_1[id];
                            if (item != undefined) {
                                dataSet_1.links.push({ source: item, target: i });
                            }
                            else {
                                errors_1.push("Missing source node '" + id + "' for node '" + node.id + "'.");
                            }
                        });
                    }
                    if (node.destinations) {
                        node.destinations.map(function (id) {
                            var item = indexOf_1[id];
                            if (item != undefined) {
                                dataSet_1.links.push({ source: i, target: item });
                            }
                            else {
                                errors_1.push("Missing destination node '" + id + "' for node '" + node.id + "'.");
                            }
                        });
                    }
                });
                if (errors_1.length) {
                    this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "<div class='danger'>" + errors_1.join("<br/>") + "</div>";
                }
                else {
                    var el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
                    var config = {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        offset: { x: el.offsetLeft, y: el.offsetTop },
                        data: dataSet_1,
                        mapping: this.typeMapping,
                        showTypeOnHover: this.showTypeOnHover,
                        showDirections: this.showDirections,
                        enableTooltip: this.enableTooltip,
                        showCurvedConnections: this.showCurvedConnections,
                        outlineNodes: this.outlineNodes,
                        charge: -1 * this.repealForce,
                        fixedDistance: this.fixedDistance,
                        gradientsEnabled: this.gradientsEnabled,
                        targetDiv: "#" + this.visualizerId
                    };
                    window['initiateD3'](config);
                }
            }
            else {
                this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "<div class='danger'>Missing data.</div>";
            }
        };
        VisualizeItComponent.prototype.ngOnChanges = function (changes) {
            if (changes.data) {
                setTimeout(this.ngOnInit.bind(this), 333);
            }
        };
        VisualizeItComponent.prototype.ngOnInit = function () {
            if (!(this.data instanceof Array)) {
                this.data = [this.data];
            }
        };
        VisualizeItComponent.prototype.ngAfterViewInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!window['initiateD3']) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadScript("assets/d3.js", 'd3js').then(function () {
                                    _this.triggerEvaluation(_this.data);
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            this.triggerEvaluation(this.data);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        VisualizeItComponent.prototype.loadScript = function (url, id) {
            return new Promise(function (resolve, reject) {
                var scriptElement = document.createElement('script');
                scriptElement.type = "text/javascript";
                scriptElement.src = url;
                scriptElement.onload = resolve;
                document.body.appendChild(scriptElement);
            });
        };
        VisualizeItComponent.prototype.expand = function (flag) {
            var doc = document;
            if (flag) {
                var el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
                var element = doc.documentElement;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                }
                else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                }
                else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                }
                else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
                el.classList.add("expanded-container");
                this.expanded = true;
                if (window["centerVisibility"]) {
                    window["centerVisibility"](0, 0);
                }
            }
            else {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                }
                else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                }
                else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
                var el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
                el.classList.remove("expanded-container");
                this.expanded = false;
                if (window["centerVisibility"]) {
                    window["centerVisibility"](el.offsetLeft, el.offsetTop);
                }
            }
        };
        VisualizeItComponent.prototype.onchange = function (event) {
            this.triggerEvaluation(event.points);
        };
        VisualizeItComponent.ctorParameters = function () { return [
            { type: core.RendererFactory2 }
        ]; };
        __decorate([
            core.Input("showCurvedConnections")
        ], VisualizeItComponent.prototype, "showCurvedConnections", void 0);
        __decorate([
            core.Input("visualizerId")
        ], VisualizeItComponent.prototype, "visualizerId", void 0);
        __decorate([
            core.Input("enableTooltip")
        ], VisualizeItComponent.prototype, "enableTooltip", void 0);
        __decorate([
            core.Input("gradientsEnabled")
        ], VisualizeItComponent.prototype, "gradientsEnabled", void 0);
        __decorate([
            core.Input("repealForce")
        ], VisualizeItComponent.prototype, "repealForce", void 0);
        __decorate([
            core.Input("fixedDistance")
        ], VisualizeItComponent.prototype, "fixedDistance", void 0);
        __decorate([
            core.Input("outlineNodes")
        ], VisualizeItComponent.prototype, "outlineNodes", void 0);
        __decorate([
            core.Input("enableLegends")
        ], VisualizeItComponent.prototype, "enableLegends", void 0);
        __decorate([
            core.Input("showTypeOnHover")
        ], VisualizeItComponent.prototype, "showTypeOnHover", void 0);
        __decorate([
            core.Input("showDirections")
        ], VisualizeItComponent.prototype, "showDirections", void 0);
        __decorate([
            core.Input("data")
        ], VisualizeItComponent.prototype, "data", void 0);
        __decorate([
            core.Input("typeMapping")
        ], VisualizeItComponent.prototype, "typeMapping", void 0);
        __decorate([
            core.Input("width")
        ], VisualizeItComponent.prototype, "width", void 0);
        __decorate([
            core.Input("height")
        ], VisualizeItComponent.prototype, "height", void 0);
        __decorate([
            core.Output("onVisualization")
        ], VisualizeItComponent.prototype, "onVisualization", void 0);
        VisualizeItComponent = __decorate([
            core.Component({
                selector: 'visualize-it',
                template: "\r\n<div class=\"legends\" *ngIf=\"enableLegends\">\r\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\r\n    \r\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\r\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\r\n    \r\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\r\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\r\n        <legend>Definitions</legend>\r\n        <b>Relationship types:</b><br/>\r\n        <strong>Dotted line:</strong> Descendancy relationship (example: Children of)<br/>\r\n        <strong>Solid Line:</strong> Origination relationship (example: Parents of)<br/>\r\n        <span *ngIf=\"showDirections\"><strong>Arrow on a line:</strong> Pointing toward the recipient of relationship.<br/></span>\r\n\r\n        <br/><b>Node types:</b><br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\r\n    </fieldset>\r\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\r\n        <legend>Tips</legend>\r\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\r\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\r\n        <b>Double-click to center node and zoom in.</b><br/>\r\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\r\n\r\n        <b>Filter nodes by:</b><br/>\r\n        <strong>\".\" :</strong> Stop/resume animation<br/>\r\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\r\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\r\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\r\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\r\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\r\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\r\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\r\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\r\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\r\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\r\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\r\n    </fieldset>\r\n</div>\r\n\r\n<div class=\"d3-container\" \r\n    tabindex=\"0\"\r\n    [style.width]=\"width\"\r\n    [style.height]=\"height\"\r\n    [id]=\"visualizerId\"></div>\r\n",
                styles: [":host{position:relative;display:block}:host.expanded-container{position:inherit!important}:host.expanded-container .d3-container{position:absolute;top:0;left:0;width:100vw!important;height:100vh!important;border:0!important;margin:0!important;z-index:3}:host .legends{position:absolute;right:12px;top:5px;z-index:4}:host .legends a{cursor:pointer;font-weight:700;font-size:1.2rem}:host .legends a span{background-color:#eee;padding:0 3px;width:13px;float:left;height:25px;line-height:25px;border:1px solid #3a3939}:host .legends a .expand{text-align:center;border-left:0;border-right:0}:host .legends a .legend{border-radius:5px 0 0 5px;border-right:0}:host .legends a .help{border-radius:0 5px 5px 0;border-left:0}:host .legends a:hover{color:#fff}:host .legends a:hover span{background-color:#b65200}:host .legends .info{padding:5px;border:1px solid #888;border-radius:5px;position:absolute;right:0;font-size:.7rem;line-height:1rem;box-shadow:1px 1px 3px #bbb;background-color:#fff;width:350px;top:15px}:host .legends .info legend{color:#af8d03;font-size:1rem;font-weight:700}:host .legends .info strong{color:#8f0000;font-size:.8rem;margin-left:20px}:host .d3-container{border:1px solid #633;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px;overflow:hidden}:host .d3-container ::ng-deep .danger{background-color:#a80505;color:#fff;padding:10px;display:table;width:100%}:host ::ng-deep path.link{fill:none;stroke:#666;stroke-width:1.5px}:host ::ng-deep circle{fill:#ccc;stroke:#fff;stroke-width:1.5px}:host ::ng-deep text{fill:#000;font:10px sans-serif;pointer-events:none}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}"]
            })
        ], VisualizeItComponent);
        return VisualizeItComponent;
    }());

    var VisualizeItModule = /** @class */ (function () {
        function VisualizeItModule() {
        }
        VisualizeItModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                declarations: [
                    VisualizeItComponent
                ],
                exports: [
                    VisualizeItComponent
                ],
                entryComponents: [
                    VisualizeItComponent
                ],
                providers: [],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], VisualizeItModule);
        return VisualizeItModule;
    }());

    exports.VisualizeItComponent = VisualizeItComponent;
    exports.VisualizeItModule = VisualizeItModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-visualize-it.umd.js.map
