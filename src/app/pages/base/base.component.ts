import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, ItemService } from '../../services/item.service';
import { PersonService, Person } from '../../services/person.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  private loaded: boolean = false;

  protected people: Map<string, Person> = new Map();
  protected items: Map<string, Item> = new Map();

  constructor(private personService: PersonService, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.personService.people$.subscribe(
      people => {
        if (!this.loaded) this.people = people;
      }
    )

    this.itemService.items$.subscribe(
      items => {
        if (!this.loaded) this.items = items;
      }
    )

    this.loaded = true;
  }

  getRouteParam(param: string): string {
    return this.route.snapshot.paramMap.get(param) || '';
  }

  disambiguateName(name: string): string {
    let newName = name;
    let number = 0;
    while (this.items.has(newName)) {
      number++;
      newName = `${name} (${number})`;
    }

    return newName;
  }

}
