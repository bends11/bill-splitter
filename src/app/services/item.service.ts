import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Item {
  name: string,
  price: number,
  quantity?: number,
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: Map<string, Item> = new Map<string, Item>();
  private itemSubject: Subject<Map<string, Item>> = new BehaviorSubject<Map<string, Item>>(this.items);

  constructor() { }

  get items$() {
    return this.itemSubject.asObservable();
  }
}
