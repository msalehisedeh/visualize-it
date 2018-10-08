import { __awaiter } from 'tslib';
import { Component, Input, Output, ViewChild, EventEmitter, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VisualizeItComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.showLegend = false;
        this.showHelp = false;
        this.expanded = false;
        this.typeMapping = {};
        this.onVisualization = new EventEmitter();
        document.addEventListener("webkitfullscreenchange", (event) => {
            if (!window.screenTop && !window.screenY) {
                this.expand(false);
            }
        });
        document.addEventListener("mozfullscreenchange", (event) => {
            const /** @type {?} */ win = window;
            const /** @type {?} */ isFullScreen = win.fullScreen ||
                (win.innerWidth == screen.width && win.innerHeight == screen.height);
            if (!isFullScreen) {
                this.expand(false);
            }
        });
        document.addEventListener("MSFullscreenChange", (event) => {
            const /** @type {?} */ win = window;
            const /** @type {?} */ isFullScreen = win.fullScreen ||
                (win.innerWidth == screen.width && win.innerHeight == screen.height);
            if (!isFullScreen) {
                this.expand(false);
            }
        });
    }
    /**
     * @param {?} points
     * @return {?}
     */
    triggerEvaluation(points) {
        if (points.length) {
            const /** @type {?} */ indexOf = {};
            const /** @type {?} */ errors = [];
            const /** @type {?} */ dataSet = {
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
                    data: node.data ? node.data : []
                });
                if (node.sources) {
                    node.sources.map((id) => {
                        const /** @type {?} */ item = indexOf[id];
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
                        const /** @type {?} */ item = indexOf[id];
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
                const /** @type {?} */ offset = { x: this.el.nativeElement.offsetLeft, y: this.el.nativeElement.offsetTop };
                window['initiateD3'](window.innerWidth, window.innerHeight, offset, dataSet, this.typeMapping, this.showTypeOnHover, this.showDirections, this.enableTooltip, "#d3-container");
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
            const /** @type {?} */ scriptElement = document.createElement('script');
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
        const /** @type {?} */ doc = document;
        if (flag) {
            const /** @type {?} */ element = doc.documentElement;
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
                template: `
<div class="legends" *ngIf="enableLegends">
    <a tabindex="0" (click)="showLegend = !showLegend;showHelp = false" title="show Legend"><span class="legend">&#9826;</span></a>
    <a *ngIf="!expanded" tabindex="0" (click)="expand(true)" title="show in full screen"><span class="expand">&#9859;</span></a>
    <a *ngIf="expanded" tabindex="0" (click)="expand(false)" title="show in normal screen"><span class="expand">&#9860;</span></a>
    <a tabindex="0" (click)="showLegend = false;showHelp = !showHelp" title="show help"><span class="help">?</span></a>
    <fieldset class="info" *ngIf="showLegend">
        <legend>Definitions</legend>
        <b>Link types:</b><br/>
        <strong>Dotted line:</strong> Destination of a Node<br/>
        <strong>Line:</strong> Source of a Node<br/>
        <span *ngIf="showDirections"><strong>Line Arrow:</strong> Pointing toward the destination.<br/></span>
        <br/><b>Node types:</b><br/>
        <span *ngIf="typeMapping['circle']"><strong>Circle</strong> - {{typeMapping['circle']}}<br/></span>
        <span *ngIf="typeMapping['cross']"><strong>Cross</strong> - {{typeMapping['cross']}}<br/></span>
        <span *ngIf="typeMapping['diamond']"><strong>Diamond</strong> - {{typeMapping['diamond']}}<br/></span>
        <span *ngIf="typeMapping['square']"><strong>Square</strong> - {{typeMapping['square']}}<br/></span>
        <span *ngIf="typeMapping['triangle-down']"><strong>Triangle-down</strong> - {{typeMapping['triangle-down']}}<br/></span>
        <span *ngIf="typeMapping['triangle-up']"><strong>Triangle-up</strong> - {{typeMapping['triangle-up']}}<br/></span>
    </fieldset>
    <fieldset class="info" *ngIf="showHelp">
        <legend>Tips</legend>
        <b>Hover on a node to highlight 1st-order neighbourhood.</b><br/>
        <b>Hold mouse down on a node to fade surroundings.</b><br/>
        <b>Double-click to center node and zoom in.</b><br/>
        <b>Hold SHIFT and Double-click to zoom out.</b><br/><br/>
        <b>Filter nodes by:</b><br/>
        <strong>"." :</strong> Stop/resume animation<br/>
        <strong>"!" :</strong> Show/hide node category on hover<br/>
        <strong>"#" :</strong> Show/hide link arrow direction<br/>
        <strong>"@" :</strong> Show/hide node names or node category<br/>
        <strong>"T" :</strong> Enable/disable displaying of Tooltip<br/>
        <strong>"Z" :</strong> Do/Don't Normalize node sizes on zoom<br/>
        <span *ngIf="typeMapping['circle']"><strong>"C" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['cross']"><strong>"X" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['diamond']"><strong>"R" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['square']"><strong>"S" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['triangle-down']"><strong>"D" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['triangle-up']"><strong>"U" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>
        <strong>"L" :</strong> Show/hide all low range group (%33) nodes<br/>
        <strong>"M" :</strong> Show/hide all medium range group (%50) nodes<br/>
        <strong>"H" :</strong> Show/hide all high range group (%66) nodes<br/>
        <strong>"1" :</strong> Show/hide all low range group (%33) links<br/>
        <strong>"2" :</strong> Show/hide all medium range group (%50) links<br/>
        <strong>"3" :</strong> Show/hide all high range group (%66) links
    </fieldset>
</div>
<div class="d3-container"
    tabindex="0"
    [style.width]="width"
    [style.height]="height"
    id="d3-container" #d3Container></div>
`,
                styles: [`:host{
  position:relative;
  display:block; }
  :host.expanded-container{
    position:inherit !important; }
    :host.expanded-container .d3-container{
      position:absolute;
      top:0;
      left:0;
      width:100vw !important;
      height:100vh !important;
      border:0 !important;
      margin:0 !important;
      z-index:3; }
  :host .legends{
    position:absolute;
    right:12px;
    top:5px;
    z-index:4; }
    :host .legends a{
      cursor:pointer;
      font-weight:bold;
      font-size:1.2rem; }
      :host .legends a span{
        background-color:#eee;
        padding:0 3px;
        width:13px;
        float:left;
        height:25px;
        line-height:25px;
        border:1px solid #3a3939; }
      :host .legends a .expand{
        text-align:center;
        border-left:0;
        border-right:0; }
      :host .legends a .legend{
        border-radius:5px 0 0 5px;
        border-right:0; }
      :host .legends a .help{
        border-radius:0 5px 5px 0;
        border-left:0; }
      :host .legends a:hover{
        color:#fff; }
        :host .legends a:hover span{
          background-color:#b65200; }
    :host .legends .info{
      padding:5px;
      border:1px solid #888;
      border-radius:5px;
      position:absolute;
      right:0px;
      font-size:0.7rem;
      line-height:1rem;
      -webkit-box-shadow:1px 1px 3px #bbb;
              box-shadow:1px 1px 3px #bbb;
      background-color:#fff;
      width:350px;
      top:15px; }
      :host .legends .info legend{
        color:#af8d03;
        font-size:1rem;
        font-weight:bold; }
      :host .legends .info strong{
        color:#8f0000;
        font-size:0.8rem;
        margin-left:20px; }
  :host #d3-container{
    border:1px solid #633;
    -webkit-box-sizing:border-box;
            box-sizing:border-box;
    border-radius:5px;
    background-color:#fefefe;
    margin:5px;
    overflow:hidden; }
    :host #d3-container ::ng-deep .danger{
      background-color:#a80505;
      color:#fff;
      padding:10px;
      display:table;
      width:100%; }
  :host ::ng-deep path.link{
    fill:none;
    stroke:#666;
    stroke-width:1.5px; }
  :host ::ng-deep circle{
    fill:#ccc;
    stroke:#fff;
    stroke-width:1.5px; }
  :host ::ng-deep text{
    fill:#000;
    font:10px sans-serif;
    pointer-events:none; }
  :host ::ng-deep div.tooltip{
    position:absolute;
    padding:5px;
    font:12px sans-serif;
    background:#cfcfcf;
    border:1px solid #3a3939;
    border-radius:4px;
    pointer-events:none;
    z-index:5; }
`],
            },] },
];
/** @nocollapse */
VisualizeItComponent.ctorParameters = () => [
    { type: ElementRef, },
];
VisualizeItComponent.propDecorators = {
    "enableTooltip": [{ type: Input, args: ["enableTooltip",] },],
    "enableLegends": [{ type: Input, args: ["enableLegends",] },],
    "showTypeOnHover": [{ type: Input, args: ["showTypeOnHover",] },],
    "showDirections": [{ type: Input, args: ["showDirections",] },],
    "data": [{ type: Input, args: ["data",] },],
    "typeMapping": [{ type: Input, args: ["typeMapping",] },],
    "width": [{ type: Input, args: ["width",] },],
    "height": [{ type: Input, args: ["height",] },],
    "onVisualization": [{ type: Output, args: ["onVisualization",] },],
    "d3Container": [{ type: ViewChild, args: ["d3Container",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
VisualizeItModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { VisualizeItComponent, VisualizeItModule };
//# sourceMappingURL=visualize-it.js.map
