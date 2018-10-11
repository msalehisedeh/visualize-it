import { OnInit, OnChanges, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
export declare class VisualizeItComponent implements OnInit, AfterViewInit, OnChanges {
    private el;
    showLegend: boolean;
    showHelp: boolean;
    expanded: boolean;
    showCurvedConnections: string;
    enableTooltip: boolean;
    repealForce: number;
    fixedDistance: number;
    outlineNodes: boolean;
    enableLegends: boolean;
    showTypeOnHover: boolean;
    showDirections: boolean;
    data: any;
    typeMapping: {};
    width: string;
    height: string;
    onVisualization: EventEmitter<{}>;
    d3Container: any;
    constructor(el: ElementRef);
    private triggerEvaluation(points);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): Promise<void>;
    private loadScript(url, id);
    expand(flag: any): void;
    onchange(event: any): void;
}
