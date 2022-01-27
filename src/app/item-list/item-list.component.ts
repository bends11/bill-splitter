import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../services/item.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends BaseComponent implements OnInit {

  constructor(personService: PersonService, itemService: ItemService) {
    super(personService, itemService)
  }

  get itemList(): Item[] {
    return Array.from(this.items.values());
  }

  remove(item: string): void {
    this.items.delete(item);
  }
}
