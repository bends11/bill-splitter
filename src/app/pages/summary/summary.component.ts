import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { ItemService } from '../../services/item.service';
import { PersonService } from '../../services/person.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Person } from 'src/app/state/models/person';
import { Purchase } from 'src/app/state/models/purchase';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

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

  personExpanded: Map<string, boolean> = new Map();

  private formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  constructor(store: Store<AppState>, route: ActivatedRoute, private clipboard: Clipboard) {
    super(store, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setAllPersonExpanded(false);
  }

  get peopleList(): Person[] {
    return Array.from(this.people.values());
  }

  private getPersonDetails(person: Person): string {
    let ret = '';

    if (this.personExpanded.get(person.name)) {
      ret += person.name + '\n';
      this.people.get(person.name)?.purchases.forEach((purchase: Purchase) => {
        ret += purchase.name + ' x' + purchase.quantity + ': ' + this.formatter.format(purchase.price) + '\n';
      });
      ret += 'Subtotal: ' + this.formatter.format(this.calculateSubTotal(person)) + '\n';
      ret += 'Total: ' + this.formatter.format(this.calculateTotal(person)) + '\n';
    } else {
      ret += person.name + ': ' + this.formatter.format(this.calculateTotal(person)) + '\n';
    }

    return ret + '\n';
  }

  copy() {
    let content = '';
    this.peopleList.forEach((person: Person) => {
      content += this.getPersonDetails(person);
    })
    this.clipboard.copy(content);
  }

  toggle(personName: string) {
    this.personExpanded.set(personName, !this.personExpanded.get(personName));
  }

  canExpandAll() {
    let canExpand = false;

    Array.from(this.personExpanded.values()).forEach((expanded: boolean) => {
      if (!expanded) canExpand = true;
    });

    return canExpand;
  }

  canCollapseAll() {
    let canCollapse = false;

    Array.from(this.personExpanded.values()).forEach((expanded: boolean) => {
      if (expanded) canCollapse = true;
    });

    return canCollapse;
  }

  expandAll() {
    this.setAllPersonExpanded(true);
  }

  collapseAll() {
    this.setAllPersonExpanded(false);
  }

  private setAllPersonExpanded(expanded: boolean) {
    this.peopleList.forEach((person: Person) => {
      this.personExpanded.set(person.name, expanded);
    });
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
