/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, RendererFactory2 } from '@angular/core';
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
        this.onVisualization = new EventEmitter();
        this.renderer = this.factory.createRenderer(null, null);
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
                this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "<div class='danger'>" + errors_1.join("<br/>") + "</div>";
            }
            else {
                /** @type {?} */
                var el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
                /** @type {?} */
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
            var el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
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
            /** @type {?} */
            var el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
            el.classList.remove("expanded-container");
            this.expanded = false;
            if (window["centerVisibility"]) {
                window["centerVisibility"](el.offsetLeft, el.offsetTop);
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
        { type: Component, args: [{
                    selector: 'visualize-it',
                    template: "\r\n<div class=\"legends\" *ngIf=\"enableLegends\">\r\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\r\n    \r\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\r\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\r\n    \r\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\r\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\r\n        <legend>Definitions</legend>\r\n        <b>Relationship types:</b><br/>\r\n        <strong>Dotted line:</strong> Descendancy relationship (example: Children of)<br/>\r\n        <strong>Solid Line:</strong> Origination relationship (example: Parents of)<br/>\r\n        <span *ngIf=\"showDirections\"><strong>Arrow on a line:</strong> Pointing toward the recipient of relationship.<br/></span>\r\n\r\n        <br/><b>Node types:</b><br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\r\n    </fieldset>\r\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\r\n        <legend>Tips</legend>\r\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\r\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\r\n        <b>Double-click to center node and zoom in.</b><br/>\r\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\r\n\r\n        <b>Filter nodes by:</b><br/>\r\n        <strong>\".\" :</strong> Stop/resume animation<br/>\r\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\r\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\r\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\r\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\r\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\r\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\r\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\r\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\r\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\r\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\r\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\r\n    </fieldset>\r\n</div>\r\n\r\n<div class=\"d3-container\" \r\n    tabindex=\"0\"\r\n    [style.width]=\"width\"\r\n    [style.height]=\"height\"\r\n    [id]=\"visualizerId\"></div>\r\n",
                    styles: [":host{position:relative;display:block}:host.expanded-container{position:inherit!important}:host.expanded-container .d3-container{position:absolute;top:0;left:0;width:100vw!important;height:100vh!important;border:0!important;margin:0!important;z-index:3}:host .legends{position:absolute;right:12px;top:5px;z-index:4}:host .legends a{cursor:pointer;font-weight:700;font-size:1.2rem}:host .legends a span{background-color:#eee;padding:0 3px;width:13px;float:left;height:25px;line-height:25px;border:1px solid #3a3939}:host .legends a .expand{text-align:center;border-left:0;border-right:0}:host .legends a .legend{border-radius:5px 0 0 5px;border-right:0}:host .legends a .help{border-radius:0 5px 5px 0;border-left:0}:host .legends a:hover{color:#fff}:host .legends a:hover span{background-color:#b65200}:host .legends .info{padding:5px;border:1px solid #888;border-radius:5px;position:absolute;right:0;font-size:.7rem;line-height:1rem;box-shadow:1px 1px 3px #bbb;background-color:#fff;width:350px;top:15px}:host .legends .info legend{color:#af8d03;font-size:1rem;font-weight:700}:host .legends .info strong{color:#8f0000;font-size:.8rem;margin-left:20px}:host .d3-container{border:1px solid #633;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px;overflow:hidden}:host .d3-container ::ng-deep .danger{background-color:#a80505;color:#fff;padding:10px;display:table;width:100%}:host ::ng-deep path.link{fill:none;stroke:#666;stroke-width:1.5px}:host ::ng-deep circle{fill:#ccc;stroke:#fff;stroke-width:1.5px}:host ::ng-deep text{fill:#000;font:10px sans-serif;pointer-events:none}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}"]
                }] }
    ];
    /** @nocollapse */
    VisualizeItComponent.ctorParameters = function () { return [
        { type: RendererFactory2 }
    ]; };
    VisualizeItComponent.propDecorators = {
        showCurvedConnections: [{ type: Input, args: ["showCurvedConnections",] }],
        visualizerId: [{ type: Input, args: ["visualizerId",] }],
        enableTooltip: [{ type: Input, args: ["enableTooltip",] }],
        gradientsEnabled: [{ type: Input, args: ["gradientsEnabled",] }],
        repealForce: [{ type: Input, args: ["repealForce",] }],
        fixedDistance: [{ type: Input, args: ["fixedDistance",] }],
        outlineNodes: [{ type: Input, args: ["outlineNodes",] }],
        enableLegends: [{ type: Input, args: ["enableLegends",] }],
        showTypeOnHover: [{ type: Input, args: ["showTypeOnHover",] }],
        showDirections: [{ type: Input, args: ["showDirections",] }],
        data: [{ type: Input, args: ["data",] }],
        typeMapping: [{ type: Input, args: ["typeMapping",] }],
        width: [{ type: Input, args: ["width",] }],
        height: [{ type: Input, args: ["height",] }],
        onVisualization: [{ type: Output, args: ["onVisualization",] }]
    };
    return VisualizeItComponent;
}());
export { VisualizeItComponent };
if (false) {
    /** @type {?} */
    VisualizeItComponent.prototype.showLegend;
    /** @type {?} */
    VisualizeItComponent.prototype.showHelp;
    /** @type {?} */
    VisualizeItComponent.prototype.expanded;
    /** @type {?} */
    VisualizeItComponent.prototype.renderer;
    /** @type {?} */
    VisualizeItComponent.prototype.showCurvedConnections;
    /** @type {?} */
    VisualizeItComponent.prototype.visualizerId;
    /** @type {?} */
    VisualizeItComponent.prototype.enableTooltip;
    /** @type {?} */
    VisualizeItComponent.prototype.gradientsEnabled;
    /** @type {?} */
    VisualizeItComponent.prototype.repealForce;
    /** @type {?} */
    VisualizeItComponent.prototype.fixedDistance;
    /** @type {?} */
    VisualizeItComponent.prototype.outlineNodes;
    /** @type {?} */
    VisualizeItComponent.prototype.enableLegends;
    /** @type {?} */
    VisualizeItComponent.prototype.showTypeOnHover;
    /** @type {?} */
    VisualizeItComponent.prototype.showDirections;
    /** @type {?} */
    VisualizeItComponent.prototype.data;
    /** @type {?} */
    VisualizeItComponent.prototype.typeMapping;
    /** @type {?} */
    VisualizeItComponent.prototype.width;
    /** @type {?} */
    VisualizeItComponent.prototype.height;
    /** @type {?} */
    VisualizeItComponent.prototype.onVisualization;
    /** @type {?} */
    VisualizeItComponent.prototype.factory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXplLWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC92aXN1YWxpemUtaXQvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6ZS1pdC9jb21wb25lbnRzL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQ0wsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQzs7SUE0RHJCLDhCQUFvQixPQUF5QjtRQUE3QyxpQkF5QkM7UUF6Qm1CLFlBQU8sR0FBUCxPQUFPLENBQWtCOzBCQW5EaEMsS0FBSzt3QkFDUCxLQUFLO3dCQUNMLEtBQUs7NEJBUUQsY0FBYztnQ0FNVixJQUFJOzJCQUdULEdBQUc7NkJBR0QsRUFBRTsyQkFrQkosRUFBRTsrQkFTRSxJQUFJLFlBQVksRUFBRTtRQUdsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLEtBQVk7Z0JBQy9ELEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQjthQUNGLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxVQUFDLEtBQVk7O2dCQUM1RCxJQUFNLEdBQUcsR0FBUSxNQUFN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QUdyQixLQUFLLFNBQUMsaUJBQWlCO2lDQUd2QixLQUFLLFNBQUMsZ0JBQWdCO3VCQUd0QixLQUFLLFNBQUMsTUFBTTs4QkFHWixLQUFLLFNBQUMsYUFBYTt3QkFHbkIsS0FBSyxTQUFDLE9BQU87eUJBR2IsS0FBSyxTQUFDLFFBQVE7a0NBR2QsTUFBTSxTQUFDLGlCQUFpQjs7K0JBdEUzQjs7U0FvQmEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0ICxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFJlbmRlcmVyMixcclxuICBSZW5kZXJlckZhY3RvcnkyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Zpc3VhbGl6ZS1pdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXplLWl0LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVJdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XHJcblxyXG4gIHNob3dMZWdlbmQgPSBmYWxzZTtcclxuICBzaG93SGVscCA9IGZhbHNlO1xyXG4gIGV4cGFuZGVkID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMjtcclxuICBcclxuICBASW5wdXQoXCJzaG93Q3VydmVkQ29ubmVjdGlvbnNcIilcclxuICBzaG93Q3VydmVkQ29ubmVjdGlvbnM6IHN0cmluZztcclxuICBcclxuICBASW5wdXQoXCJ2aXN1YWxpemVySWRcIilcclxuICB2aXN1YWxpemVySWQgPSAnZDMtY29udGFpbmVyJztcclxuICBcclxuICBASW5wdXQoXCJlbmFibGVUb29sdGlwXCIpXHJcbiAgZW5hYmxlVG9vbHRpcDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZ3JhZGllbnRzRW5hYmxlZFwiKVxyXG4gIGdyYWRpZW50c0VuYWJsZWQgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoXCJyZXBlYWxGb3JjZVwiKVxyXG4gIHJlcGVhbEZvcmNlID0gMzAwO1xyXG4gIFxyXG4gIEBJbnB1dChcImZpeGVkRGlzdGFuY2VcIilcclxuICBmaXhlZERpc3RhbmNlID0gNjA7XHJcbiAgXHJcbiAgQElucHV0KFwib3V0bGluZU5vZGVzXCIpXHJcbiAgb3V0bGluZU5vZGVzOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVMZWdlbmRzXCIpXHJcbiAgZW5hYmxlTGVnZW5kczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwic2hvd1R5cGVPbkhvdmVyXCIpXHJcbiAgc2hvd1R5cGVPbkhvdmVyOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJzaG93RGlyZWN0aW9uc1wiKVxyXG4gIHNob3dEaXJlY3Rpb25zOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJ0eXBlTWFwcGluZ1wiKVxyXG4gIHR5cGVNYXBwaW5nID0ge307XHJcblxyXG4gIEBJbnB1dChcIndpZHRoXCIpXHJcbiAgd2lkdGg6IHN0cmluZztcclxuXHJcbiAgQElucHV0KFwiaGVpZ2h0XCIpXHJcbiAgaGVpZ2h0OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoXCJvblZpc3VhbGl6YXRpb25cIilcclxuICBvblZpc3VhbGl6YXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IHRoaXMuZmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcclxuICAgIGlmIChuYXZpZ2F0b3IucGxhdGZvcm0udG9VcHBlckNhc2UoKS5pbmRleE9mKCdNQUMnKTwwKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBpZighd2luZG93LnNjcmVlblRvcCAmJiAhd2luZG93LnNjcmVlblkpIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3c7XHJcbiAgICAgICAgY29uc3QgaXNGdWxsU2NyZWVuID0gd2luLmZ1bGxTY3JlZW4gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aW4uaW5uZXJXaWR0aCA9PSBzY3JlZW4ud2lkdGggJiYgd2luLmlubmVySGVpZ2h0ID09IHNjcmVlbi5oZWlnaHQpXHJcbiAgICAgICAgaWYoIWlzRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xyXG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IHdpbi5mdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luLmlubmVyV2lkdGggPT0gc2NyZWVuLndpZHRoICYmIHdpbi5pbm5lckhlaWdodCA9PSBzY3JlZW4uaGVpZ2h0KVxyXG4gICAgICAgIGlmKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmlnZ2VyRXZhbHVhdGlvbihwb2ludHM6IGFueSkge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgaW5kZXhPZiA9IHt9O1xyXG4gICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuICAgICAgY29uc3QgZGF0YVNldCA9IHtcclxuICAgICAgICBsaW5rczpbXSxcclxuICAgICAgICBub2RlczogW11cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCgnIycgKyB0aGlzLnZpc3VhbGl6ZXJJZCkuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgcG9pbnRzLm1hcCggKG5vZGU6IGFueSxpbmRleDogbnVtYmVyKSA9PiBpbmRleE9mW25vZGUuaWRdID0gaW5kZXgpO1xyXG4gICAgICBwb2ludHMubWFwKCAobm9kZTogYW55LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICBkYXRhU2V0Lm5vZGVzLnB1c2goe1xyXG4gICAgICAgICAgc2l6ZTogbm9kZS5zaXplID8gbm9kZS5zaXplOiAxMCwgXHJcbiAgICAgICAgICBncm91cDogbm9kZS5ncm91cD8gbm9kZS5ncm91cCA6IDAsIFxyXG4gICAgICAgICAgdHlwZTogbm9kZS50eXBlICYmIG5vZGUudHlwZS5sZW5ndGggPyBub2RlLnR5cGUgOiBcImNpcmNsZVwiLFxyXG4gICAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IG5vZGUuaW1hZ2UsXHJcbiAgICAgICAgICBkYXRhOiBub2RlLmRhdGEgPyBub2RlLmRhdGEgOiBbXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKG5vZGUuc291cmNlcykge1xyXG4gICAgICAgICAgbm9kZS5zb3VyY2VzLm1hcCggKGlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGluZGV4T2ZbaWRdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBkYXRhU2V0LmxpbmtzLnB1c2goe3NvdXJjZTogaXRlbSwgdGFyZ2V0OiBpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJNaXNzaW5nIHNvdXJjZSBub2RlICdcIiArIGlkICsgXCInIGZvciBub2RlICdcIiArIG5vZGUuaWQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihub2RlLmRlc3RpbmF0aW9ucykge1xyXG4gICAgICAgICAgbm9kZS5kZXN0aW5hdGlvbnMubWFwKCAoaWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGluZGV4T2ZbaWRdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBkYXRhU2V0LmxpbmtzLnB1c2goe3NvdXJjZTogaSwgdGFyZ2V0OiBpdGVtfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJNaXNzaW5nIGRlc3RpbmF0aW9uIG5vZGUgJ1wiICsgaWQgKyBcIicgZm9yIG5vZGUgJ1wiICsgbm9kZS5pZCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCgnIycgKyB0aGlzLnZpc3VhbGl6ZXJJZCkuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdkYW5nZXInPlwiK2Vycm9ycy5qb2luKFwiPGJyLz5cIikrXCI8L2Rpdj5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJyMnICsgdGhpcy52aXN1YWxpemVySWQpLnBhcmVudE5vZGU7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBcclxuICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG4gICAgICAgICAgb2Zmc2V0OiB7eDogZWwub2Zmc2V0TGVmdCwgeTogZWwub2Zmc2V0VG9wfSwgXHJcbiAgICAgICAgICBkYXRhOiBkYXRhU2V0LFxyXG4gICAgICAgICAgbWFwcGluZzogdGhpcy50eXBlTWFwcGluZywgXHJcbiAgICAgICAgICBzaG93VHlwZU9uSG92ZXI6IHRoaXMuc2hvd1R5cGVPbkhvdmVyLCBcclxuICAgICAgICAgIHNob3dEaXJlY3Rpb25zOiB0aGlzLnNob3dEaXJlY3Rpb25zLFxyXG4gICAgICAgICAgZW5hYmxlVG9vbHRpcDogdGhpcy5lbmFibGVUb29sdGlwLFxyXG4gICAgICAgICAgc2hvd0N1cnZlZENvbm5lY3Rpb25zOiB0aGlzLnNob3dDdXJ2ZWRDb25uZWN0aW9ucyxcclxuICAgICAgICAgIG91dGxpbmVOb2RlczogdGhpcy5vdXRsaW5lTm9kZXMsXHJcbiAgICAgICAgICBjaGFyZ2U6IC0xICogdGhpcy5yZXBlYWxGb3JjZSxcclxuICAgICAgICAgIGZpeGVkRGlzdGFuY2U6IHRoaXMuZml4ZWREaXN0YW5jZSxcclxuICAgICAgICAgIGdyYWRpZW50c0VuYWJsZWQ6IHRoaXMuZ3JhZGllbnRzRW5hYmxlZCxcclxuICAgICAgICAgIHRhcmdldERpdjogXCIjXCIgKyB0aGlzLnZpc3VhbGl6ZXJJZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93Wydpbml0aWF0ZUQzJ10oY29uZmlnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCgnIycgKyB0aGlzLnZpc3VhbGl6ZXJJZCkuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdkYW5nZXInPk1pc3NpbmcgZGF0YS48L2Rpdj5cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG4gICAgaWYgKGNoYW5nZXMuZGF0YSkge1xyXG4gICAgICBzZXRUaW1lb3V0KHRoaXMubmdPbkluaXQuYmluZCh0aGlzKSwgMzMzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYoICEodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IFt0aGlzLmRhdGFdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF3aW5kb3dbJ2luaXRpYXRlRDMnXSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRTY3JpcHQoXCJhc3NldHMvZDMuanNcIiwgJ2QzanMnKS50aGVuKCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbih0aGlzLmRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24odGhpcy5kYXRhKTtcclxuICAgIH1cclxuIFx0fVxyXG4gICBcclxuXHRwcml2YXRlIGxvYWRTY3JpcHQodXJsOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHsgICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBcclxuICAgICAgc2NyaXB0RWxlbWVudC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuICAgICAgc2NyaXB0RWxlbWVudC5zcmMgPSB1cmw7XHJcbiAgICAgIHNjcmlwdEVsZW1lbnQub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcblx0XHR9KVxyXG4gIH1cclxuXHJcbiAgZXhwYW5kKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcblxyXG4gICAgaWYgKGZsYWcpIHtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLnJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KCcjJyArIHRoaXMudmlzdWFsaXplcklkKS5wYXJlbnROb2RlO1xyXG4gICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICBpZihlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfVxyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kZWQtY29udGFpbmVyXCIpO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgaWYgKHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0pIHtcclxuICAgICAgICB3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKDAsIDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZihkb2MuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCgnIycgKyB0aGlzLnZpc3VhbGl6ZXJJZCkucGFyZW50Tm9kZTtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImV4cGFuZGVkLWNvbnRhaW5lclwiKTtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAod2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSkge1xyXG4gICAgICAgIHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0oZWwub2Zmc2V0TGVmdCwgZWwub2Zmc2V0VG9wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25jaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihldmVudC5wb2ludHMpO1xyXG4gIH1cclxufVxyXG4iXX0=