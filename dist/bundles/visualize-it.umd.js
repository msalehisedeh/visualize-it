(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('visualize-it', ['exports', '@angular/core', '@angular/common'], factory) :
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
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [0, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizeItComponent = (function () {
        function VisualizeItComponent(el) {
            var _this = this;
            this.el = el;
            this.showLegend = false;
            this.showHelp = false;
            this.expanded = false;
            this.gradientsEnabled = true;
            this.repealForce = 300;
            this.fixedDistance = 60;
            this.typeMapping = {};
            this.onVisualization = new core.EventEmitter();
            if (navigator.platform.toUpperCase().indexOf('MAC') < 0) {
                document.addEventListener("webkitfullscreenchange", function (event) {
                    if (!window.screenTop && !window.screenY) {
                        _this.expand(false);
                    }
                });
                document.addEventListener("mozfullscreenchange", function (event) {
                    /** @type {?} */
                    var win = window;
                    /** @type {?} */
                    var isFullScreen = win.fullScreen ||
                        (win.innerWidth == screen.width && win.innerHeight == screen.height);
                    if (!isFullScreen) {
                        _this.expand(false);
                    }
                });
                document.addEventListener("MSFullscreenChange", function (event) {
                    /** @type {?} */
                    var win = window;
                    /** @type {?} */
                    var isFullScreen = win.fullScreen ||
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
        VisualizeItComponent.prototype.triggerEvaluation = /**
         * @param {?} points
         * @return {?}
         */
            function (points) {
                if (points.length) {
                    /** @type {?} */
                    var indexOf_1 = {};
                    /** @type {?} */
                    var errors_1 = [];
                    /** @type {?} */
                    var dataSet_1 = {
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
                                /** @type {?} */
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
                                /** @type {?} */
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
                        this.d3Container.nativeElement.innerHTML = "<div class='danger'>" + errors_1.join("<br/>") + "</div>";
                    }
                    else {
                        /** @type {?} */
                        var config = {
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
                            charge: -1 * this.repealForce,
                            fixedDistance: this.fixedDistance,
                            gradientsEnabled: this.gradientsEnabled,
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
        VisualizeItComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.data) {
                    setTimeout(this.ngOnInit.bind(this), 333);
                }
            };
        /**
         * @return {?}
         */
        VisualizeItComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (!(this.data instanceof Array)) {
                    this.data = [this.data];
                }
            };
        /**
         * @return {?}
         */
        VisualizeItComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!window['initiateD3'])
                                    return [3 /*break*/, 2];
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
        VisualizeItComponent.prototype.loadScript = /**
         * @param {?} url
         * @param {?} id
         * @return {?}
         */
            function (url, id) {
                return new Promise(function (resolve, reject) {
                    /** @type {?} */
                    var scriptElement = document.createElement('script');
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
        VisualizeItComponent.prototype.expand = /**
         * @param {?} flag
         * @return {?}
         */
            function (flag) {
                /** @type {?} */
                var doc = document;
                if (flag) {
                    /** @type {?} */
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
        VisualizeItComponent.prototype.onchange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.triggerEvaluation(event.points);
            };
        VisualizeItComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'visualize-it',
                        template: "\r\n<div class=\"legends\" *ngIf=\"enableLegends\">\r\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\r\n    \r\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\r\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\r\n    \r\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\r\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\r\n        <legend>Definitions</legend>\r\n        <b>Relationship types:</b><br/>\r\n        <strong>Dotted line:</strong> Descendancy relationship (example: Children of)<br/>\r\n        <strong>Solid Line:</strong> Origination relationship (example: Parents of)<br/>\r\n        <span *ngIf=\"showDirections\"><strong>Arrow on a line:</strong> Pointing toward the recipient of relationship.<br/></span>\r\n\r\n        <br/><b>Node types:</b><br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\r\n    </fieldset>\r\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\r\n        <legend>Tips</legend>\r\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\r\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\r\n        <b>Double-click to center node and zoom in.</b><br/>\r\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\r\n\r\n        <b>Filter nodes by:</b><br/>\r\n        <strong>\".\" :</strong> Stop/resume animation<br/>\r\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\r\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\r\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\r\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\r\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\r\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\r\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\r\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\r\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\r\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\r\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\r\n    </fieldset>\r\n</div>\r\n\r\n<div class=\"d3-container\" \r\n    tabindex=\"0\"\r\n    [style.width]=\"width\"\r\n    [style.height]=\"height\"\r\n    id=\"d3-container\" #d3Container></div>\r\n",
                        styles: [":host{position:relative;display:block}:host.expanded-container{position:inherit!important}:host.expanded-container .d3-container{position:absolute;top:0;left:0;width:100vw!important;height:100vh!important;border:0!important;margin:0!important;z-index:3}:host .legends{position:absolute;right:12px;top:5px;z-index:4}:host .legends a{cursor:pointer;font-weight:700;font-size:1.2rem}:host .legends a span{background-color:#eee;padding:0 3px;width:13px;float:left;height:25px;line-height:25px;border:1px solid #3a3939}:host .legends a .expand{text-align:center;border-left:0;border-right:0}:host .legends a .legend{border-radius:5px 0 0 5px;border-right:0}:host .legends a .help{border-radius:0 5px 5px 0;border-left:0}:host .legends a:hover{color:#fff}:host .legends a:hover span{background-color:#b65200}:host .legends .info{padding:5px;border:1px solid #888;border-radius:5px;position:absolute;right:0;font-size:.7rem;line-height:1rem;box-shadow:1px 1px 3px #bbb;background-color:#fff;width:350px;top:15px}:host .legends .info legend{color:#af8d03;font-size:1rem;font-weight:700}:host .legends .info strong{color:#8f0000;font-size:.8rem;margin-left:20px}:host #d3-container{border:1px solid #633;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px;overflow:hidden}:host #d3-container ::ng-deep .danger{background-color:#a80505;color:#fff;padding:10px;display:table;width:100%}:host ::ng-deep path.link{fill:none;stroke:#666;stroke-width:1.5px}:host ::ng-deep circle{fill:#ccc;stroke:#fff;stroke-width:1.5px}:host ::ng-deep text{fill:#000;font:10px sans-serif;pointer-events:none}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}"]
                    }] }
        ];
        /** @nocollapse */
        VisualizeItComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        VisualizeItComponent.propDecorators = {
            showCurvedConnections: [{ type: core.Input, args: ["showCurvedConnections",] }],
            enableTooltip: [{ type: core.Input, args: ["enableTooltip",] }],
            gradientsEnabled: [{ type: core.Input, args: ["gradientsEnabled",] }],
            repealForce: [{ type: core.Input, args: ["repealForce",] }],
            fixedDistance: [{ type: core.Input, args: ["fixedDistance",] }],
            outlineNodes: [{ type: core.Input, args: ["outlineNodes",] }],
            enableLegends: [{ type: core.Input, args: ["enableLegends",] }],
            showTypeOnHover: [{ type: core.Input, args: ["showTypeOnHover",] }],
            showDirections: [{ type: core.Input, args: ["showDirections",] }],
            data: [{ type: core.Input, args: ["data",] }],
            typeMapping: [{ type: core.Input, args: ["typeMapping",] }],
            width: [{ type: core.Input, args: ["width",] }],
            height: [{ type: core.Input, args: ["height",] }],
            onVisualization: [{ type: core.Output, args: ["onVisualization",] }],
            d3Container: [{ type: core.ViewChild, args: ["d3Container",] }]
        };
        return VisualizeItComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizeItModule = (function () {
        function VisualizeItModule() {
        }
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
                    },] }
        ];
        return VisualizeItModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.VisualizeItComponent = VisualizeItComponent;
    exports.VisualizeItModule = VisualizeItModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXplLWl0LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL3Zpc3VhbGl6ZS1pdC9zcmMvYXBwL3Zpc3VhbGl6ZS1pdC9jb21wb25lbnRzL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQudHMiLCJuZzovL3Zpc3VhbGl6ZS1pdC9zcmMvYXBwL3Zpc3VhbGl6ZS1pdC92aXN1YWxpemUtaXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQgLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXplLWl0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlzdWFsaXplLWl0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemUtaXQuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZUl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMgIHtcclxuXHJcbiAgc2hvd0xlZ2VuZCA9IGZhbHNlO1xyXG4gIHNob3dIZWxwID0gZmFsc2U7XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBcclxuICBASW5wdXQoXCJzaG93Q3VydmVkQ29ubmVjdGlvbnNcIilcclxuICBzaG93Q3VydmVkQ29ubmVjdGlvbnM6IHN0cmluZztcclxuICBcclxuICBASW5wdXQoXCJlbmFibGVUb29sdGlwXCIpXHJcbiAgZW5hYmxlVG9vbHRpcDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZ3JhZGllbnRzRW5hYmxlZFwiKVxyXG4gIGdyYWRpZW50c0VuYWJsZWQgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoXCJyZXBlYWxGb3JjZVwiKVxyXG4gIHJlcGVhbEZvcmNlID0gMzAwO1xyXG4gIFxyXG4gIEBJbnB1dChcImZpeGVkRGlzdGFuY2VcIilcclxuICBmaXhlZERpc3RhbmNlID0gNjA7XHJcbiAgXHJcbiAgQElucHV0KFwib3V0bGluZU5vZGVzXCIpXHJcbiAgb3V0bGluZU5vZGVzOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVMZWdlbmRzXCIpXHJcbiAgZW5hYmxlTGVnZW5kczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwic2hvd1R5cGVPbkhvdmVyXCIpXHJcbiAgc2hvd1R5cGVPbkhvdmVyOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJzaG93RGlyZWN0aW9uc1wiKVxyXG4gIHNob3dEaXJlY3Rpb25zOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJ0eXBlTWFwcGluZ1wiKVxyXG4gIHR5cGVNYXBwaW5nID0ge307XHJcblxyXG4gIEBJbnB1dChcIndpZHRoXCIpXHJcbiAgd2lkdGg6IHN0cmluZztcclxuXHJcbiAgQElucHV0KFwiaGVpZ2h0XCIpXHJcbiAgaGVpZ2h0OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoXCJvblZpc3VhbGl6YXRpb25cIilcclxuICBvblZpc3VhbGl6YXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJkM0NvbnRhaW5lclwiKVxyXG4gIGQzQ29udGFpbmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKXtcclxuICAgIGlmIChuYXZpZ2F0b3IucGxhdGZvcm0udG9VcHBlckNhc2UoKS5pbmRleE9mKCdNQUMnKTwwKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmKCF3aW5kb3cuc2NyZWVuVG9wICYmICF3aW5kb3cuc2NyZWVuWSkge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xyXG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IHdpbi5mdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luLmlubmVyV2lkdGggPT0gc2NyZWVuLndpZHRoICYmIHdpbi5pbm5lckhlaWdodCA9PSBzY3JlZW4uaGVpZ2h0KVxyXG4gICAgICAgIGlmKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xyXG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IHdpbi5mdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luLmlubmVyV2lkdGggPT0gc2NyZWVuLndpZHRoICYmIHdpbi5pbm5lckhlaWdodCA9PSBzY3JlZW4uaGVpZ2h0KVxyXG4gICAgICAgIGlmKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmlnZ2VyRXZhbHVhdGlvbihwb2ludHMpIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4T2YgPSB7fTtcclxuICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcbiAgICAgIGNvbnN0IGRhdGFTZXQgPSB7XHJcbiAgICAgICAgbGlua3M6W10sXHJcbiAgICAgICAgbm9kZXM6IFtdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICBwb2ludHMubWFwKCAobm9kZSxpbmRleCkgPT4gaW5kZXhPZltub2RlLmlkXSA9IGluZGV4KTtcclxuICAgICAgcG9pbnRzLm1hcCggKG5vZGUsIGkpID0+IHtcclxuICAgICAgICBkYXRhU2V0Lm5vZGVzLnB1c2goe1xyXG4gICAgICAgICAgc2l6ZTogbm9kZS5zaXplID8gbm9kZS5zaXplOiAxMCwgXHJcbiAgICAgICAgICBncm91cDogbm9kZS5ncm91cD8gbm9kZS5ncm91cCA6IDAsIFxyXG4gICAgICAgICAgdHlwZTogbm9kZS50eXBlICYmIG5vZGUudHlwZS5sZW5ndGggPyBub2RlLnR5cGUgOiBcImNpcmNsZVwiLFxyXG4gICAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IG5vZGUuaW1hZ2UsXHJcbiAgICAgICAgICBkYXRhOiBub2RlLmRhdGEgPyBub2RlLmRhdGEgOiBbXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKG5vZGUuc291cmNlcykge1xyXG4gICAgICAgICAgbm9kZS5zb3VyY2VzLm1hcCggKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpbmRleE9mW2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGF0YVNldC5saW5rcy5wdXNoKHtzb3VyY2U6IGl0ZW0sIHRhcmdldDogaX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiTWlzc2luZyBzb3VyY2Ugbm9kZSAnXCIgKyBpZCArIFwiJyBmb3Igbm9kZSAnXCIgKyBub2RlLmlkICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobm9kZS5kZXN0aW5hdGlvbnMpIHtcclxuICAgICAgICAgIG5vZGUuZGVzdGluYXRpb25zLm1hcCggKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpbmRleE9mW2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGF0YVNldC5saW5rcy5wdXNoKHtzb3VyY2U6IGksIHRhcmdldDogaXRlbX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiTWlzc2luZyBkZXN0aW5hdGlvbiBub2RlICdcIiArIGlkICsgXCInIGZvciBub2RlICdcIiArIG5vZGUuaWQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2Rhbmdlcic+XCIrZXJyb3JzLmpvaW4oXCI8YnIvPlwiKStcIjwvZGl2PlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgXHJcbiAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgIG9mZnNldDoge3g6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0LCB5OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wfSwgXHJcbiAgICAgICAgICBkYXRhOiBkYXRhU2V0LFxyXG4gICAgICAgICAgbWFwcGluZzogdGhpcy50eXBlTWFwcGluZywgXHJcbiAgICAgICAgICBzaG93VHlwZU9uSG92ZXI6IHRoaXMuc2hvd1R5cGVPbkhvdmVyLCBcclxuICAgICAgICAgIHNob3dEaXJlY3Rpb25zOiB0aGlzLnNob3dEaXJlY3Rpb25zLFxyXG4gICAgICAgICAgZW5hYmxlVG9vbHRpcDogdGhpcy5lbmFibGVUb29sdGlwLFxyXG4gICAgICAgICAgc2hvd0N1cnZlZENvbm5lY3Rpb25zOiB0aGlzLnNob3dDdXJ2ZWRDb25uZWN0aW9ucyxcclxuICAgICAgICAgIG91dGxpbmVOb2RlczogdGhpcy5vdXRsaW5lTm9kZXMsXHJcbiAgICAgICAgICBjaGFyZ2U6IC0xICogdGhpcy5yZXBlYWxGb3JjZSxcclxuICAgICAgICAgIGZpeGVkRGlzdGFuY2U6IHRoaXMuZml4ZWREaXN0YW5jZSxcclxuICAgICAgICAgIGdyYWRpZW50c0VuYWJsZWQ6IHRoaXMuZ3JhZGllbnRzRW5hYmxlZCxcclxuICAgICAgICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKGNvbmZpZyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2Rhbmdlcic+TWlzc2luZyBkYXRhLjwvZGl2PlwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICBpZiAoY2hhbmdlcy5kYXRhKSB7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZ09uSW5pdC5iaW5kKHRoaXMpLCAzMzMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiggISh0aGlzLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgdGhpcy5kYXRhID0gW3RoaXMuZGF0YV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXdpbmRvd1snaW5pdGlhdGVEMyddKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChcImFzc2V0cy9kMy5qc1wiLCAnZDNqcycpLnRoZW4oICgpID0+IHtcclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKHRoaXMuZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbih0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG4gXHR9XHJcbiAgIFxyXG5cdHByaXZhdGUgbG9hZFNjcmlwdCh1cmwsIGlkKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgXHJcbiAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG5cdFx0fSlcclxuICB9XHJcblxyXG4gIGV4cGFuZChmbGFnKSB7XHJcbiAgICBjb25zdCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG5cclxuICAgIGlmIChmbGFnKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgIGlmKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kZWQtY29udGFpbmVyXCIpO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgaWYgKHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0pIHtcclxuICAgICAgICB3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKDAsIDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZihkb2MuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZXhwYW5kZWQtY29udGFpbmVyXCIpO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKSB7XHJcbiAgICAgICAgd2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uY2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKGV2ZW50LnBvaW50cyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemVJdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN1YWxpemUtaXQuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBWaXN1YWxpemVJdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVmlzdWFsaXplSXRDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgVmlzdWFsaXplSXRDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXplSXRNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQ1VTVE9NX0VMRU1F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Q0FBQztvQkFDbkgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNULEtBQUssQ0FBQyxDQUFDO3dCQUFDLEtBQUssQ0FBQzs0QkFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLE1BQU07d0JBQzlCLEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUN4RCxLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FB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