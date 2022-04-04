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

  constructor() {
    // const purchase1 = {
    //   name: 'pizza',
    //   price: 1,
    //   quantity: 1,
    // };
    // const purchase2 = {
    //   name: 'hotdog',
    //   price: 2,
    //   quantity: 1,
    // };
    // const purchase3 = {
    //   name: 'salsa',
    //   price: 3,
    //   quantity: 1,
    // };
    // const purchase4 = {
    //   name: 'ice cream',
    //   price: 4,
    //   quantity: 1,
    // };
    // const benPurchases = new Map();
    // benPurchases.set('1', purchase1);
    // benPurchases.set('3', purchase3);
    // const jacobPurchases = new Map();
    // jacobPurchases.set('2', purchase2);
    // jacobPurchases.set('4', purchase4);
    // this.people.set('Ben', {
    //   name: 'Ben',
    //   purchases: benPurchases,
    // });
    // this.people.set('Jacob', {
    //   name: 'Jacob',
    //   purchases: jacobPurchases,
    // });
    // this.people.set('Heidi', {
    //   name: 'Heidi',
    //   purchases: new Map(),
    // });
    // this.people.set('Nick', {
    //   name: 'Nick',
    //   purchases: new Map(),
    // });
  }

  get people$() {
    return this.peopleSubject.asObservable();
  }
}
