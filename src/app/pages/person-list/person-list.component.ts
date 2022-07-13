import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { ItemService } from '../../services/item.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addPerson, removePerson } from 'src/app/state/people/people.actions';
import { Person } from 'src/app/state/models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent extends BaseComponent implements OnInit {

  person: string = '';

  @ViewChild('input') input!: ElementRef;

  constructor(store: Store<AppState>, route: ActivatedRoute) {
    super(store, route);
  }

  get personNames(): string[] {
    return Array.from(this.people.keys());
  }

  get savedPeople(): string[] {
    try {
      const local = JSON.parse(localStorage.getItem('people') || '[]');

      if (Array.isArray(local)) return local;
    } catch (error) {
      return [];
    }

    return [];
  }

  get unselectedSavedPeople(): string[] {
    return this.savedPeople.filter((person: string) => !this.personNames.includes(person)).sort();
  }

  private getSavedPeople(): Set<string> {
    return new Set(this.savedPeople);
  }

  private setSavedPeople(people: Set<string>) {
    localStorage.setItem('people', JSON.stringify(Array.from(people)));
  }

  add(): void {
    this.store.dispatch(addPerson({ person: { name: this.person, purchases: new Map() } }));
    const people: Set<string> = this.getSavedPeople();
    people.add(this.person);
    this.setSavedPeople(people);
    setTimeout(() => this.person = '');
    setTimeout(() => this.input.nativeElement.blur());
    setTimeout(() => this.input.nativeElement.focus());
  }

  remove(personName: string): void {
    const person: Person | undefined = this.people.get(personName);
    if (person) this.store.dispatch(removePerson({ person: person }));
  }

  removeSaved(person: string): void {
    const people: Set<string> = this.getSavedPeople();
    people.delete(person);
    this.setSavedPeople(people);
    setTimeout(() => this.input.nativeElement.focus());
  }
}
