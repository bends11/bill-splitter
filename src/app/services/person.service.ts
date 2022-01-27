import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from './item.service';

export interface Person {
  name: string,
  items: Map<string, Item>,
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private people: Map<string, Person> = new Map<string, Person>();
  private peopleSubject: Subject<Map<string, Person>> = new BehaviorSubject<Map<string, Person>>(this.people);

  constructor() { }

  get people$() {
    return this.peopleSubject.asObservable();
  }
}
