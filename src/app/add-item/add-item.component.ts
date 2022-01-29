import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../services/item.service';
import { PersonService, Purchase } from '../services/person.service';

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
  private shareNum: number = 1;
  private shares: Map<string, Share> = new Map();

  constructor(personService: PersonService, itemService: ItemService) {
    super(personService, itemService)
  }

  get personNames(): string[] {
    return Array.from(this.people.keys()).sort();
  }

  get shareList(): Share[] {
    return Array.from(this.shares.values());
  }

  add(name: string, priceString: string, person: string): void {
    const price: number = parseFloat(priceString);
    let people: string[];
    let quantity: number = 0;

    if (this.split) {
      people = Array.from(this.shares.keys());

      Array.from(this.shares.values()).forEach(share => {
        quantity += share.quantity;
      });

      Array.from(this.shares.values()).forEach(share => {
        const purchase: Purchase = {
          name: name,
          price: price * (share.quantity / quantity),
          quantity: share.quantity,
        }

        this.people.get(share.name)?.purchases.set(name, purchase)
      });
    }
    else {
      people = [ person ];
      quantity = 1;

      const purchase: Purchase = {
        name: name,
        price: price,
        quantity: quantity,
      }
      this.people.get(person)?.purchases.set(name, purchase);
    }
    const item: Item = {
      name: name,
      price: price,
      people: people,
      quantity: quantity,
    }
    this.items.set(name, item);
  }

  setSplit(split: boolean) {
    this.split = split;
  }

  setShareNum(quantity: string) {
    this.shareNum = parseInt(quantity);
  }

  getMax(): number {
    let sharesUsed: number = 0;
    this.shareList.forEach(share => {
      sharesUsed += share.quantity;
    });
    return this.shareNum - sharesUsed;
  }

  addShare(shareName: any, shareQuantity: any) {
    this.shares.set(shareName.value, { name: shareName.value, quantity: parseInt(shareQuantity.value) });
    shareName.value = '';
    shareQuantity.value = '';
  }

  removeShare(name: string) {
    this.shares.delete(name);
  }

}
