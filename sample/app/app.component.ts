import { Component } from '@angular/core';

import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'visualize-it';

  selectionEntry = ["users"];
  selectedEntry = "users";
  selectionContents: any = {};
  error!: any;
  
  myDataSet: any = {};
  resultingTree: any;

  fixedDistance = 60;
  repealForce= 300;

  outlineNodes = false;
  shouldVisualizeIt=true;
  gradientsEnabled=true;
  showCurvedConnections = "true";
  displayEntry = false;
  pointsOfEntry!: any;
  pointOfEntry!: any;
  sampleJson = "";

  constructor(private service: AppService) {
    this.service.usersList().subscribe( (results: any) => {
      this.myDataSet = results;
    })
  }

  distance(event: any) {
    const code = event.which;

    this.fixedDistance = event.target.value;
    if (code === 13) {
      this.shouldVisualizeIt = false;
      setTimeout(()=>this.shouldVisualizeIt=true, 6)
    }
  }
  repeal(event: any) {
    const code = event.which;

    this.repealForce = event.target.value;
    if (code === 13) {
      this.shouldVisualizeIt = false;
      setTimeout(()=>this.shouldVisualizeIt=true, 6)
    }
  }
  curveIt(event: any) {
    this.shouldVisualizeIt = false;
    this.showCurvedConnections = event.target.checked ? "true":"false";
    setTimeout(()=>this.shouldVisualizeIt=true, 6)
  }
  gradients(event: any) {
    this.shouldVisualizeIt = false;
    this.gradientsEnabled = event.target.checked;
    setTimeout(()=>this.shouldVisualizeIt=true, 6)
  }
  outline(event: any){
    this.shouldVisualizeIt = false;
    this.outlineNodes = event.target.checked;
    setTimeout(()=>this.shouldVisualizeIt=true, 6)
  }

  valueOf(event: any) {
    return event.target.value;
  }
  addDataEntry(entryName: string , entryJson: string) {
    if (entryName.length && entryJson.length) {
      try {
        const entry = JSON.parse(entryJson);
        this.selectionEntry.push(entryName);
        this.selectionContents[entryName] = (this.pointsOfEntry && this.pointOfEntry) ? entry[this.pointOfEntry]: entry;
        this.displayEntry = false;
        this.selectedEntry = entryName;
        this.myDataSet = this.selectionContents[entryName];
      } catch(e: any) {
        this.error = "We are unable to validate JSON data. Please clear text and try again!";
      }
    } else {
      this.error = "Please enter JSON data and a name for it to be in the dropdown!";
    }
  }

  private findEntryLists(json: any, path: string, pathList: any[]) {
    if ( !(typeof json === "string") && (typeof json === "object") && !(json instanceof Array) ) {      
      Object.keys(json).map( (item) => {
        const x = path.length ? path+"."+item : item;
        if (json[item] instanceof Array) {
          pathList.push(x);
        } else {
          this.findEntryLists(json[item], x, pathList);
        }
      });
    }
    return pathList;
  }
  
  onPaste(e: any) {
    this.sampleJson = e.clipboardData.getData('text/plain');
    this.error = undefined;
    this.pointsOfEntry = undefined;
    this.pointOfEntry = undefined;
    try {
      const json = JSON.parse(this.sampleJson);
      if ( !(json instanceof Array) ) {
        this.pointsOfEntry = this.findEntryLists(json, "", []);
      } else if (json.length < 2) {
        this.error = "Dropped in data do not have enough records in order to gain insight. Please reconsider using it."
      }
    } catch(e) {
      this.error = "We are unable to parse dropped in data into a json. Please review your content and try again."
    }
    // Do stuff 
  
    // Then clear pasted content from the input
  }

  visualizeDataSet(event: any) {
    const data = event.target.value;

    this.myDataSet = undefined;
    this.resultingTree = undefined;
    
    if (data === "users") {
      this.service.usersList().subscribe( (results: any) => {
        this.myDataSet = results;
      })
    } else {
        this.myDataSet = this.selectionContents[data];
    }
  }

}
