import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../services/item.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent extends BaseComponent implements OnInit {

  constructor(personService: PersonService, itemService: ItemService) {
    super(personService, itemService)
  }

  get personNames(): string[] {
    return Array.from(this.people.keys()).sort();
  }

  add(name: string, price: string, person: string): void {
    const item: Item = {
      name: name,
      price: parseFloat(price),
      people: [ person ],
    }
    this.items.set(name, item);
    this.people.get(person)?.items.set(name, item);
  }

}
