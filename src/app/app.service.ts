import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class AppService {
  constructor() { }

  private names = [
    {"id":"0", "size": 60, "group": 0, "name": "Androsynth", relatesTo:["1","2","3","4","5","6","7"]},
    {"id":"1", "size": 10, "group": 2, "name": "Chenjesu", relatesTo:["3","4","5","6","8"]},
    {"id":"2", "size": 60, "group": 4, "name": "Ilwrath", relatesTo:["4","5","6","9"]},
    {"id":"3", "size": 10, "group": 6, "name": "Mycon", relatesTo:["5","6","10"]},
    {"id":"4", "size": 60, "group": 8, "name": "Spathi", relatesTo:["11"]},
    {"id":"5", "size": 10, "group": 1, "name": "Umgah", relatesTo:[,"6","12"]},
    {"id":"6", "size": 10, "group": 1, "name": "VUX", relatesTo:["13"]},
    {"id":"7", "size": 60, "group": 0, "name": "Guardian"},
    {"id":"8", "size": 10, "group": 2, "name": "Broodhmome"},
    {"id":"9", "size": 60, "group": 4, "name": "Avenger"},
    {"id":"10", "size": 10, "group": 6, "name": "Podship"},
    {"id":"11", "size": 60, "group": 8, "name": "Eluder"},
    {"id":"12", "size": 10, "group": 1, "name": "Drone"},
    {"id":"13", "size": 10, "group": 1, "name": "Intruder"}
  ];

  usersList() {
      return Observable.of(this.names);
  }
}
