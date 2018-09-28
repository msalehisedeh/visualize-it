import * as tslib_1 from "tslib";
import { __awaiter } from 'tslib';
import { Component, Input, Output, ViewChild, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var visualizeItComponent = (function () {
    function visualizeItComponent() {
        this.onVisualization = new EventEmitter();
    }
    /**
     * @param {?} points
     * @return {?}
     */
    visualizeItComponent.prototype.triggerEvaluation = function (points) {
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
                    name: node.name
                });
                if (node.relatesTo) {
                    node.relatesTo.map(function (id) {
                        dataSet_1.links.push({ source: i, target: indexOf_1[id] });
                    });
                }
            });
            window['initiateD3'](window.innerWidth, window.innerHeight, dataSet_1, "#d3-container");
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    visualizeItComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data) {
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    };
    /**
     * @return {?}
     */
    visualizeItComponent.prototype.ngOnInit = function () {
        if (!(this.data instanceof Array)) {
            this.data = [this.data];
        }
    };
    /**
     * @return {?}
     */
    visualizeItComponent.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
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
    visualizeItComponent.prototype.loadScript = function (url, id) {
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
    visualizeItComponent.prototype.onchange = function (event) {
        this.triggerEvaluation(event.points);
    };
    return visualizeItComponent;
}());
visualizeItComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualize-it',
                template: "\n<div class=\"d3-container\"\n    [style.width]=\"width\"\n    [style.height]=\"height\"\n    id=\"d3-container\" #d3Container></div>\n",
                styles: [":host #d3-container{\n  border:1px solid #633;\n  padding:0 5px;\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box;\n  border-radius:5px;\n  background-color:#fefefe;\n  margin:5px;\n  overflow:hidden; }\n"],
            },] },
];
/** @nocollapse */
visualizeItComponent.ctorParameters = function () { return []; };
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
var visualizeItModule = (function () {
    function visualizeItModule() {
    }
    return visualizeItModule;
}());
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
visualizeItModule.ctorParameters = function () { return []; };
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
