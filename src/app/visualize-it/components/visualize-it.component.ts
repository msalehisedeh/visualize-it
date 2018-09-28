/*
 * tool to display result of a search on set of points of interests on objects.
 */
import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit ,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'visualize-it',
  templateUrl: './visualize-it.component.html',
  styleUrls: ['./visualize-it.component.scss'],
})
export class visualizeItComponent implements OnInit, AfterViewInit, OnChanges  {

  @Input("data")
  data: any;

  @Input("width")
  width: string;

  @Input("height")
  height: string;

  @Output("onVisualization")
  onVisualization = new EventEmitter();

  @ViewChild("d3Container")
  d3Container;

  private triggerEvaluation(points) {
    if (points.length) {
      this.d3Container.nativeElement.innerHTML = "";
      const indexOf = {};
      const dataSet = {
        links:[],
        nodes: []
      };
      points.map( (node,index) => indexOf[node.id] = index);
      points.map( (node, i) => {
        dataSet.nodes.push({
          size: node.size ? node.size: 10, 
          group: node.group? node.group : 0, 
          name: node.name
        });
        if(node.relatesTo) {
          node.relatesTo.map( (id) => {
            dataSet.links.push({source: i, target: indexOf[id]});
          })
        }
      })
      window['initiateD3'](window.innerWidth, window.innerHeight, dataSet, "#d3-container");
    } else {
      this.d3Container.nativeElement.innerHTML = "";
    }
  }

  ngOnChanges(changes: any) {
    if (changes.data) {
      setTimeout(this.ngOnInit.bind(this), 333);
    }
  }

  ngOnInit() {
    if( !(this.data instanceof Array)) {
      this.data = [this.data];
    }
  }

  async ngAfterViewInit() {
    if (!window['initiateD3']) {
      await this.loadScript("assets/d3.js", 'd3js').then( () => {
        this.triggerEvaluation(this.data);
      });
    }
 	}
   
	private loadScript(url, id) {    
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
    
      scriptElement.type = "text/javascript";
      scriptElement.src = url;
      scriptElement.onload = resolve;
      
      document.body.appendChild(scriptElement);
		})
  }
  
  onchange(event) {
    this.triggerEvaluation(event.points);
  }
}
