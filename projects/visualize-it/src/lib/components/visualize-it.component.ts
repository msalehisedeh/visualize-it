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
  EventEmitter,
  Renderer2,
  RendererFactory2,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'visualize-it',
  templateUrl: './visualize-it.component.html',
  styleUrls: ['./visualize-it.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizeItComponent implements OnInit, AfterViewInit, OnChanges  {

  showLegend = false;
  showHelp = false;
  expanded = false;

  private renderer: Renderer2;
  
  @Input("showCurvedConnections")
  showCurvedConnections!: string;
  
  @Input("visualizerId")
  visualizerId = 'd3-container';
  
  @Input("enableTooltip")
  enableTooltip!: boolean;

  @Input("gradientsEnabled")
  gradientsEnabled = true;

  @Input("repealForce")
  repealForce = 300;
  
  @Input("fixedDistance")
  fixedDistance = 60;
  
  @Input("outlineNodes")
  outlineNodes!: boolean;

  @Input("enableLegends")
  enableLegends!: boolean;

  @Input("showTypeOnHover")
  showTypeOnHover!: boolean;

  @Input("showDirections")
  showDirections!: boolean;

  @Input("data")
  data: any;

  @Input("typeMapping")
  typeMapping: any = {};

  @Input("width")
  width!: string;

  @Input("height")
  height!: string;

  @Output("onVisualization")
  onVisualization = new EventEmitter();

  constructor(private factory: RendererFactory2) {
    this.renderer = this.factory.createRenderer(null, null);
    if (navigator.platform.toUpperCase().indexOf('MAC')<0) {
      document.addEventListener("webkitfullscreenchange", (event: Event) => {
        if(!window.screenTop && !window.screenY) {
          this.expand(false);
        }
      });
      document.addEventListener("mozfullscreenchange", (event: Event) => {
        const win: any = window;
        const isFullScreen = win.fullScreen ||
                            (win.innerWidth == screen.width && win.innerHeight == screen.height)
        if(!isFullScreen) {
          this.expand(false);
        }
      });
      document.addEventListener("MSFullscreenChange", (event: Event) => {
        const win: any = window;
        const isFullScreen = win.fullScreen ||
                            (win.innerWidth == screen.width && win.innerHeight == screen.height)
        if(!isFullScreen) {
          this.expand(false);
        }
      });
    }
  }

  private triggerEvaluation(points: any) {
    if (points.length) {
      const indexOf: any = {};
      const errors: any = [];
      const dataSet: any = {
        links:[],
        nodes: []
      };
      this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "";
      points.map( (node: any,index: number) => indexOf[node.id] = index);
      points.map( (node: any, i: number) => {
        dataSet.nodes.push({
          size: node.size ? node.size: 10, 
          group: node.group? node.group : 0, 
          type: node.type && node.type.length ? node.type : "circle",
          name: node.name,
          image: node.image,
          data: node.data ? node.data : []
        });
        if(node.sources) {
          node.sources.map( (id: string) => {
            const item = indexOf[id];
            if (item != undefined) {
              dataSet.links.push({source: item, target: i});
            } else {
              errors.push("Missing source node '" + id + "' for node '" + node.id + "'.");
            }
          })
        }
        if(node.destinations) {
          node.destinations.map( (id: any) => {
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
        this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "<div class='danger'>"+errors.join("<br/>")+"</div>";
      } else {
        const el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
        const win: any = window;
        const config = {
          width: window.innerWidth, 
          height: window.innerHeight,
          offset: {x: el.offsetLeft, y: el.offsetTop}, 
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
          targetDiv: "#" + this.visualizerId
        };
        win['initiateD3'](config);
      }
    } else {
      this.renderer.selectRootElement('#' + this.visualizerId).innerHTML = "<div class='danger'>Missing data.</div>";
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
    const win: any = window;
    if (!win['initiateD3']) {
      await this.loadScript("assets/d3.js", 'd3js').then( () => {
        this.triggerEvaluation(this.data);
      });
    } else {
      this.triggerEvaluation(this.data);
    }
 	}
   
	private loadScript(url: string, id: string) {    
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
    
      scriptElement.type = "text/javascript";
      scriptElement.src = url;
      scriptElement.onload = resolve;
      
      document.body.appendChild(scriptElement);
		})
  }

  expand(flag: boolean) {
    const win: any = window;
    const doc: any = document;

    if (flag) {
      const el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
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
      el.classList.add("expanded-container");
      this.expanded = true;
      if (win["centerVisibility"]) {
        win["centerVisibility"](0, 0);
      }
    } else {
      if(doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if(doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if(doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
      const el = this.renderer.selectRootElement('#' + this.visualizerId).parentNode;
      el.classList.remove("expanded-container");
      this.expanded = false;
      if (win["centerVisibility"]) {
        win["centerVisibility"](el.offsetLeft, el.offsetTop);
      }
    }
  }

  onchange(event: any) {
    this.triggerEvaluation(event.points);
  }
}
