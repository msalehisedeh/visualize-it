import { __awaiter } from 'tslib';
import { Component, Input, Output, ViewChild, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class visualizeItComponent {
    constructor() {
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
                    name: node.name
                });
                if (node.relatesTo) {
                    node.relatesTo.map((id) => {
                        dataSet.links.push({ source: i, target: indexOf[id] });
                    });
                }
            });
            window['initiateD3'](window.innerWidth, window.innerHeight, dataSet, "#d3-container");
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
visualizeItComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualize-it',
                template: `
<div class="d3-container"
    [style.width]="width"
    [style.height]="height"
    id="d3-container" #d3Container></div>
`,
                styles: [`:host #d3-container{
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
visualizeItComponent.ctorParameters = () => [];
visualizeItComponent.propDecorators = {
    "data": [{ type: Input, args: ["data",] },],
    "width": [{ type: Input, args: ["width",] },],
    "height": [{ type: Input, args: ["height",] },],
    "onVisualization": [{ type: Output, args: ["onVisualization",] },],
    "d3Container": [{ type: ViewChild, args: ["d3Container",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class visualizeItModule {
}
visualizeItModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    visualizeItComponent
                ],
                exports: [
                    visualizeItComponent
                ],
                entryComponents: [
                    visualizeItComponent
                ],
                providers: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
visualizeItModule.ctorParameters = () => [];

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

export { visualizeItComponent, visualizeItModule };
//# sourceMappingURL=visualize-it.js.map
