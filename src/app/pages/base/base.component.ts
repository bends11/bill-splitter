import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectItems } from 'src/app/state/items/items.selectors';
import { Item } from 'src/app/state/models/item';
import { Person } from 'src/app/state/models/person';
import { selectPeople } from 'src/app/state/people/people.selectors';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  private loaded: boolean = false;

  protected people: Map<string, Person> = new Map();
  protected items: Map<string, Item> = new Map();

  constructor(protected store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.select(selectPeople).subscribe(
      people => {
        if (!this.loaded) this.people = people;
      }
    )

    this.store.select(selectItems).subscribe(
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
