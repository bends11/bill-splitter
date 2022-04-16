import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../services/item.service';
import { Person, PersonService, Purchase } from '../services/person.service';

interface Share {
  name: string,
  quantity: number,
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent extends BaseComponent implements OnInit {

  split: boolean = false;
  name: string = '';
  price: string = '';
  person: string = '';
  quantity: string = '';
  private shares: Map<string, Share> = new Map();

  @ViewChild('shareInput') shareInput!: ElementRef;

  constructor(personService: PersonService, itemService: ItemService, route: ActivatedRoute) {
    super(personService, itemService, route);
  }

  get personNames(): string[] {
    return Array.from(this.people.keys()).sort();
  }

  get shareList(): Share[] {
    return Array.from(this.shares.values());
  }

  override ngOnInit(): void {
      super.ngOnInit();

      this.name = this.getRouteParam('name');
      const item: Item | undefined = this.items.get(this.name);
      if (item) {
        this.price = item.price.toString();
        this.split = item.people.length > 1;
        if (this.split) {
          item.people.forEach((person: string) => {
            console.log(this.people);
            this.shares.set(person, {
              name: person,
              quantity: this.people.get(person)?.purchases.get(this.name)?.quantity || 0,
            });
          });
        } else {
          this.person = item.people[0];
        }
      }
  }

  add(): void {
    const price: number = parseFloat(this.price);
    let people: string[];
    let quantity: number = 0;

    if (this.split) {
      people = Array.from(this.shares.keys());

      Array.from(this.shares.values()).forEach(share => {
        quantity += share.quantity;
      });

      Array.from(this.shares.values()).forEach(share => {
        const purchase: Purchase = {
          name: this.name,
          price: price * (share.quantity / quantity),
          quantity: share.quantity,
        }

        this.people.get(share.name)?.purchases.set(this.name, purchase)
      });
    }
    else {
      people = [ this.person ];
      quantity = 1;

      const purchase: Purchase = {
        name: this.name,
        price: price,
        quantity: quantity,
      }
      this.people.get(this.person)?.purchases.set(this.name, purchase);
    }
    const item: Item = {
      name: this.name,
      price: price,
      people: people,
      quantity: quantity,
    }
    this.items.set(this.name, item);

    console.log(this.shareInput);

    setTimeout(() => this.shareInput.nativeElement.blur());
  }

  addShare() {
    this.shares.set(this.person, { name: this.person, quantity: parseInt(this.quantity) || 1 });
    this.person = '';
    this.quantity = '';
  }

  editShare(name: string) {
    const share: Share | undefined = this.shares.get(name);
    if (share) {
      this.person = share.name;
      this.quantity = share.quantity.toString();
      setTimeout(() => {
        this.shareInput.nativeElement.focus();
        this.shareInput.nativeElement.select();
      });
    }
  }

  removeShare(name: string) {
    this.shares.delete(name);
  }

}
