(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['visualize-it'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VisualizeItComponent = (function () {
    /**
     * @param {?} el
     */
    function VisualizeItComponent(el) {
        var _this = this;
        this.el = el;
        this.showLegend = false;
        this.showHelp = false;
        this.expanded = false;
        this.typeMapping = {};
        this.onVisualization = new core.EventEmitter();
        if (navigator.platform.toUpperCase().indexOf('MAC') < 0) {
            document.addEventListener("webkitfullscreenchange", function (event) {
                if (!window.screenTop && !window.screenY) {
                    _this.expand(false);
                }
            });
            document.addEventListener("mozfullscreenchange", function (event) {
                var /** @type {?} */ win = window;
                var /** @type {?} */ isFullScreen = win.fullScreen ||
                    (win.innerWidth == screen.width && win.innerHeight == screen.height);
                if (!isFullScreen) {
                    _this.expand(false);
                }
            });
            document.addEventListener("MSFullscreenChange", function (event) {
                var /** @type {?} */ win = window;
                var /** @type {?} */ isFullScreen = win.fullScreen ||
                    (win.innerWidth == screen.width && win.innerHeight == screen.height);
                if (!isFullScreen) {
                    _this.expand(false);
                }
            });
        }
    }
    /**
     * @param {?} points
     * @return {?}
     */
    VisualizeItComponent.prototype.triggerEvaluation = function (points) {
        if (points.length) {
            var /** @type {?} */ indexOf_1 = {};
            var /** @type {?} */ errors_1 = [];
            var /** @type {?} */ dataSet_1 = {
                links: [],
                nodes: []
            };
            this.d3Container.nativeElement.innerHTML = "";
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
                        var /** @type {?} */ item = indexOf_1[id];
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
                        var /** @type {?} */ item = indexOf_1[id];
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
                this.d3Container.nativeElement.innerHTML = "<div class='danger'>" + errors_1.join("<br/>") + "</div>";
            }
            else {
                var /** @type {?} */ config = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    offset: { x: this.el.nativeElement.offsetLeft, y: this.el.nativeElement.offsetTop },
                    data: dataSet_1,
                    mapping: this.typeMapping,
                    showTypeOnHover: this.showTypeOnHover,
                    showDirections: this.showDirections,
                    enableTooltip: this.enableTooltip,
                    showCurvedConnections: this.showCurvedConnections,
                    outlineNodes: this.outlineNodes,
                    targetDiv: "#d3-container"
                };
                window['initiateD3'](config);
            }
        }
        else {
            this.d3Container.nativeElement.innerHTML = "<div class='danger'>Missing data.</div>";
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VisualizeItComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data) {
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    };
    /**
     * @return {?}
     */
    VisualizeItComponent.prototype.ngOnInit = function () {
        if (!(this.data instanceof Array)) {
            this.data = [this.data];
        }
    };
    /**
     * @return {?}
     */
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
    /**
     * @param {?} url
     * @param {?} id
     * @return {?}
     */
    VisualizeItComponent.prototype.loadScript = function (url, id) {
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ scriptElement = document.createElement('script');
            scriptElement.type = "text/javascript";
            scriptElement.src = url;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    };
    /**
     * @param {?} flag
     * @return {?}
     */
    VisualizeItComponent.prototype.expand = function (flag) {
        var /** @type {?} */ doc = document;
        if (flag) {
            var /** @type {?} */ element = doc.documentElement;
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
            this.el.nativeElement.classList.add("expanded-container");
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
            this.el.nativeElement.classList.remove("expanded-container");
            this.expanded = false;
            if (window["centerVisibility"]) {
                window["centerVisibility"](this.el.nativeElement.offsetLeft, this.el.nativeElement.offsetTop);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    VisualizeItComponent.prototype.onchange = function (event) {
        this.triggerEvaluation(event.points);
    };
    return VisualizeItComponent;
}());
VisualizeItComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'visualize-it',
                template: "\n<div class=\"legends\" *ngIf=\"enableLegends\">\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\n        <legend>Definitions</legend>\n        <b>Link types:</b><br/>\n        <strong>Dotted line:</strong> Destination of a Node<br/>\n        <strong>Line:</strong> Source of a Node<br/>\n        <span *ngIf=\"showDirections\"><strong>Line Arrow:</strong> Pointing toward the destination.<br/></span>\n        <br/><b>Node types:</b><br/>\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\n    </fieldset>\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\n        <legend>Tips</legend>\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\n        <b>Double-click to center node and zoom in.</b><br/>\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\n        <b>Filter nodes by:</b><br/>\n        <strong>\".\" :</strong> Stop/resume animation<br/>\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\n    </fieldset>\n</div>\n<div class=\"d3-container\"\n    tabindex=\"0\"\n    [style.width]=\"width\"\n    [style.height]=\"height\"\n    id=\"d3-container\" #d3Container></div>\n",
                styles: [":host{\n  position:relative;\n  display:block; }\n  :host.expanded-container{\n    position:inherit !important; }\n    :host.expanded-container .d3-container{\n      position:absolute;\n      top:0;\n      left:0;\n      width:100vw !important;\n      height:100vh !important;\n      border:0 !important;\n      margin:0 !important;\n      z-index:3; }\n  :host .legends{\n    position:absolute;\n    right:12px;\n    top:5px;\n    z-index:4; }\n    :host .legends a{\n      cursor:pointer;\n      font-weight:bold;\n      font-size:1.2rem; }\n      :host .legends a span{\n        background-color:#eee;\n        padding:0 3px;\n        width:13px;\n        float:left;\n        height:25px;\n        line-height:25px;\n        border:1px solid #3a3939; }\n      :host .legends a .expand{\n        text-align:center;\n        border-left:0;\n        border-right:0; }\n      :host .legends a .legend{\n        border-radius:5px 0 0 5px;\n        border-right:0; }\n      :host .legends a .help{\n        border-radius:0 5px 5px 0;\n        border-left:0; }\n      :host .legends a:hover{\n        color:#fff; }\n        :host .legends a:hover span{\n          background-color:#b65200; }\n    :host .legends .info{\n      padding:5px;\n      border:1px solid #888;\n      border-radius:5px;\n      position:absolute;\n      right:0px;\n      font-size:0.7rem;\n      line-height:1rem;\n      -webkit-box-shadow:1px 1px 3px #bbb;\n              box-shadow:1px 1px 3px #bbb;\n      background-color:#fff;\n      width:350px;\n      top:15px; }\n      :host .legends .info legend{\n        color:#af8d03;\n        font-size:1rem;\n        font-weight:bold; }\n      :host .legends .info strong{\n        color:#8f0000;\n        font-size:0.8rem;\n        margin-left:20px; }\n  :host #d3-container{\n    border:1px solid #633;\n    -webkit-box-sizing:border-box;\n            box-sizing:border-box;\n    border-radius:5px;\n    background-color:#fefefe;\n    margin:5px;\n    overflow:hidden; }\n    :host #d3-container ::ng-deep .danger{\n      background-color:#a80505;\n      color:#fff;\n      padding:10px;\n      display:table;\n      width:100%; }\n  :host ::ng-deep path.link{\n    fill:none;\n    stroke:#666;\n    stroke-width:1.5px; }\n  :host ::ng-deep circle{\n    fill:#ccc;\n    stroke:#fff;\n    stroke-width:1.5px; }\n  :host ::ng-deep text{\n    fill:#000;\n    font:10px sans-serif;\n    pointer-events:none; }\n  :host ::ng-deep div.tooltip{\n    position:absolute;\n    padding:5px;\n    font:12px sans-serif;\n    background:#cfcfcf;\n    border:1px solid #3a3939;\n    border-radius:4px;\n    pointer-events:none;\n    z-index:5; }\n"],
            },] },
];
/** @nocollapse */
VisualizeItComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
VisualizeItComponent.propDecorators = {
    "showCurvedConnections": [{ type: core.Input, args: ["showCurvedConnections",] },],
    "enableTooltip": [{ type: core.Input, args: ["enableTooltip",] },],
    "outlineNodes": [{ type: core.Input, args: ["outlineNodes",] },],
    "enableLegends": [{ type: core.Input, args: ["enableLegends",] },],
    "showTypeOnHover": [{ type: core.Input, args: ["showTypeOnHover",] },],
    "showDirections": [{ type: core.Input, args: ["showDirections",] },],
    "data": [{ type: core.Input, args: ["data",] },],
    "typeMapping": [{ type: core.Input, args: ["typeMapping",] },],
    "width": [{ type: core.Input, args: ["width",] },],
    "height": [{ type: core.Input, args: ["height",] },],
    "onVisualization": [{ type: core.Output, args: ["onVisualization",] },],
    "d3Container": [{ type: core.ViewChild, args: ["d3Container",] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VisualizeItModule = (function () {
    function VisualizeItModule() {
    }
    return VisualizeItModule;
}());
VisualizeItModule.decorators = [
    { type: core.NgModule, args: [{
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
            },] },
];
/** @nocollapse */
VisualizeItModule.ctorParameters = function () { return []; };

exports.VisualizeItComponent = VisualizeItComponent;
exports.VisualizeItModule = VisualizeItModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=visualize-it.umd.js.map
