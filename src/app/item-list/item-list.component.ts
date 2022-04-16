import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../services/item.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends BaseComponent implements OnInit {

  constructor(personService: PersonService, itemService: ItemService, route: ActivatedRoute) {
    super(personService, itemService, route)
  }

  get itemList(): Item[] {
    return Array.from(this.items.values());
  }

  remove(item: Item): void {
    this.items.delete(item.name);
    item.people.forEach(person => {
      this.people.get(person)?.purchases.delete(item.name);
    });
  }
}
