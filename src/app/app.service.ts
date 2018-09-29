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
      {"id":"0", "size": 60, "group": 0, "name": "Andria", type:"circle", sources:["1","2","3","4","5","6"]},
      {"id":"1", "size": 10, "group": 2, "name": "Joshephine", type:"circle", sources:["3","4","5","6"]},
      {"id":"2", "size": 60, "group": 4, "name": "Alfred", type:"diamond", sources:["4","5","6"]},
      {"id":"3", "size": 10, "group": 6, "name": "Maya", type:"diamond", sources:["5","6"]},
      {"id":"4", "size": 60, "group": 8, "name": "Ali", type:"square", sources:["11"]},
      {"id":"5", "size": 10, "group": 1, "name": "Praya", type:"square", sources:["6","12"]},
      {"id":"6", "size": 10, "group": 1, "name": "Ehsan", type:"square", sources:["13"]},
      {"id":"7", "size": 60, "group": 0, "name": "Jane", type:"triangle-up", destinations:["0"]},
      {"id":"8", "size": 10, "group": 2, "name": "Brad", type:"triangle-down", destinations:["1"]},
      {"id":"9", "size": 60, "group": 4, "name": "Amarnath", type:"cross", destinations:["2"]},
      {"id":"10", "size": 10, "group": 6, "name": "Mike", type:"cross", destinations:["3"]},
      {"id":"11", "size": 60, "group": 8, "name": "Erick", type:"circle" },
      {"id":"12", "size": 10, "group": 1, "name": "Gyline", type:"circle"},
      {"id":"13", "size": 10, "group": 1, "name": "Hakim", type:"circle"}
    ]
  }

  usersList() {
      return Observable.of(this.data);
  }
}
