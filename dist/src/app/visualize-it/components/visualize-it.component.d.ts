import { OnInit, OnChanges, AfterViewInit, EventEmitter } from '@angular/core';
export declare class visualizeItComponent implements OnInit, AfterViewInit, OnChanges {
    data: any;
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
