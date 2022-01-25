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
  }

  add(person: any): void {
    this.people.set(person.value, true);
    person.value = '';
  }

  remove(person: any): void {
    this.people.delete(person);
  }
}
