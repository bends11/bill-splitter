import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Item {
  name: string,
  price: number,
  people: string[],
  quantity: number,
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: Map<string, Item> = new Map<string, Item>();
  private itemSubject: Subject<Map<string, Item>> = new BehaviorSubject<Map<string, Item>>(this.items);

  constructor() {
    this.items.set('pizza', {
      name: 'pizza',
      price: 1,
      people: ['Ben'],
      quantity: 1,
    });

    this.items.set('hotdog', {
      name: 'hotdog',
      price: 2,
      people: ['Jacob'],
      quantity: 1,
    });

    this.items.set('salsa', {
      name: 'salsa',
      price: 3,
      people: ['Ben'],
      quantity: 1,
    });

    this.items.set('ice cream', {
      name: 'ice cream',
      price: 4,
      people: ['Jacob'],
      quantity: 1,
    });
  }

  get items$() {
    return this.itemSubject.asObservable();
  }

  public disambiguateName(name: string): string {
    let newName = name;
    let number = 0;
    while (this.items.has(newName)) {
      number++;
      newName = `${name} (${number})`;
    }

    return newName;
  }
}
