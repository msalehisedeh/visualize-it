/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
export class VisualizeItComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
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
            this.d3Container.nativeElement.innerHTML = "";
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
                this.d3Container.nativeElement.innerHTML = "<div class='danger'>" + errors.join("<br/>") + "</div>";
            }
            else {
                /** @type {?} */
                const config = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    offset: { x: this.el.nativeElement.offsetLeft, y: this.el.nativeElement.offsetTop },
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
                    targetDiv: "#d3-container"
                };
                window['initiateD3'](config);
            }
        }
        else {
            this.d3Container.nativeElement.innerHTML = "<div class='danger'>Missing data.</div>";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                template: "\r\n<div class=\"legends\" *ngIf=\"enableLegends\">\r\n    <a tabindex=\"0\" (click)=\"showLegend = !showLegend;showHelp = false\" title=\"show Legend\"><span class=\"legend\">&#9826;</span></a>\r\n    \r\n    <a *ngIf=\"!expanded\" tabindex=\"0\" (click)=\"expand(true)\" title=\"show in full screen\"><span class=\"expand\">&#9859;</span></a>\r\n    <a *ngIf=\"expanded\" tabindex=\"0\" (click)=\"expand(false)\" title=\"show in normal screen\"><span class=\"expand\">&#9860;</span></a>\r\n    \r\n    <a tabindex=\"0\" (click)=\"showLegend = false;showHelp = !showHelp\" title=\"show help\"><span class=\"help\">?</span></a>\r\n    <fieldset class=\"info\" *ngIf=\"showLegend\">\r\n        <legend>Definitions</legend>\r\n        <b>Relationship types:</b><br/>\r\n        <strong>Dotted line:</strong> Descendancy relationship (example: Children of)<br/>\r\n        <strong>Solid Line:</strong> Origination relationship (example: Parents of)<br/>\r\n        <span *ngIf=\"showDirections\"><strong>Arrow on a line:</strong> Pointing toward the recipient of relationship.<br/></span>\r\n\r\n        <br/><b>Node types:</b><br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>\r\n    </fieldset>\r\n    <fieldset class=\"info\" *ngIf=\"showHelp\">\r\n        <legend>Tips</legend>\r\n        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>\r\n        <b>Hold mouse down on a node to fade surroundings.</b><br/>\r\n        <b>Double-click to center node and zoom in.</b><br/>\r\n        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>\r\n\r\n        <b>Filter nodes by:</b><br/>\r\n        <strong>\".\" :</strong> Stop/resume animation<br/>\r\n        <strong>\"!\" :</strong> Show/hide node category on hover<br/>\r\n        <strong>\"#\" :</strong> Show/hide link arrow direction<br/>\r\n        <strong>\"@\" :</strong> Show/hide node names or node category<br/>\r\n        <strong>\"T\" :</strong> Enable/disable displaying of Tooltip<br/>\r\n        <strong>\"Z\" :</strong> Do/Don't Normalize node sizes on zoom<br/>\r\n        <span *ngIf=\"typeMapping['circle']\"><strong>\"C\" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['cross']\"><strong>\"X\" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['diamond']\"><strong>\"R\" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['square']\"><strong>\"S\" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-down']\"><strong>\"D\" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>\r\n        <span *ngIf=\"typeMapping['triangle-up']\"><strong>\"U\" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>\r\n        <strong>\"L\" :</strong> Show/hide all low range group (%33) nodes<br/>\r\n        <strong>\"M\" :</strong> Show/hide all medium range group (%50) nodes<br/>\r\n        <strong>\"H\" :</strong> Show/hide all high range group (%66) nodes<br/>\r\n        <strong>\"1\" :</strong> Show/hide all low range group (%33) links<br/>\r\n        <strong>\"2\" :</strong> Show/hide all medium range group (%50) links<br/>\r\n        <strong>\"3\" :</strong> Show/hide all high range group (%66) links\r\n    </fieldset>\r\n</div>\r\n\r\n<div class=\"d3-container\" \r\n    tabindex=\"0\"\r\n    [style.width]=\"width\"\r\n    [style.height]=\"height\"\r\n    id=\"d3-container\" #d3Container></div>\r\n",
                styles: [":host{position:relative;display:block}:host.expanded-container{position:inherit!important}:host.expanded-container .d3-container{position:absolute;top:0;left:0;width:100vw!important;height:100vh!important;border:0!important;margin:0!important;z-index:3}:host .legends{position:absolute;right:12px;top:5px;z-index:4}:host .legends a{cursor:pointer;font-weight:700;font-size:1.2rem}:host .legends a span{background-color:#eee;padding:0 3px;width:13px;float:left;height:25px;line-height:25px;border:1px solid #3a3939}:host .legends a .expand{text-align:center;border-left:0;border-right:0}:host .legends a .legend{border-radius:5px 0 0 5px;border-right:0}:host .legends a .help{border-radius:0 5px 5px 0;border-left:0}:host .legends a:hover{color:#fff}:host .legends a:hover span{background-color:#b65200}:host .legends .info{padding:5px;border:1px solid #888;border-radius:5px;position:absolute;right:0;font-size:.7rem;line-height:1rem;box-shadow:1px 1px 3px #bbb;background-color:#fff;width:350px;top:15px}:host .legends .info legend{color:#af8d03;font-size:1rem;font-weight:700}:host .legends .info strong{color:#8f0000;font-size:.8rem;margin-left:20px}:host #d3-container{border:1px solid #633;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px;overflow:hidden}:host #d3-container ::ng-deep .danger{background-color:#a80505;color:#fff;padding:10px;display:table;width:100%}:host ::ng-deep path.link{fill:none;stroke:#666;stroke-width:1.5px}:host ::ng-deep circle{fill:#ccc;stroke:#fff;stroke-width:1.5px}:host ::ng-deep text{fill:#000;font:10px sans-serif;pointer-events:none}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}"]
            }] }
];
/** @nocollapse */
VisualizeItComponent.ctorParameters = () => [
    { type: ElementRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXplLWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC92aXN1YWxpemUtaXQvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6ZS1pdC9jb21wb25lbnRzL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQ0wsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFPdkIsTUFBTTs7OztJQW1ESixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTswQkFqRHJCLEtBQUs7d0JBQ1AsS0FBSzt3QkFDTCxLQUFLO2dDQVNHLElBQUk7MkJBR1QsR0FBRzs2QkFHRCxFQUFFOzJCQWtCSixFQUFFOytCQVNFLElBQUksWUFBWSxFQUFFO1FBTWxDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzVELEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQjthQUNGLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFOztnQkFDekQsTUFBTSxHQUFHLEdBQVEsTUFBTSxDQUFDOztnQkFDeEIsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLFVBQVU7b0JBQ2YsQ0FBQyxHQUFHLENBQUMsVUFBVSxJ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O1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9GO1NBQ0Y7S0FDRjs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEM7OztZQTVORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLHV1SUFBNEM7O2FBRTdDOzs7O1lBUEMsVUFBVTs7O29DQWNULEtBQUssU0FBQyx1QkFBdUI7NEJBRzdCLEtBQUssU0FBQyxlQUFlOytCQUdyQixLQUFLLFNBQUMsa0JBQWtCOzBCQUd4QixLQUFLLFNBQUMsYUFBYTs0QkFHbkIsS0FBSyxTQUFDLGVBQWU7MkJBR3JCLEtBQUssU0FBQyxjQUFjOzRCQUdwQixLQUFLLFNBQUMsZUFBZTs4QkFHckIsS0FBSyxTQUFDLGlCQUFpQjs2QkFHdkIsS0FBSyxTQUFDLGdCQUFnQjttQkFHdEIsS0FBSyxTQUFDLE1BQU07MEJBR1osS0FBSyxTQUFDLGFBQWE7b0JBR25CLEtBQUssU0FBQyxPQUFPO3FCQUdiLEtBQUssU0FBQyxRQUFROzhCQUdkLE1BQU0sU0FBQyxpQkFBaUI7MEJBR3hCLFNBQVMsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0ICxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Zpc3VhbGl6ZS1pdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6ZS1pdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXplLWl0LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemVJdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XHJcblxyXG4gIHNob3dMZWdlbmQgPSBmYWxzZTtcclxuICBzaG93SGVscCA9IGZhbHNlO1xyXG4gIGV4cGFuZGVkID0gZmFsc2U7XHJcbiAgXHJcbiAgQElucHV0KFwic2hvd0N1cnZlZENvbm5lY3Rpb25zXCIpXHJcbiAgc2hvd0N1cnZlZENvbm5lY3Rpb25zOiBzdHJpbmc7XHJcbiAgXHJcbiAgQElucHV0KFwiZW5hYmxlVG9vbHRpcFwiKVxyXG4gIGVuYWJsZVRvb2x0aXA6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcImdyYWRpZW50c0VuYWJsZWRcIilcclxuICBncmFkaWVudHNFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KFwicmVwZWFsRm9yY2VcIilcclxuICByZXBlYWxGb3JjZSA9IDMwMDtcclxuICBcclxuICBASW5wdXQoXCJmaXhlZERpc3RhbmNlXCIpXHJcbiAgZml4ZWREaXN0YW5jZSA9IDYwO1xyXG4gIFxyXG4gIEBJbnB1dChcIm91dGxpbmVOb2Rlc1wiKVxyXG4gIG91dGxpbmVOb2RlczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZW5hYmxlTGVnZW5kc1wiKVxyXG4gIGVuYWJsZUxlZ2VuZHM6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dChcInNob3dUeXBlT25Ib3ZlclwiKVxyXG4gIHNob3dUeXBlT25Ib3ZlcjogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwic2hvd0RpcmVjdGlvbnNcIilcclxuICBzaG93RGlyZWN0aW9uczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZGF0YVwiKVxyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgQElucHV0KFwidHlwZU1hcHBpbmdcIilcclxuICB0eXBlTWFwcGluZyA9IHt9O1xyXG5cclxuICBASW5wdXQoXCJ3aWR0aFwiKVxyXG4gIHdpZHRoOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dChcImhlaWdodFwiKVxyXG4gIGhlaWdodDogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KFwib25WaXN1YWxpemF0aW9uXCIpXHJcbiAgb25WaXN1YWxpemF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFwiZDNDb250YWluZXJcIilcclxuICBkM0NvbnRhaW5lcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZil7XHJcbiAgICBpZiAobmF2aWdhdG9yLnBsYXRmb3JtLnRvVXBwZXJDYXNlKCkuaW5kZXhPZignTUFDJyk8MCkge1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZighd2luZG93LnNjcmVlblRvcCAmJiAhd2luZG93LnNjcmVlblkpIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdztcclxuICAgICAgICBjb25zdCBpc0Z1bGxTY3JlZW4gPSB3aW4uZnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbi5pbm5lcldpZHRoID09IHNjcmVlbi53aWR0aCAmJiB3aW4uaW5uZXJIZWlnaHQgPT0gc2NyZWVuLmhlaWdodClcclxuICAgICAgICBpZighaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TRnVsbHNjcmVlbkNoYW5nZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdztcclxuICAgICAgICBjb25zdCBpc0Z1bGxTY3JlZW4gPSB3aW4uZnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbi5pbm5lcldpZHRoID09IHNjcmVlbi53aWR0aCAmJiB3aW4uaW5uZXJIZWlnaHQgPT0gc2NyZWVuLmhlaWdodClcclxuICAgICAgICBpZighaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJpZ2dlckV2YWx1YXRpb24ocG9pbnRzKSB7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBpbmRleE9mID0ge307XHJcbiAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG4gICAgICBjb25zdCBkYXRhU2V0ID0ge1xyXG4gICAgICAgIGxpbmtzOltdLFxyXG4gICAgICAgIG5vZGVzOiBbXVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgcG9pbnRzLm1hcCggKG5vZGUsaW5kZXgpID0+IGluZGV4T2Zbbm9kZS5pZF0gPSBpbmRleCk7XHJcbiAgICAgIHBvaW50cy5tYXAoIChub2RlLCBpKSA9PiB7XHJcbiAgICAgICAgZGF0YVNldC5ub2Rlcy5wdXNoKHtcclxuICAgICAgICAgIHNpemU6IG5vZGUuc2l6ZSA/IG5vZGUuc2l6ZTogMTAsIFxyXG4gICAgICAgICAgZ3JvdXA6IG5vZGUuZ3JvdXA/IG5vZGUuZ3JvdXAgOiAwLCBcclxuICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSAmJiBub2RlLnR5cGUubGVuZ3RoID8gbm9kZS50eXBlIDogXCJjaXJjbGVcIixcclxuICAgICAgICAgIG5hbWU6IG5vZGUubmFtZSxcclxuICAgICAgICAgIGltYWdlOiBub2RlLmltYWdlLFxyXG4gICAgICAgICAgZGF0YTogbm9kZS5kYXRhID8gbm9kZS5kYXRhIDogW11cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihub2RlLnNvdXJjZXMpIHtcclxuICAgICAgICAgIG5vZGUuc291cmNlcy5tYXAoIChpZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaW5kZXhPZltpZF07XHJcbiAgICAgICAgICAgIGlmIChpdGVtICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGRhdGFTZXQubGlua3MucHVzaCh7c291cmNlOiBpdGVtLCB0YXJnZXQ6IGl9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBlcnJvcnMucHVzaChcIk1pc3Npbmcgc291cmNlIG5vZGUgJ1wiICsgaWQgKyBcIicgZm9yIG5vZGUgJ1wiICsgbm9kZS5pZCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG5vZGUuZGVzdGluYXRpb25zKSB7XHJcbiAgICAgICAgICBub2RlLmRlc3RpbmF0aW9ucy5tYXAoIChpZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaW5kZXhPZltpZF07XHJcbiAgICAgICAgICAgIGlmIChpdGVtICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGRhdGFTZXQubGlua3MucHVzaCh7c291cmNlOiBpLCB0YXJnZXQ6IGl0ZW19KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBlcnJvcnMucHVzaChcIk1pc3NpbmcgZGVzdGluYXRpb24gbm9kZSAnXCIgKyBpZCArIFwiJyBmb3Igbm9kZSAnXCIgKyBub2RlLmlkICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdkYW5nZXInPlwiK2Vycm9ycy5qb2luKFwiPGJyLz5cIikrXCI8L2Rpdj5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIFxyXG4gICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgICBvZmZzZXQ6IHt4OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCwgeTogdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcH0sIFxyXG4gICAgICAgICAgZGF0YTogZGF0YVNldCxcclxuICAgICAgICAgIG1hcHBpbmc6IHRoaXMudHlwZU1hcHBpbmcsIFxyXG4gICAgICAgICAgc2hvd1R5cGVPbkhvdmVyOiB0aGlzLnNob3dUeXBlT25Ib3ZlciwgXHJcbiAgICAgICAgICBzaG93RGlyZWN0aW9uczogdGhpcy5zaG93RGlyZWN0aW9ucyxcclxuICAgICAgICAgIGVuYWJsZVRvb2x0aXA6IHRoaXMuZW5hYmxlVG9vbHRpcCxcclxuICAgICAgICAgIHNob3dDdXJ2ZWRDb25uZWN0aW9uczogdGhpcy5zaG93Q3VydmVkQ29ubmVjdGlvbnMsXHJcbiAgICAgICAgICBvdXRsaW5lTm9kZXM6IHRoaXMub3V0bGluZU5vZGVzLFxyXG4gICAgICAgICAgY2hhcmdlOiAtMSAqIHRoaXMucmVwZWFsRm9yY2UsXHJcbiAgICAgICAgICBmaXhlZERpc3RhbmNlOiB0aGlzLmZpeGVkRGlzdGFuY2UsXHJcbiAgICAgICAgICBncmFkaWVudHNFbmFibGVkOiB0aGlzLmdyYWRpZW50c0VuYWJsZWQsXHJcbiAgICAgICAgICB0YXJnZXREaXY6IFwiI2QzLWNvbnRhaW5lclwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB3aW5kb3dbJ2luaXRpYXRlRDMnXShjb25maWcpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdkYW5nZXInPk1pc3NpbmcgZGF0YS48L2Rpdj5cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG4gICAgaWYgKGNoYW5nZXMuZGF0YSkge1xyXG4gICAgICBzZXRUaW1lb3V0KHRoaXMubmdPbkluaXQuYmluZCh0aGlzKSwgMzMzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYoICEodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IFt0aGlzLmRhdGFdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF3aW5kb3dbJ2luaXRpYXRlRDMnXSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRTY3JpcHQoXCJhc3NldHMvZDMuanNcIiwgJ2QzanMnKS50aGVuKCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbih0aGlzLmRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24odGhpcy5kYXRhKTtcclxuICAgIH1cclxuIFx0fVxyXG4gICBcclxuXHRwcml2YXRlIGxvYWRTY3JpcHQodXJsLCBpZCkgeyAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIFxyXG4gICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgICBzY3JpcHRFbGVtZW50LnNyYyA9IHVybDtcclxuICAgICAgc2NyaXB0RWxlbWVudC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICBcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcclxuXHRcdH0pXHJcbiAgfVxyXG5cclxuICBleHBhbmQoZmxhZykge1xyXG4gICAgY29uc3QgZG9jOiBhbnkgPSBkb2N1bWVudDtcclxuXHJcbiAgICBpZiAoZmxhZykge1xyXG4gICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICBpZihlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImV4cGFuZGVkLWNvbnRhaW5lclwiKTtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIGlmICh3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKSB7XHJcbiAgICAgICAgd2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSgwLCAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYoZG9jLmV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZG9jLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihkb2MubW96Q2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICAgIGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImV4cGFuZGVkLWNvbnRhaW5lclwiKTtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAod2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSkge1xyXG4gICAgICAgIHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0odGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRUb3ApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbmNoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihldmVudC5wb2ludHMpO1xyXG4gIH1cclxufVxyXG4iXX0=