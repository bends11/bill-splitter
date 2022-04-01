import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Person {
  name: string,
  purchases: Map<string, Purchase>,
}

export interface Purchase {
  name: string,
  price: number,
  quantity: number,
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
