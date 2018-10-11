import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class AppService {
  constructor() { }

  private data = {
    roles: {
      "circle": "Mentor",
      "diamond": "Student",
      "square": "Player",
      "cross": "Observer",
      "triangle-up": "Referre",
      "triangle-down": "Organizer"
    },
    names: [
      {"id":"0", data: {name: "Andria", age: 22, sex: "female", score: 5657567}, "size": 60, "group": 0, "name": "Andria", type:"circle", sources:["1","2","3","4","5","6"]},
      {"id":"1", data: {name: "Joshephine", age: 32, sex: "female", score: 5756756}, "size": 10, "group": 2, "name": "Joshephine", type:"circle", sources:["3","4","5","6"]},
      {"id":"2", data: {name: "Alfred", age: 54, sex: "male", score: 2343423}, "size": 60, "group": 4, "name": "Alfred", type:"diamond", sources:["4","5","6"]},
      {"id":"3", data: {name: "Maya", age: 43, sex: "female", score: 8675755}, "size": 10, "group": 6, "name": "Maya", type:"diamond", sources:["5","6"]},
      {"id":"4", data: {name: "Ali", age: 33, sex: "male", score: 9678678}, "size": 60, "group": 8, "name": "Ali", type:"square", sources:["11"]},
      {"id":"5", data: {name: "Praya", age: 45, sex: "female", score: 2234323}, "size": 10, "group": 1, "name": "Praya", type:"square", sources:["6","12"]},
      {"id":"6", data: {name: "Ehsan", age: 25, sex: "male", score: 4343334}, "size": 10, "group": 1, "name": "Ehsan", type:"square", sources:["13"]},
      {"id":"7", data: {name: "Jane", age: 50, sex: "female", score: 3645667}, "size": 60, "group": 0, "name": "Jane", type:"triangle-up", destinations:["0"]},
      {"id":"8", data: {name: "Brad", age: 18, sex: "male", score: 6535433}, "size": 10, "group": 2, "name": "Brad", type:"triangle-down", destinations:["1"]},
      {"id":"9", data: {name: "Amarnath", age: 38, sex: "male", score: 9566546}, "size": 60, "group": 4, "name": "Amarnath", type:"cross", destinations:["2"]},
      {"id":"10", data: {name: "Mike", age: 29, sex: "male", score: 9678678}, "size": 10, "group": 6, "name": "Mike", type:"cross", destinations:["3"]},
      {"id":"11", data: {name: "Erick", age: 31, sex: "male", score: 2332323}, "size": 60, "group": 8, "name": "Erick", type:"circle" },
      {"id":"12", data: {name: "Gyline", age: 20, sex: "female", score: 6556544}, "size": 10, "group": 1, "name": "Gyline", type:"circle", image:  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_blackwidow.png"},
      {"id":"13", data: {name: "Hakim", age: 22, sex: "male", score: 3232434}, "size": 10, "group": 1, "name": "Hakim", type:"circle", image:  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_thor.png"}
    ]
  }

  usersList() {
      return Observable.of(this.data);
  }
}
