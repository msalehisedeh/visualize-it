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
      {"id":"0", data: {age: 22, sex: "female", score: 5657567}, "size": 60, "group": 0, "name": "Andria", type:"circle", sources:["1","2","3","4","5","6"]},
      {"id":"1", data: {age: 32, sex: "female", score: 5756756}, "size": 10, "group": 2, "name": "Joshephine", type:"circle", sources:["3","4","5","6"]},
      {"id":"2", data: {age: 54, sex: "male", score: 2343423}, "size": 60, "group": 4, "name": "Alfred", type:"diamond", sources:["4","5","6"]},
      {"id":"3", data: {age: 43, sex: "female", score: 8675755}, "size": 10, "group": 6, "name": "Maya", type:"diamond", sources:["5","6"]},
      {"id":"4", data: {age: 33, sex: "male", score: 9678678}, "size": 60, "group": 8, "name": "Ali", type:"square", sources:["11"]},
      {"id":"5", data: {age: 45, sex: "female", score: 2234323}, "size": 10, "group": 1, "name": "Praya", type:"square", sources:["6","12"]},
      {"id":"6", data: {age: 25, sex: "male", score: 4343334}, "size": 10, "group": 1, "name": "Ehsan", type:"square", sources:["13"]},
      {"id":"7", data: {age: 50, sex: "female", score: 3645667}, "size": 60, "group": 0, "name": "Jane", type:"triangle-up", destinations:["0"]},
      {"id":"8", data: {age: 18, sex: "male", score: 6535433}, "size": 10, "group": 2, "name": "Brad", type:"triangle-down", destinations:["1"]},
      {"id":"9", data: {age: 38, sex: "male", score: 9566546}, "size": 60, "group": 4, "name": "Amarnath", type:"cross", destinations:["2"]},
      {"id":"10", data: {age: 29, sex: "male", score: 9678678}, "size": 10, "group": 6, "name": "Mike", type:"cross", destinations:["3"]},
      {"id":"11", data: {age: 31, sex: "male", score: 2332323}, "size": 60, "group": 8, "name": "Erick", type:"circle" },
      {"id":"12", data: {age: 20, sex: "female", score: 6556544}, "size": 10, "group": 1, "name": "Gyline", type:"circle"},
      {"id":"13", data: {age: 22, sex: "male", score: 3232434}, "size": 10, "group": 1, "name": "Hakim", type:"circle"}
    ]
  }

  usersList() {
      return Observable.of(this.data);
  }
}
