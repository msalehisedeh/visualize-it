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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXplLWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Zpc3VhbGl6ZS1pdC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlzdWFsaXplLWl0L2NvbXBvbmVudHMvdmlzdWFsaXplLWl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFDTCxTQUFTLEVBSVQsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQU92QixNQUFNOzs7O0lBbURKLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZOzBCQWpEckIsS0FBSzt3QkFDUCxLQUFLO3dCQUNMLEtBQUs7Z0NBU0csSUFBSTsyQkFHVCxHQUFHOzZCQUdELEVBQUU7MkJBa0JKLEVBQUU7K0JBU0UsSUFBSSxZQUFZLEVBQUU7UUFNbEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDNUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3BCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7O2dCQUN6RCxNQUFNLEdBQUcsR0FBUSxNQUFNLENBQUM7O2dCQUN4QixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsVUFBVTtvQkFDZixDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksTUFB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RUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0Y7U0FDRjtLQUNGOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0Qzs7O1lBNU5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsdXVJQUE0Qzs7YUFFN0M7Ozs7WUFQQyxVQUFVOzs7b0NBY1QsS0FBSyxTQUFDLHVCQUF1Qjs0QkFHN0IsS0FBSyxTQUFDLGVBQWU7K0JBR3JCLEtBQUssU0FBQyxrQkFBa0I7MEJBR3hCLEtBQUssU0FBQyxhQUFhOzRCQUduQixLQUFLLFNBQUMsZUFBZTsyQkFHckIsS0FBSyxTQUFDLGNBQWM7NEJBR3BCLEtBQUssU0FBQyxlQUFlOzhCQUdyQixLQUFLLFNBQUMsaUJBQWlCOzZCQUd2QixLQUFLLFNBQUMsZ0JBQWdCO21CQUd0QixLQUFLLFNBQUMsTUFBTTswQkFHWixLQUFLLFNBQUMsYUFBYTtvQkFHbkIsS0FBSyxTQUFDLE9BQU87cUJBR2IsS0FBSyxTQUFDLFFBQVE7OEJBR2QsTUFBTSxTQUFDLGlCQUFpQjswQkFHeEIsU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQgLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXplLWl0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlzdWFsaXplLWl0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemUtaXQuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6ZUl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMgIHtcclxuXHJcbiAgc2hvd0xlZ2VuZCA9IGZhbHNlO1xyXG4gIHNob3dIZWxwID0gZmFsc2U7XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBcclxuICBASW5wdXQoXCJzaG93Q3VydmVkQ29ubmVjdGlvbnNcIilcclxuICBzaG93Q3VydmVkQ29ubmVjdGlvbnM6IHN0cmluZztcclxuICBcclxuICBASW5wdXQoXCJlbmFibGVUb29sdGlwXCIpXHJcbiAgZW5hYmxlVG9vbHRpcDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwiZ3JhZGllbnRzRW5hYmxlZFwiKVxyXG4gIGdyYWRpZW50c0VuYWJsZWQgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoXCJyZXBlYWxGb3JjZVwiKVxyXG4gIHJlcGVhbEZvcmNlID0gMzAwO1xyXG4gIFxyXG4gIEBJbnB1dChcImZpeGVkRGlzdGFuY2VcIilcclxuICBmaXhlZERpc3RhbmNlID0gNjA7XHJcbiAgXHJcbiAgQElucHV0KFwib3V0bGluZU5vZGVzXCIpXHJcbiAgb3V0bGluZU5vZGVzOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVMZWdlbmRzXCIpXHJcbiAgZW5hYmxlTGVnZW5kczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KFwic2hvd1R5cGVPbkhvdmVyXCIpXHJcbiAgc2hvd1R5cGVPbkhvdmVyOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJzaG93RGlyZWN0aW9uc1wiKVxyXG4gIHNob3dEaXJlY3Rpb25zOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJ0eXBlTWFwcGluZ1wiKVxyXG4gIHR5cGVNYXBwaW5nID0ge307XHJcblxyXG4gIEBJbnB1dChcIndpZHRoXCIpXHJcbiAgd2lkdGg6IHN0cmluZztcclxuXHJcbiAgQElucHV0KFwiaGVpZ2h0XCIpXHJcbiAgaGVpZ2h0OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoXCJvblZpc3VhbGl6YXRpb25cIilcclxuICBvblZpc3VhbGl6YXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJkM0NvbnRhaW5lclwiKVxyXG4gIGQzQ29udGFpbmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKXtcclxuICAgIGlmIChuYXZpZ2F0b3IucGxhdGZvcm0udG9VcHBlckNhc2UoKS5pbmRleE9mKCdNQUMnKTwwKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmKCF3aW5kb3cuc2NyZWVuVG9wICYmICF3aW5kb3cuc2NyZWVuWSkge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xyXG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IHdpbi5mdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luLmlubmVyV2lkdGggPT0gc2NyZWVuLndpZHRoICYmIHdpbi5pbm5lckhlaWdodCA9PSBzY3JlZW4uaGVpZ2h0KVxyXG4gICAgICAgIGlmKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xyXG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IHdpbi5mdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luLmlubmVyV2lkdGggPT0gc2NyZWVuLndpZHRoICYmIHdpbi5pbm5lckhlaWdodCA9PSBzY3JlZW4uaGVpZ2h0KVxyXG4gICAgICAgIGlmKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmlnZ2VyRXZhbHVhdGlvbihwb2ludHMpIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4T2YgPSB7fTtcclxuICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcbiAgICAgIGNvbnN0IGRhdGFTZXQgPSB7XHJcbiAgICAgICAgbGlua3M6W10sXHJcbiAgICAgICAgbm9kZXM6IFtdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICBwb2ludHMubWFwKCAobm9kZSxpbmRleCkgPT4gaW5kZXhPZltub2RlLmlkXSA9IGluZGV4KTtcclxuICAgICAgcG9pbnRzLm1hcCggKG5vZGUsIGkpID0+IHtcclxuICAgICAgICBkYXRhU2V0Lm5vZGVzLnB1c2goe1xyXG4gICAgICAgICAgc2l6ZTogbm9kZS5zaXplID8gbm9kZS5zaXplOiAxMCwgXHJcbiAgICAgICAgICBncm91cDogbm9kZS5ncm91cD8gbm9kZS5ncm91cCA6IDAsIFxyXG4gICAgICAgICAgdHlwZTogbm9kZS50eXBlICYmIG5vZGUudHlwZS5sZW5ndGggPyBub2RlLnR5cGUgOiBcImNpcmNsZVwiLFxyXG4gICAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IG5vZGUuaW1hZ2UsXHJcbiAgICAgICAgICBkYXRhOiBub2RlLmRhdGEgPyBub2RlLmRhdGEgOiBbXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKG5vZGUuc291cmNlcykge1xyXG4gICAgICAgICAgbm9kZS5zb3VyY2VzLm1hcCggKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpbmRleE9mW2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGF0YVNldC5saW5rcy5wdXNoKHtzb3VyY2U6IGl0ZW0sIHRhcmdldDogaX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiTWlzc2luZyBzb3VyY2Ugbm9kZSAnXCIgKyBpZCArIFwiJyBmb3Igbm9kZSAnXCIgKyBub2RlLmlkICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobm9kZS5kZXN0aW5hdGlvbnMpIHtcclxuICAgICAgICAgIG5vZGUuZGVzdGluYXRpb25zLm1hcCggKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpbmRleE9mW2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGF0YVNldC5saW5rcy5wdXNoKHtzb3VyY2U6IGksIHRhcmdldDogaXRlbX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiTWlzc2luZyBkZXN0aW5hdGlvbiBub2RlICdcIiArIGlkICsgXCInIGZvciBub2RlICdcIiArIG5vZGUuaWQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2Rhbmdlcic+XCIrZXJyb3JzLmpvaW4oXCI8YnIvPlwiKStcIjwvZGl2PlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgXHJcbiAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgIG9mZnNldDoge3g6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0LCB5OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wfSwgXHJcbiAgICAgICAgICBkYXRhOiBkYXRhU2V0LFxyXG4gICAgICAgICAgbWFwcGluZzogdGhpcy50eXBlTWFwcGluZywgXHJcbiAgICAgICAgICBzaG93VHlwZU9uSG92ZXI6IHRoaXMuc2hvd1R5cGVPbkhvdmVyLCBcclxuICAgICAgICAgIHNob3dEaXJlY3Rpb25zOiB0aGlzLnNob3dEaXJlY3Rpb25zLFxyXG4gICAgICAgICAgZW5hYmxlVG9vbHRpcDogdGhpcy5lbmFibGVUb29sdGlwLFxyXG4gICAgICAgICAgc2hvd0N1cnZlZENvbm5lY3Rpb25zOiB0aGlzLnNob3dDdXJ2ZWRDb25uZWN0aW9ucyxcclxuICAgICAgICAgIG91dGxpbmVOb2RlczogdGhpcy5vdXRsaW5lTm9kZXMsXHJcbiAgICAgICAgICBjaGFyZ2U6IC0xICogdGhpcy5yZXBlYWxGb3JjZSxcclxuICAgICAgICAgIGZpeGVkRGlzdGFuY2U6IHRoaXMuZml4ZWREaXN0YW5jZSxcclxuICAgICAgICAgIGdyYWRpZW50c0VuYWJsZWQ6IHRoaXMuZ3JhZGllbnRzRW5hYmxlZCxcclxuICAgICAgICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKGNvbmZpZyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2Rhbmdlcic+TWlzc2luZyBkYXRhLjwvZGl2PlwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICBpZiAoY2hhbmdlcy5kYXRhKSB7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZ09uSW5pdC5iaW5kKHRoaXMpLCAzMzMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiggISh0aGlzLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgdGhpcy5kYXRhID0gW3RoaXMuZGF0YV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXdpbmRvd1snaW5pdGlhdGVEMyddKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChcImFzc2V0cy9kMy5qc1wiLCAnZDNqcycpLnRoZW4oICgpID0+IHtcclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKHRoaXMuZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbih0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG4gXHR9XHJcbiAgIFxyXG5cdHByaXZhdGUgbG9hZFNjcmlwdCh1cmwsIGlkKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgXHJcbiAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG5cdFx0fSlcclxuICB9XHJcblxyXG4gIGV4cGFuZChmbGFnKSB7XHJcbiAgICBjb25zdCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG5cclxuICAgIGlmIChmbGFnKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgIGlmKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgIH0gZWxzZSBpZihlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICB9IGVsc2UgaWYoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kZWQtY29udGFpbmVyXCIpO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgaWYgKHdpbmRvd1tcImNlbnRlclZpc2liaWxpdHlcIl0pIHtcclxuICAgICAgICB3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKDAsIDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZihkb2MuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgfSBlbHNlIGlmKGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZXhwYW5kZWQtY29udGFpbmVyXCIpO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh3aW5kb3dbXCJjZW50ZXJWaXNpYmlsaXR5XCJdKSB7XHJcbiAgICAgICAgd2luZG93W1wiY2VudGVyVmlzaWJpbGl0eVwiXSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uY2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKGV2ZW50LnBvaW50cyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==