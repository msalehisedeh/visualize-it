import { __awaiter } from 'tslib';
import { Component, Input, Output, ViewChild, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VisualizeItComponent {
    constructor() {
        this.showLegend = false;
        this.showHelp = false;
        this.typeMapping = {};
        this.onVisualization = new EventEmitter();
    }
    /**
     * @param {?} points
     * @return {?}
     */
    triggerEvaluation(points) {
        if (points.length) {
            this.d3Container.nativeElement.innerHTML = "";
            const /** @type {?} */ indexOf = {};
            const /** @type {?} */ dataSet = {
                links: [],
                nodes: []
            };
            points.map((node, index) => indexOf[node.id] = index);
            points.map((node, i) => {
                dataSet.nodes.push({
                    size: node.size ? node.size : 10,
                    group: node.group ? node.group : 0,
                    type: node.type && node.type.length ? node.type : "circle",
                    name: node.name
                });
                if (node.sources) {
                    node.sources.map((id) => {
                        dataSet.links.push({ source: indexOf[id], target: i });
                    });
                }
                if (node.destinations) {
                    node.destinations.map((id) => {
                        dataSet.links.push({ source: i, target: indexOf[id] });
                    });
                }
            });
            window['initiateD3'](window.innerWidth, window.innerHeight, dataSet, this.typeMapping, this.showTypeOnHover, this.showDirections, "#d3-container");
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
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
    <a (click)="showLegend = !showLegend;showHelp = false"><span class="legend">&#9826;</span></a>
    <a (click)="showLegend = false;showHelp = !showHelp"><span class="help">?</span></a>
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
        <strong>"!" :</strong> Show/hide node category on hover<br/>
        <strong>"#" :</strong> Show/hide link arrow direction<br/>
        <strong>"@" :</strong> Show/hide node names or node category<br/>
        <span *ngIf="typeMapping['circle']"><strong>"C" :</strong> Show/hide all circle ( {{typeMapping['circle']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['cross']"><strong>"X" :</strong> Show/hide all cross ( {{typeMapping['cross']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['diamond']"><strong>"R" :</strong> Show/hide all diamond ( {{typeMapping['diamond']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['square']"><strong>"S" :</strong> Show/hide all square ( {{typeMapping['square']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['triangle-down']"><strong>"D" :</strong> Show/hide all triangle-down ( {{ typeMapping['triangle-down']}} ) nodes<br/></span>
        <span *ngIf="typeMapping['triangle-up']"><strong>"T" :</strong> Show/hide all triangle-up ( {{typeMapping['triangle-up']}} ) nodes<br/></span>
        <strong>"L" :</strong> Show/hide all low range group (%33) nodes<br/>
        <strong>"M" :</strong> Show/hide all medium range group (%50) nodes<br/>
        <strong>"H" :</strong> Show/hide all high range group (%66) nodes<br/>
        <strong>"1" :</strong> Show/hide all low range group (%33) links<br/>
        <strong>"2" :</strong> Show/hide all medium range group (%50) links<br/>
        <strong>"3" :</strong> Show/hide all high range group (%66) links
    </fieldset>
</div>
<div class="d3-container"
    [style.width]="width"
    [style.height]="height"
    id="d3-container" #d3Container></div>
`,
                styles: [`:host{
  position:relative;
  display:inline-block; }
  :host path.link{
    fill:none;
    stroke:#666;
    stroke-width:1.5px; }
  :host circle{
    fill:#ccc;
    stroke:#fff;
    stroke-width:1.5px; }
  :host text{
    fill:#000;
    font:10px sans-serif;
    pointer-events:none; }
  :host .legends{
    position:absolute;
    right:20px;
    top:22px;
    z-index:3;
    width:35px;
    font-size:1.2rem;
    background-color:#eee;
    padding:3px 5px;
    border-radius:15px; }
    :host .legends a{
      cursor:pointer;
      font-weight:bold; }
      :host .legends a:hover{
        color:#b65200; }
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
      width:350px; }
      :host .legends .info strong{
        color:#8f0000;
        font-size:0.8rem;
        margin-left:20px; }
  :host #d3-container{
    border:1px solid #633;
    padding:0 5px;
    -webkit-box-sizing:border-box;
            box-sizing:border-box;
    border-radius:5px;
    background-color:#fefefe;
    margin:5px;
    overflow:hidden; }
`],
            },] },
];
/** @nocollapse */
VisualizeItComponent.ctorParameters = () => [];
VisualizeItComponent.propDecorators = {
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
