import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ItemService } from '../services/item.service';
import { Person, PersonService, Purchase } from '../services/person.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = [ 'purchases' ];
  displayedPurchaseColumns: string[] = [ 'name', 'total' ];

  total: number = 0;
  isCalculated: boolean = false;

  constructor(personService: PersonService, itemService: ItemService) {
    super(personService, itemService);
  }

  get peopleList(): Person[] {
    return Array.from(this.people.values());
  }

  getPurchases(personName: string): Purchase[] {
    const list: Purchase[] = [];
    const person: Person | undefined = this.people.get(personName);

    person?.purchases.forEach((purchase: Purchase) => list.push(purchase));

    return list;
  }

  get subtotal() {
    let sub = 0;
    this.items.forEach(item => {
      sub += item.price;
    });
    return sub;
  }

  calculate(total: string) {
    this.total = parseFloat(total);
    this.isCalculated = true;
  }

  calculateTotal(person: Person): number{
    return (this.calculateSubTotal(person) / this.subtotal) * this.total;
  }

  calculateSubTotal(person: Person): number {
    let sub = 0;
    person.purchases.forEach(purchase => {
      sub += purchase.price;
    });
    return sub;
  }

}
