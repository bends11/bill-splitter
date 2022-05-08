import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { ItemService } from '../services/item.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent extends BaseComponent implements OnInit {

  constructor(personService: PersonService, itemService: ItemService, route: ActivatedRoute) {
    super(personService, itemService, route);
  }

  get personNames(): string[] {
    return Array.from(this.people.keys());
  }

  add(person: any): void {
    this.people.set(person.value, { name: person.value, purchases: new Map() });
    person.value = '';
  }

  remove(person: string): void {
    this.people.delete(person);
  }
}
