import { __awaiter } from 'tslib';
import { Component, Input, Output, EventEmitter, RendererFactory2, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizeItComponent {
    /**
     * @param {?} factory
     */
    constructor(factory) {
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
            document.addEventListener("webkitfullscreenchange", (event) => {
                if (!window.screenTop && !window.screenY) {
                    this.expand(false);
                }
            });
            document.addEventListener("mozfullscreenchange", (event) => {
                /** @type {?} */
                const win = window;
                /** @type {?} */
                const isFullScreen = win.fullScreen ||
                    (win.innerWidth == screen.width && win.innerHeight == screen.height);
                if (!isFullScreen) {
                    this.expand(false);
                }
            });
            document.addEventListener("MSFullscreenChange", (event) => {
                /** @type {?} */
                const win = window;
                /** @type {?} */
                const isFullScreen = win.fullScreen ||
                    (win.innerWidth == screen.width && win.innerHeight == screen.height);
                if (!isFullScreen) {
                    this.expand(false);
                }
            });
        }
    }
    /**
     * @param {?} points
     * @return {?}
     */
    triggerEvaluation(points) {
        if (points.length) {
            /** @type {?} */
            const indexOf = {};
            /** @type {?} */
            const errors = [];
            /** @type {?} */
            const dataSet = {
                links: [],
                nodes: []
            };
            this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "";
            points.map((node, index) => indexOf[node.id] = index);
            points.map((node, i) => {
                dataSet.nodes.push({
                    size: node.size ? node.size : 10,
                    group: node.group ? node.group : 0,
                    type: node.type && node.type.length ? node.type : "circle",
                    name: node.name,
                    image: node.image,
                    data: node.data ? node.data : []
                });
                if (node.sources) {
                    node.sources.map((id) => {
                        /** @type {?} */
                        const item = indexOf[id];
                        if (item != undefined) {
                            dataSet.links.push({ source: item, target: i });
                        }
                        else {
                            errors.push("Missing source node '" + id + "' for node '" + node.id + "'.");
                        }
                    });
                }
                if (node.destinations) {
                    node.destinations.map((id) => {
                        /** @type {?} */
                        const item = indexOf[id];
                        if (item != undefined) {
                            dataSet.links.push({ source: i, target: item });
                        }
                        else {
                            errors.push("Missing destination node '" + id + "' for node '" + node.id + "'.");
                        }
                    });
                }
            });
            if (errors.length) {
                this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "<div class='danger'>" + errors.join("<br/>") + "</div>";
            }
            else {
                /** @type {?} */
                const el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
                /** @type {?} */
                const config = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    offset: { x: el.offsetLeft, y: el.offsetTop },
                    data: dataSet,
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.data) {
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!(this.data instanceof Array)) {
            this.data = [this.data];
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!window['initiateD3']) {
                yield this.loadScript("assets/d3.js", 'd3js').then(() => {
                    this.triggerEvaluation(this.data);
                });
            }
            else {
                this.triggerEvaluation(this.data);
            }
        });
    }
    /**
     * @param {?} url
     * @param {?} id
     * @return {?}
     */
    loadScript(url, id) {
        return new Promise((resolve, reject) => {
            /** @type {?} */
            const scriptElement = document.createElement('script');
            scriptElement.type = "text/javascript";
            scriptElement.src = url;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    expand(flag) {
        /** @type {?} */
        const doc = document;
        if (flag) {
            /** @type {?} */
            const el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
            /** @type {?} */
            const element = doc.documentElement;
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
            const el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
            el.classList.remove("expanded-container");
            this.expanded = false;
            if (window["centerVisibility"]) {
                window["centerVisibility"](el.offsetLeft, el.offsetTop);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onchange(event) {
        this.triggerEvaluation(event.points);
    }
}
VisualizeItComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualize-it',
                template: "\r\n<div class=\"legends\" *ngIf=\"enableLegends\">\r\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\r\n    \r\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\r\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\r\n    \r\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\r\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\r\n        <legend>Definitions</legend>\r\n        <b>Relationship types:</b><br/>\r\n        <strong>Dotted line:</strong> Descendancy relationship (example: Children of)<br/>\r\n        <strong>Solid Line:</strong> Origination relationship (example: Parents of)<br/>\r\n        <span *ngIf=\"showDirections\"><strong>Arrow on a line:</strong> Pointing toward the recipient of relationship.<br/></span>\r\n\r\n        <br/><b>Node types:</b><br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\r\n    </fieldset>\r\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\r\n        <legend>Tips</legend>\r\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\r\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\r\n        <b>Double-click to center node and zoom in.</b><br/>\r\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\r\n\r\n        <b>Filter nodes by:</b><br/>\r\n        <strong>\".\" :</strong> Stop/resume animation<br/>\r\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\r\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\r\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\r\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\r\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\r\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\r\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\r\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\r\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\r\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\r\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\r\n    </fieldset>\r\n</div>\r\n\r\n<div class=\"d3-container\" \r\n    tabindex=\"0\"\r\n    [style.width]=\"width\"\r\n    [style.height]=\"height\"\r\n    [id]=\"visualizerId\"></div>\r\n",
                styles: [":host{position:relative;display:block}:host.expanded-container{position:inherit!important}:host.expanded-container .d3-container{position:absolute;top:0;left:0;width:100vw!important;height:100vh!important;border:0!important;margin:0!important;z-index:3}:host .legends{position:absolute;right:12px;top:5px;z-index:4}:host .legends a{cursor:pointer;font-weight:700;font-size:1.2rem}:host .legends a span{background-color:#eee;padding:0 3px;width:13px;float:left;height:25px;line-height:25px;border:1px solid #3a3939}:host .legends a .expand{text-align:center;border-left:0;border-right:0}:host .legends a .legend{border-radius:5px 0 0 5px;border-right:0}:host .legends a .help{border-radius:0 5px 5px 0;border-left:0}:host .legends a:hover{color:#fff}:host .legends a:hover span{background-color:#b65200}:host .legends .info{padding:5px;border:1px solid #888;border-radius:5px;position:absolute;right:0;font-size:.7rem;line-height:1rem;box-shadow:1px 1px 3px #bbb;background-color:#fff;width:350px;top:15px}:host .legends .info legend{color:#af8d03;font-size:1rem;font-weight:700}:host .legends .info strong{color:#8f0000;font-size:.8rem;margin-left:20px}:host .d3-container{border:1px solid #633;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px;overflow:hidden}:host .d3-container ::ng-deep .danger{background-color:#a80505;color:#fff;padding:10px;display:table;width:100%}:host ::ng-deep path.link{fill:none;stroke:#666;stroke-width:1.5px}:host ::ng-deep circle{fill:#ccc;stroke:#fff;stroke-width:1.5px}:host ::ng-deep text{fill:#000;font:10px sans-serif;pointer-events:none}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}"]
            }] }
];
/** @nocollapse */
VisualizeItComponent.ctorParameters = () => [
    { type: RendererFactory2 }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizeItModule {
}
VisualizeItModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { VisualizeItComponent, VisualizeItModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdmlzdWFsaXplLWl0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvdmlzdWFsaXplLWl0L3NyYy9hcHAvdmlzdWFsaXplLWl0L2NvbXBvbmVudHMvdmlzdWFsaXplLWl0LmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL3Zpc3VhbGl6ZS1pdC9zcmMvYXBwL3Zpc3VhbGl6ZS1pdC92aXN1YWxpemUtaXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIHRvb2wgdG8gZGlzcGxheSByZXN1bHQgb2YgYSBzZWFyY2ggb24gc2V0IG9mIHBvaW50cyBvZiBpbnRlcmVzdHMgb24gb2JqZWN0cy5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgQWZ0ZXJWaWV3SW5pdCAsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlcjIsXHJcbiAgUmVuZGVyZXJGYWN0b3J5MlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemUtaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemUtaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXplSXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuICBzaG93TGVnZW5kID0gZmFsc2U7XHJcbiAgc2hvd0hlbHAgPSBmYWxzZTtcclxuICBleHBhbmRlZCA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XHJcbiAgXHJcbiAgQElucHV0KFwic2hvd0N1cnZlZENvbm5lY3Rpb25zXCIpXHJcbiAgc2hvd0N1cnZlZENvbm5lY3Rpb25zOiBzdHJpbmc7XHJcbiAgXHJcbiAgQElucHV0KFwidmlzdWFsaXplcklkXCIpXHJcbiAgdmlzdWFsaXplcklkID0gJ2QzLWNvbnRhaW5lcic7XHJcbiAgXHJcbiAgQElucHV0KFwiZW5hYmxlVG9vbHRpcFwiKVxyXG4gIGVuYWJsZVRvb2x0aXA6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcImdyYWRpZW50c0VuYWJsZWRcIilcclxuICBncmFkaWVudHNFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KFwicmVwZWFsRm9yY2VcIilcclxuICByZXBlYWxGb3JjZSA9IDMwMDtcclxuICBcclxuICBASW5wdXQoXCJmaXhlZERpc3RhbmNlXCIpXHJcbiAgZml4ZWREaXN0YW5jZSA9IDYwO1xyXG4gIFxyXG4gIEBJbnB1dChcIm91dGxpbmVOb2Rlc1wiKVxyXG4gIG91dGxpbmVOb2RlczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZW5hYmxlTGVnZW5kc1wiKVxyXG4gIGVuYWJsZUxlZ2VuZHM6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcInNob3dUeXBlT25Ib3ZlclwiKVxyXG4gIHNob3dUeXBlT25Ib3ZlcjogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwic2hvd0RpcmVjdGlvbnNcIilcclxuICBzaG93RGlyZWN0aW9uczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZGF0YVwiKVxyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgQElucHV0KFwidHlwZU1hcHBpbmdcIilcclxuICB0eXBlTWFwcGluZyA9IHt9O1xyXG5cclxuICBASW5wdXQoXCJ3aWR0aFwiKVxyXG4gIHdpZHRoOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dChcImhlaWdodFwiKVxyXG4gIGhlaWdodDogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KFwib25WaXN1YWxpemF0aW9uXCIpXHJcbiAgb25WaXN1YWxpemF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcclxuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLmZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XHJcbiAgICBpZiAobmF2aWdhdG9yLnBsYXRmb3JtLnRvVXBwZXJDYXNlKCkuaW5kZXhPZignTUFDJyk8MCkge1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYoIXdpbmRvdy5zY3JlZW5Ub3AgJiYgIXdpbmRvdy5zY3JlZW5ZKSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xyXG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IHdpbi5mdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luLmlubmVyV2lkdGggPT0gc2NyZWVuLndpZHRoICYmIHdpbi5pbm5lckhlaWdodCA9PSBzY3JlZW4uaGVpZ2h0KVxyXG4gICAgICAgIGlmKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdztcclxuICAgICAgICBjb25zdCBpc0Z1bGxTY3JlZW4gPSB3aW4uZnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbi5pbm5lcldpZHRoID09IHNjcmVlbi53aWR0aCAmJiB3aW4uaW5uZXJIZWlnaHQgPT0gc2NyZWVuLmhlaWdodClcclxuICAgICAgICBpZighaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJpZ2dlckV2YWx1YXRpb24ocG9pbnRzOiBhbnkpIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4T2YgPSB7fTtcclxuICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcbiAgICAgIGNvbnN0IGRhdGFTZXQgPSB7XHJcbiAgICAgICAgbGlua3M6W10sXHJcbiAgICAgICAgbm9kZXM6IFtdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJyMnICsgdGhpcy52aXN1YWxpemVySWQpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHBvaW50cy5tYXAoIChub2RlOiBhbnksaW5kZXg6IG51bWJlcikgPT4gaW5kZXhPZltub2RlLmlkXSA9IGluZGV4KTtcclxuICAgICAgcG9pbnRzLm1hcCggKG5vZGU6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgZGF0YVNldC5ub2Rlcy5wdXNoKHtcclxuICAgICAgICAgIHNpemU6IG5vZGUuc2l6ZSA/IG5vZGUuc2l6ZTogMTAsIFxyXG4gICAgICAgICAgZ3JvdXA6IG5vZGUuZ3JvdXA/IG5vZGUuZ3JvdXAgOiAwLCBcclxuICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSAmJiBub2RlLnR5cGUubGVuZ3RoID8gbm9kZS50eXBlIDogXCJjaXJjbGVcIixcclxuICAgICAgICAgIG5hbWU6IG5vZGUubmFtZSxcclxuICAgICAgICAgIGltYWdlOiBub2RlLmltYWdlLFxyXG4gICAgICAgICAgZGF0YTogbm9kZS5kYXRhID8gbm9kZS5kYXRhIDogW11cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihub2RlLnNvdXJjZXMpIHtcclxuICAgICAgICAgIG5vZGUuc291cmNlcy5tYXAoIChpZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpbmRleE9mW2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGF0YVNldC5saW5rcy5wdXNoKHtzb3VyY2U6IGl0ZW0sIHRhcmdldDogaX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiTWlzc2luZyBzb3VyY2Ugbm9kZSAnXCIgKyBpZCArIFwiJyBmb3Igbm9kZSAnXCIgKyBub2RlLmlkICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobm9kZS5kZXN0aW5hdGlvbnMpIHtcclxuICAgICAgICAgIG5vZGUuZGVzdGluYXRpb25zLm1hcCggKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpbmRleE9mW2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGF0YVNldC5saW5rcy5wdXNoKHtzb3VyY2U6IGksIHRhcmdldDogaXRlbX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiTWlzc2luZyBkZXN0aW5hdGlvbiBub2RlICdcIiArIGlkICsgXCInIGZvciBub2RlICdcIiArIG5vZGUuaWQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJyMnICsgdGhpcy52aXN1YWxpemVySWQpLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nZGFuZ2VyJz5cIitlcnJvcnMuam9pbihcIjxici8+XCIpK1wiPC9kaXY+XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLnJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KCcjJyArIHRoaXMudmlzdWFsaXplcklkKS5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgXHJcbiAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgIG9mZnNldDoge3g6IGVsLm9mZnNldExlZnQsIHk6IGVsLm9mZnNldFRvcH0sIFxyXG4gICAgICAgICAgZGF0YTogZGF0YVNldCxcclxuICAgICAgICAgIG1hcHBpbmc6IHRoaXMudHlwZU1hcHBpbmcsIFxyXG4gICAgICAgICAgc2hvd1R5cGVPbkhvdmVyOiB0aGlzLnNob3dUeXBlT25Ib3ZlciwgXHJcbiAgICAgICAgICBzaG93RGlyZWN0aW9uczogdGhpcy5zaG93RGlyZWN0aW9ucyxcclxuICAgICAgICAgIGVuYWJsZVRvb2x0aXA6IHRoaXMuZW5hYmxlVG9vbHRpcCxcclxuICAgICAgICAgIHNob3dDdXJ2ZWRDb25uZWN0aW9uczogdGhpcy5zaG93Q3VydmVkQ29ubmVjdGlvbnMsXHJcbiAgICAgICAgICBvdXRsaW5lTm9kZXM6IHRoaXMub3V0bGluZU5vZGVzLFxyXG4gICAgICAgICAgY2hhcmdlOiAtMSAqIHRoaXMucmVwZWFsRm9yY2UsXHJcbiAgICAgICAgICBmaXhlZERpc3RhbmNlOiB0aGlzLmZpeGVkRGlzdGFuY2UsXHJcbiAgICAgICAgICBncmFkaWVudHNFbmFibGVkOiB0aGlzLmdyYWRpZW50c0VuYWJsZWQsXHJcbiAgICAgICAgICB0YXJnZXREaXY6IFwiI1wiICsgdGhpcy52aXN1YWxpemVySWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKGNvbmZpZyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJyMnICsgdGhpcy52aXN1YWxpemVySWQpLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nZGFuZ2VyJz5NaXNzaW5nIGRhdGEuPC9kaXY+XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgIGlmIChjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgc2V0VGltZW91dCh0aGlzLm5nT25Jbml0LmJpbmQodGhpcyksIDMzMyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKCAhKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLmRhdGEgPSBbdGhpcy5kYXRhXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICghd2luZG93Wydpbml0aWF0ZUQzJ10pIHtcclxuICAgICAgYXdhaXQgdGhpcy5sb2FkU2NyaXB0KFwiYXNzZXRzL2QzLmpzXCIsICdkM2pzJykudGhlbiggKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24odGhpcy5kYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbiBcdH1cclxuICAgXHJcblx0cHJpdmF0ZSBsb2FkU2NyaXB0KHVybDogc3RyaW5nLCBpZDogc3RyaW5nKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgXHJcbiAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG5cdFx0fSlcclxuICB9XHJcblxyXG4gIGV4cGFuZChmbGFnOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG5cclxuICAgIGlmIChmbGFnKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCgnIycgKyB0aGlzLnZpc3VhbGl6ZXJJZCkucGFyZW50Tm9kZTtcclxuICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgaWYoZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImV4cGFuZGVkLWNvbnRhaW5lclwiKTtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIGlmICh3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKSB7XHJcbiAgICAgICAgd2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSgwLCAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYoZG9jLmV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZG9jLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihkb2MubW96Q2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICAgIGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBlbCA9IHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJyMnICsgdGhpcy52aXN1YWxpemVySWQpLnBhcmVudE5vZGU7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRlZC1jb250YWluZXJcIik7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0pIHtcclxuICAgICAgICB3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKGVsLm9mZnNldExlZnQsIGVsLm9mZnNldFRvcCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uY2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24oZXZlbnQucG9pbnRzKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFZpc3VhbGl6ZUl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFZpc3VhbGl6ZUl0Q29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBWaXN1YWxpemVJdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBWaXN1YWxpemVJdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVJdE1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBeUVFLFlBQW9CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCOzBCQW5EaEMsS0FBSzt3QkFDUCxLQUFLO3dCQUNMLEtBQUs7NEJBUUQsY0FBYztnQ0FNVixJQUFJOzJCQUdULEdBQUc7NkJBR0QsRUFBRTsyQkFrQkosRUFBRTsrQkFTRSxJQUFJLFlBQVksRUFBRTtRQUdsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNyRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMs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