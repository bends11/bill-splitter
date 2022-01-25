import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Map<string, boolean> = new Map();

  constructor() { }

  ngOnInit(): void {
    this.people.set('Ben', true);
    this.people.set('Jacob', true);
    this.people.set('1', true);
    this.people.set('2', true);
    this.people.set('3', true);
    this.people.set('4', true);
    this.people.set('5', true);
    this.people.set('6', true);
    this.people.set('7', true);
    this.people.set('8', true);
    this.people.set('9', true);
    this.people.set('0', true);
  }

  add(person: any): void {
    this.people.set(person.value, true);
    person.value = '';
  }

  remove(person: any): void {
    this.people.delete(person);
  }
}
