import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  person: string = '';

  @ViewChild('input') input!: ElementRef;

  constructor(personService: PersonService, itemService: ItemService, route: ActivatedRoute) {
    super(personService, itemService, route);
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
    this.people.set(this.person, { name: this.person, purchases: new Map() });
    const people: Set<string> = this.getSavedPeople();
    people.add(this.person);
    this.setSavedPeople(people);
    setTimeout(() => this.person = '');
    setTimeout(() => this.input.nativeElement.blur());
    setTimeout(() => this.input.nativeElement.focus());
  }

  remove(person: string): void {
    this.people.delete(person);
  }

  removeSaved(person: string): void {
    const people: Set<string> = this.getSavedPeople();
    people.delete(person);
    this.setSavedPeople(people);
    setTimeout(() => this.input.nativeElement.focus());
  }
}
