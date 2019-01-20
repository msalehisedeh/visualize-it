/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
var VisualizeItComponent = /** @class */ (function () {
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
        this.onVisualization = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'visualize-it',
                    template: "\r\n<div class=\"legends\" *ngIf=\"enableLegends\">\r\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\r\n    \r\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\r\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\r\n    \r\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\r\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\r\n        <legend>Definitions</legend>\r\n        <b>Relationship types:</b><br/>\r\n        <strong>Dotted line:</strong> Descendancy relationship (example: Children of)<br/>\r\n        <strong>Solid Line:</strong> Origination relationship (example: Parents of)<br/>\r\n        <span *ngIf=\"showDirections\"><strong>Arrow on a line:</strong> Pointing toward the recipient of relationship.<br/></span>\r\n\r\n        <br/><b>Node types:</b><br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\r\n    </fieldset>\r\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\r\n        <legend>Tips</legend>\r\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\r\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\r\n        <b>Double-click to center node and zoom in.</b><br/>\r\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\r\n\r\n        <b>Filter nodes by:</b><br/>\r\n        <strong>\".\" :</strong> Stop/resume animation<br/>\r\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\r\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\r\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\r\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\r\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\r\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\r\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\r\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\r\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\r\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\r\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\r\n    </fieldset>\r\n</div>\r\n\r\n<div class=\"d3-container\" \r\n    tabindex=\"0\"\r\n    [style.width]=\"width\"\r\n    [style.height]=\"height\"\r\n    id=\"d3-container\" #d3Container></div>\r\n",
                    styles: [":host{position:relative;display:block}:host.expanded-container{position:inherit!important}:host.expanded-container .d3-container{position:absolute;top:0;left:0;width:100vw!important;height:100vh!important;border:0!important;margin:0!important;z-index:3}:host .legends{position:absolute;right:12px;top:5px;z-index:4}:host .legends a{cursor:pointer;font-weight:700;font-size:1.2rem}:host .legends a span{background-color:#eee;padding:0 3px;width:13px;float:left;height:25px;line-height:25px;border:1px solid #3a3939}:host .legends a .expand{text-align:center;border-left:0;border-right:0}:host .legends a .legend{border-radius:5px 0 0 5px;border-right:0}:host .legends a .help{border-radius:0 5px 5px 0;border-left:0}:host .legends a:hover{color:#fff}:host .legends a:hover span{background-color:#b65200}:host .legends .info{padding:5px;border:1px solid #888;border-radius:5px;position:absolute;right:0;font-size:.7rem;line-height:1rem;box-shadow:1px 1px 3px #bbb;background-color:#fff;width:350px;top:15px}:host .legends .info legend{color:#af8d03;font-size:1rem;font-weight:700}:host .legends .info strong{color:#8f0000;font-size:.8rem;margin-left:20px}:host #d3-container{border:1px solid #633;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px;overflow:hidden}:host #d3-container ::ng-deep .danger{background-color:#a80505;color:#fff;padding:10px;display:table;width:100%}:host ::ng-deep path.link{fill:none;stroke:#666;stroke-width:1.5px}:host ::ng-deep circle{fill:#ccc;stroke:#fff;stroke-width:1.5px}:host ::ng-deep text{fill:#000;font:10px sans-serif;pointer-events:none}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}"]
                }] }
    ];
    /** @nocollapse */
    VisualizeItComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    VisualizeItComponent.propDecorators = {
        showCurvedConnections: [{ type: Input, args: ["showCurvedConnections",] }],
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
        onVisualization: [{ type: Output, args: ["onVisualization",] }],
        d3Container: [{ type: ViewChild, args: ["d3Container",] }]
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
    VisualizeItComponent.prototype.showCurvedConnections;
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
    VisualizeItComponent.prototype.d3Container;
    /** @type {?} */
    VisualizeItComponent.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXplLWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC92aXN1YWxpemUtaXQvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6ZS1pdC9jb21wb25lbnRzL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQ0wsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7O0lBMERyQiw4QkFBb0IsRUFBYztRQUFsQyxpQkF3QkM7UUF4Qm1CLE9BQUUsR0FBRixFQUFFLENBQVk7MEJBakRyQixLQUFLO3dCQUNQLEtBQUs7d0JBQ0wsS0FBSztnQ0FTRyxJQUFJOzJCQUdULEdBQUc7NkJBR0QsRUFBRTsyQkFrQkosRUFBRTsrQkFTRSxJQUFJLFlBQVksRUFBRTtRQU1sQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLEtBQUs7Z0JBQ3hELEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQjthQUNGLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxVQUFDLEtBQUs7O2dCQUNyRCxJQUFNLEdBQUcsR0FBUSxNQUFNLENBQUM7O2dCQUN4QixJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsVUFBVTtvQkFDZixDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLEtB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QUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9GO1NBQ0Y7S0FDRjs7Ozs7SUFFRCx1Q0FBUTs7OztJQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEM7O2dCQTVORixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLHV1SUFBNEM7O2lCQUU3Qzs7OztnQkFQQyxVQUFVOzs7d0NBY1QsS0FBSyxTQUFDLHVCQUF1QjtnQ0FHN0IsS0FBSyxTQUFDLGVBQWU7bUNBR3JCLEtBQUssU0FBQyxrQkFBa0I7OEJBR3hCLEtBQUssU0FBQyxhQUFhO2dDQUduQixLQUFLLFNBQUMsZUFBZTsrQkFHckIsS0FBSyxTQUFDLGNBQWM7Z0NBR3BCLEtBQUssU0FBQyxlQUFlO2tDQUdyQixLQUFLLFNBQUMsaUJBQWlCO2lDQUd2QixLQUFLLFNBQUMsZ0JBQWdCO3VCQUd0QixLQUFLLFNBQUMsTUFBTTs4QkFHWixLQUFLLFNBQUMsYUFBYTt3QkFHbkIsS0FBSyxTQUFDLE9BQU87eUJBR2IsS0FBSyxTQUFDLFFBQVE7a0NBR2QsTUFBTSxTQUFDLGlCQUFpQjs4QkFHeEIsU0FBUyxTQUFDLGFBQWE7OytCQXBFMUI7O1NBb0JhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIHRvb2wgdG8gZGlzcGxheSByZXN1bHQgb2YgYSBzZWFyY2ggb24gc2V0IG9mIHBvaW50cyBvZiBpbnRlcmVzdHMgb24gb2JqZWN0cy5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgQWZ0ZXJWaWV3SW5pdCAsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgRWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemUtaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemUtaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXplSXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuICBzaG93TGVnZW5kID0gZmFsc2U7XHJcbiAgc2hvd0hlbHAgPSBmYWxzZTtcclxuICBleHBhbmRlZCA9IGZhbHNlO1xyXG4gIFxyXG4gIEBJbnB1dChcInNob3dDdXJ2ZWRDb25uZWN0aW9uc1wiKVxyXG4gIHNob3dDdXJ2ZWRDb25uZWN0aW9uczogc3RyaW5nO1xyXG4gIFxyXG4gIEBJbnB1dChcImVuYWJsZVRvb2x0aXBcIilcclxuICBlbmFibGVUb29sdGlwOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJncmFkaWVudHNFbmFibGVkXCIpXHJcbiAgZ3JhZGllbnRzRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIEBJbnB1dChcInJlcGVhbEZvcmNlXCIpXHJcbiAgcmVwZWFsRm9yY2UgPSAzMDA7XHJcbiAgXHJcbiAgQElucHV0KFwiZml4ZWREaXN0YW5jZVwiKVxyXG4gIGZpeGVkRGlzdGFuY2UgPSA2MDtcclxuICBcclxuICBASW5wdXQoXCJvdXRsaW5lTm9kZXNcIilcclxuICBvdXRsaW5lTm9kZXM6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcImVuYWJsZUxlZ2VuZHNcIilcclxuICBlbmFibGVMZWdlbmRzOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJzaG93VHlwZU9uSG92ZXJcIilcclxuICBzaG93VHlwZU9uSG92ZXI6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcInNob3dEaXJlY3Rpb25zXCIpXHJcbiAgc2hvd0RpcmVjdGlvbnM6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcImRhdGFcIilcclxuICBkYXRhOiBhbnk7XHJcblxyXG4gIEBJbnB1dChcInR5cGVNYXBwaW5nXCIpXHJcbiAgdHlwZU1hcHBpbmcgPSB7fTtcclxuXHJcbiAgQElucHV0KFwid2lkdGhcIilcclxuICB3aWR0aDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoXCJoZWlnaHRcIilcclxuICBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgQE91dHB1dChcIm9uVmlzdWFsaXphdGlvblwiKVxyXG4gIG9uVmlzdWFsaXphdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImQzQ29udGFpbmVyXCIpXHJcbiAgZDNDb250YWluZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpe1xyXG4gICAgaWYgKG5hdmlnYXRvci5wbGF0Zm9ybS50b1VwcGVyQ2FzZSgpLmluZGV4T2YoJ01BQycpPDApIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYoIXdpbmRvdy5zY3JlZW5Ub3AgJiYgIXdpbmRvdy5zY3JlZW5ZKSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3c7XHJcbiAgICAgICAgY29uc3QgaXNGdWxsU2NyZWVuID0gd2luLmZ1bGxTY3JlZW4gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aW4uaW5uZXJXaWR0aCA9PSBzY3JlZW4ud2lkdGggJiYgd2luLmlubmVySGVpZ2h0ID09IHNjcmVlbi5oZWlnaHQpXHJcbiAgICAgICAgaWYoIWlzRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3c7XHJcbiAgICAgICAgY29uc3QgaXNGdWxsU2NyZWVuID0gd2luLmZ1bGxTY3JlZW4gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aW4uaW5uZXJXaWR0aCA9PSBzY3JlZW4ud2lkdGggJiYgd2luLmlubmVySGVpZ2h0ID09IHNjcmVlbi5oZWlnaHQpXHJcbiAgICAgICAgaWYoIWlzRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyaWdnZXJFdmFsdWF0aW9uKHBvaW50cykge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgaW5kZXhPZiA9IHt9O1xyXG4gICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuICAgICAgY29uc3QgZGF0YVNldCA9IHtcclxuICAgICAgICBsaW5rczpbXSxcclxuICAgICAgICBub2RlczogW11cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHBvaW50cy5tYXAoIChub2RlLGluZGV4KSA9PiBpbmRleE9mW25vZGUuaWRdID0gaW5kZXgpO1xyXG4gICAgICBwb2ludHMubWFwKCAobm9kZSwgaSkgPT4ge1xyXG4gICAgICAgIGRhdGFTZXQubm9kZXMucHVzaCh7XHJcbiAgICAgICAgICBzaXplOiBub2RlLnNpemUgPyBub2RlLnNpemU6IDEwLCBcclxuICAgICAgICAgIGdyb3VwOiBub2RlLmdyb3VwPyBub2RlLmdyb3VwIDogMCwgXHJcbiAgICAgICAgICB0eXBlOiBub2RlLnR5cGUgJiYgbm9kZS50eXBlLmxlbmd0aCA/IG5vZGUudHlwZSA6IFwiY2lyY2xlXCIsXHJcbiAgICAgICAgICBuYW1lOiBub2RlLm5hbWUsXHJcbiAgICAgICAgICBpbWFnZTogbm9kZS5pbWFnZSxcclxuICAgICAgICAgIGRhdGE6IG5vZGUuZGF0YSA/IG5vZGUuZGF0YSA6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYobm9kZS5zb3VyY2VzKSB7XHJcbiAgICAgICAgICBub2RlLnNvdXJjZXMubWFwKCAoaWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGluZGV4T2ZbaWRdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBkYXRhU2V0LmxpbmtzLnB1c2goe3NvdXJjZTogaXRlbSwgdGFyZ2V0OiBpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJNaXNzaW5nIHNvdXJjZSBub2RlICdcIiArIGlkICsgXCInIGZvciBub2RlICdcIiArIG5vZGUuaWQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihub2RlLmRlc3RpbmF0aW9ucykge1xyXG4gICAgICAgICAgbm9kZS5kZXN0aW5hdGlvbnMubWFwKCAoaWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGluZGV4T2ZbaWRdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBkYXRhU2V0LmxpbmtzLnB1c2goe3NvdXJjZTogaSwgdGFyZ2V0OiBpdGVtfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJNaXNzaW5nIGRlc3RpbmF0aW9uIG5vZGUgJ1wiICsgaWQgKyBcIicgZm9yIG5vZGUgJ1wiICsgbm9kZS5pZCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nZGFuZ2VyJz5cIitlcnJvcnMuam9pbihcIjxici8+XCIpK1wiPC9kaXY+XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBcclxuICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG4gICAgICAgICAgb2Zmc2V0OiB7eDogdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQsIHk6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRUb3B9LCBcclxuICAgICAgICAgIGRhdGE6IGRhdGFTZXQsXHJcbiAgICAgICAgICBtYXBwaW5nOiB0aGlzLnR5cGVNYXBwaW5nLCBcclxuICAgICAgICAgIHNob3dUeXBlT25Ib3ZlcjogdGhpcy5zaG93VHlwZU9uSG92ZXIsIFxyXG4gICAgICAgICAgc2hvd0RpcmVjdGlvbnM6IHRoaXMuc2hvd0RpcmVjdGlvbnMsXHJcbiAgICAgICAgICBlbmFibGVUb29sdGlwOiB0aGlzLmVuYWJsZVRvb2x0aXAsXHJcbiAgICAgICAgICBzaG93Q3VydmVkQ29ubmVjdGlvbnM6IHRoaXMuc2hvd0N1cnZlZENvbm5lY3Rpb25zLFxyXG4gICAgICAgICAgb3V0bGluZU5vZGVzOiB0aGlzLm91dGxpbmVOb2RlcyxcclxuICAgICAgICAgIGNoYXJnZTogLTEgKiB0aGlzLnJlcGVhbEZvcmNlLFxyXG4gICAgICAgICAgZml4ZWREaXN0YW5jZTogdGhpcy5maXhlZERpc3RhbmNlLFxyXG4gICAgICAgICAgZ3JhZGllbnRzRW5hYmxlZDogdGhpcy5ncmFkaWVudHNFbmFibGVkLFxyXG4gICAgICAgICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93Wydpbml0aWF0ZUQzJ10oY29uZmlnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nZGFuZ2VyJz5NaXNzaW5nIGRhdGEuPC9kaXY+XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgIGlmIChjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgc2V0VGltZW91dCh0aGlzLm5nT25Jbml0LmJpbmQodGhpcyksIDMzMyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKCAhKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLmRhdGEgPSBbdGhpcy5kYXRhXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICghd2luZG93Wydpbml0aWF0ZUQzJ10pIHtcclxuICAgICAgYXdhaXQgdGhpcy5sb2FkU2NyaXB0KFwiYXNzZXRzL2QzLmpzXCIsICdkM2pzJykudGhlbiggKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24odGhpcy5kYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbiBcdH1cclxuICAgXHJcblx0cHJpdmF0ZSBsb2FkU2NyaXB0KHVybCwgaWQpIHsgICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBcclxuICAgICAgc2NyaXB0RWxlbWVudC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuICAgICAgc2NyaXB0RWxlbWVudC5zcmMgPSB1cmw7XHJcbiAgICAgIHNjcmlwdEVsZW1lbnQub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcblx0XHR9KVxyXG4gIH1cclxuXHJcbiAgZXhwYW5kKGZsYWcpIHtcclxuICAgIGNvbnN0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcblxyXG4gICAgaWYgKGZsYWcpIHtcclxuICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgaWYoZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJleHBhbmRlZC1jb250YWluZXJcIik7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICBpZiAod2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSkge1xyXG4gICAgICAgIHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0oMCwgMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKGRvYy5leGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGRvYy5leGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICBkb2MubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRlZC1jb250YWluZXJcIik7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0pIHtcclxuICAgICAgICB3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25jaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24oZXZlbnQucG9pbnRzKTtcclxuICB9XHJcbn1cclxuIl19