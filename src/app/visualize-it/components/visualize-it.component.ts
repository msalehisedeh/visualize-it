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
  EventEmitter,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'visualize-it',
  templateUrl: './visualize-it.component.html',
  styleUrls: ['./visualize-it.component.scss'],
})
export class VisualizeItComponent implements OnInit, AfterViewInit, OnChanges  {

  showLegend = false;
  showHelp = false;
  expanded = false;
  
  @Input("enableTooltip")
  enableTooltip: boolean;

  @Input("enableLegends")
  enableLegends: boolean;

  @Input("showTypeOnHover")
  showTypeOnHover: boolean;

  @Input("showDirections")
  showDirections: boolean;

  @Input("data")
  data: any;

  @Input("typeMapping")
  typeMapping = {};

  @Input("width")
  width: string;

  @Input("height")
  height: string;

  @Output("onVisualization")
  onVisualization = new EventEmitter();

  @ViewChild("d3Container")
  d3Container;

  constructor(private el: ElementRef){
    document.addEventListener("webkitfullscreenchange", (event) => {
      if(!window.screenTop && !window.screenY) {
        this.expand(false);
      }
    });
    document.addEventListener("mozfullscreenchange", (event) => {
      const win: any = window;
      const isFullScreen = win.fullScreen ||
                          (win.innerWidth == screen.width && win.innerHeight == screen.height)
      if(!isFullScreen) {
        this.expand(false);
      }
    });
    document.addEventListener("MSFullscreenChange", (event) => {
      const win: any = window;
      const isFullScreen = win.fullScreen ||
                          (win.innerWidth == screen.width && win.innerHeight == screen.height)
      if(!isFullScreen) {
        this.expand(false);
      }
    });
  }

  private triggerEvaluation(points) {
    if (points.length) {
      const indexOf = {};
      const errors = [];
      const dataSet = {
        links:[],
        nodes: []
      };
      this.d3Container.nativeElement.innerHTML = "";
      points.map( (node,index) => indexOf[node.id] = index);
      points.map( (node, i) => {
        dataSet.nodes.push({
          size: node.size ? node.size: 10, 
          group: node.group? node.group : 0, 
          type: node.type && node.type.length ? node.type : "circle",
          name: node.name,
          data: node.data ? node.data : []
        });
        if(node.sources) {
          node.sources.map( (id) => {
            const item = indexOf[id];
            if (item != undefined) {
              dataSet.links.push({source: item, target: i});
            } else {
              errors.push("Missing source node '" + id + "' for node '" + node.id + "'.");
            }
          })
        }
        if(node.destinations) {
          node.destinations.map( (id) => {
            const item = indexOf[id];
            if (item != undefined) {
              dataSet.links.push({source: i, target: item});
            } else {
              errors.push("Missing destination node '" + id + "' for node '" + node.id + "'.");
            }
          })
        }
      });

      if (errors.length) {
        this.d3Container.nativeElement.innerHTML = "<div class='danger'>"+errors.join("<br/>")+"</div>";
      } else {
        const offset = {x: this.el.nativeElement.offsetLeft, y: this.el.nativeElement.offsetTop};
        window['initiateD3'](
          window.innerWidth, 
          window.innerHeight,
          offset, 
          dataSet,
          this.typeMapping, 
          this.showTypeOnHover, 
          this.showDirections,
          this.enableTooltip,
          "#d3-container");
      }
    } else {
      this.d3Container.nativeElement.innerHTML = "<div class='danger'>Missing data.</div>";
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
    } else {
      this.triggerEvaluation(this.data);
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

  expand(flag) {
    const doc: any = document;

    if (flag) {
      const element: any = doc.documentElement;
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      this.el.nativeElement.classList.add("expanded-container");
      this.expanded = true;
    } else {
      if(doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if(doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if(doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
      this.el.nativeElement.classList.remove("expanded-container");
      this.expanded = false;
    }
  }

  onchange(event) {
    this.triggerEvaluation(event.points);
  }
}
