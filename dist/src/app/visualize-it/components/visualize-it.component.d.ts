import { OnInit, OnChanges, AfterViewInit, EventEmitter } from '@angular/core';
export declare class VisualizeItComponent implements OnInit, AfterViewInit, OnChanges {
    showLegend: boolean;
    showHelp: boolean;
    enableTooltip: boolean;
    enableLegends: boolean;
    showTypeOnHover: boolean;
    showDirections: boolean;
    data: any;
    typeMapping: {};
    width: string;
    height: string;
    onVisualization: EventEmitter<{}>;
    d3Container: any;
    private triggerEvaluation(points);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): Promise<void>;
    private loadScript(url, id);
    onchange(event: any): void;
}
