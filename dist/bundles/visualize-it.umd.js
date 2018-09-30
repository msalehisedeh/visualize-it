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
    function VisualizeItComponent() {
        this.showLegend = false;
        this.showHelp = false;
        this.typeMapping = {};
        this.onVisualization = new core.EventEmitter();
    }
    /**
     * @param {?} points
     * @return {?}
     */
    VisualizeItComponent.prototype.triggerEvaluation = function (points) {
        if (points.length) {
            this.d3Container.nativeElement.innerHTML = "";
            var /** @type {?} */ indexOf_1 = {};
            var /** @type {?} */ dataSet_1 = {
                links: [],
                nodes: []
            };
            points.map(function (node, index) { return indexOf_1[node.id] = index; });
            points.map(function (node, i) {
                dataSet_1.nodes.push({
                    size: node.size ? node.size : 10,
                    group: node.group ? node.group : 0,
                    type: node.type && node.type.length ? node.type : "circle",
                    name: node.name
                });
                if (node.sources) {
                    node.sources.map(function (id) {
                        dataSet_1.links.push({ source: indexOf_1[id], target: i });
                    });
                }
                if (node.destinations) {
                    node.destinations.map(function (id) {
                        dataSet_1.links.push({ source: i, target: indexOf_1[id] });
                    });
                }
            });
            window['initiateD3'](window.innerWidth, window.innerHeight, dataSet_1, this.typeMapping, this.showTypeOnHover, "#d3-container");
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
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
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
                template: "\n<div class=\"legends\" *ngIf=\"enableLegends\">\n    <a (click)=\"showLegend = !showLegend;showHelp = false\"><span class=\"legend\">&#9830;</span></a>\n    <a (click)=\"showLegend = false;showHelp = !showHelp\"><span class=\"help\">?</span></a>\n    <div class=\"info\" *ngIf=\"showLegend\">\n<b>Link types:</b><br/>\n    <strong>Dotted line:</strong> Destination of a Node<br/>\n    <strong>Line:</strong> Source of a Node<br/>\n<br/><b>Node types:</b><br/>\n    <strong>circle</strong> - {{typeMapping['circle']}}<br/>\n    <strong>square</strong> - {{typeMapping['square']}}<br/>\n    <strong>triangle-up</strong> - {{typeMapping['triangle-up']}}<br/>\n    <strong>diamond</strong> - {{typeMapping['diamond']}}<br/>\n    <strong>cross</strong> - {{typeMapping['cross']}}<br/>\n    <strong>triangle-down</strong> - {{typeMapping['triangle-down']}}\n    </div>\n    <div class=\"info\" *ngIf=\"showHelp\">\n<b>Hover to highlight 1st-order neighbourhood. Click to fade surroundings.</b><br/>\n<b>Double-click to center node and zoom in. Hold SHIFT and Double-click to zoom out.</b><br/><br/>\n<b>Filter nodes by:</b><br/>\n    <strong>SHIFT + \"C\" :</strong> Show/hide all circle {{typeMapping['circle'] ? \"(\" + typeMapping['circle'] + \")\" : \"\"}} nodes<br/>\n    <strong>SHIFT + \"S\" :</strong> Show/hide all square {{typeMapping['square'] ? \"(\" + typeMapping['square'] + \")\" : \"\"}} nodes<br/>\n    <strong>SHIFT + \"T\" :</strong> Show/hide all triangle-up {{typeMapping['triangle-up'] ? \"(\" + typeMapping['triangle-up'] + \")\" : \"\"}} nodes<br/>\n    <strong>SHIFT + \"R\" :</strong> Show/hide all diamond {{typeMapping['diamond'] ? \"(\" + typeMapping['diamond'] + \")\" : \"\"}} nodes<br/>\n    <strong>SHIFT + \"X\" :</strong> Show/hide all cross {{typeMapping['cross'] ? \"(\" + typeMapping['cross'] + \")\" : \"\"}} nodes<br/>\n    <strong>SHIFT + \"D\" :</strong> Show/hide all triangle-down {{typeMapping['triangle-down'] ? \"(\" + typeMapping['triangle-down'] + \")\" : \"\"}} nodes<br/>\n    <strong>SHIFT + \"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\n    <strong>SHIFT + \"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\n    <strong>SHIFT + \"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\n    <strong>SHIFT + \"1\" :</strong> Show/hide all low range group (%33) links<br/>\n    <strong>SHIFT + \"2\" :</strong> Show/hide all medium range group (%50) links<br/>\n    <strong>SHIFT + \"3\" :</strong> Show/hide all high range group (%66) links\n    </div>\n</div>\n<div class=\"d3-container\"\n    [style.width]=\"width\"\n    [style.height]=\"height\"\n    id=\"d3-container\" #d3Container></div>\n",
                styles: [":host{\n  position:relative;\n  display:inline-block; }\n  :host .legends{\n    position:absolute;\n    right:20px;\n    top:22px;\n    z-index:3;\n    width:30px;\n    font-size:1.2rem;\n    background-color:#eee;\n    padding:3px 5px;\n    border-radius:15px; }\n    :host .legends a{\n      cursor:pointer;\n      font-weight:bold; }\n      :host .legends a:hover{\n        color:#fff; }\n    :host .legends .info{\n      padding:5px;\n      border:1px solid #888;\n      border-radius:5px;\n      position:absolute;\n      right:0px;\n      font-size:0.7rem;\n      line-height:1rem;\n      -webkit-box-shadow:1px 1px 3px #bbb;\n              box-shadow:1px 1px 3px #bbb;\n      background-color:#fff;\n      width:350px; }\n      :host .legends .info strong{\n        color:#8f0000;\n        font-size:0.8rem;\n        margin-left:20px; }\n  :host #d3-container{\n    border:1px solid #633;\n    padding:0 5px;\n    -webkit-box-sizing:border-box;\n            box-sizing:border-box;\n    border-radius:5px;\n    background-color:#fefefe;\n    margin:5px;\n    overflow:hidden; }\n"],
            },] },
];
/** @nocollapse */
VisualizeItComponent.ctorParameters = function () { return []; };
VisualizeItComponent.propDecorators = {
    "enableLegends": [{ type: core.Input, args: ["enableLegends",] },],
    "showTypeOnHover": [{ type: core.Input, args: ["showTypeOnHover",] },],
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
