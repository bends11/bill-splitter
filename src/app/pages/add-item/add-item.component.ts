import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemNameTakenComponent } from 'src/app/modals/item-name-taken/item-name-taken.component';
import { BaseComponent } from '../base/base.component';
import { Item } from 'src/app/state/models/item';
import { Share } from 'src/app/state/models/share';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addItem, removeItem } from 'src/app/state/items/items.actions';

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

  constructor(store: Store<AppState>,
              route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router
  ) {
    super(store, route);
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
        this.split = item.shares.size > 1;
        this.store.dispatch(removeItem({ item: item }));
      }
  }

  add(): void {
    if (this.items.has(this.name)) {
      this.dialog.open(ItemNameTakenComponent, {
        data: { name: this.name },
      }).afterClosed().subscribe((newName: string) => {
        if (newName && newName.length > 0) {
          this.name = newName;
          this.addItem();
        }
      })
    } else {
      this.addItem();
    }
  }

  addItem(): void {
    this.store.dispatch(addItem({
      item: {
        name: this.name,
        price: parseFloat(this.price),
        shares: this.shares,
      }
    }));

    setTimeout(() => this.shareInput.nativeElement.blur());

    this.router.navigate(['/items'])
  }

  addShare() {
    this.shares.set(this.person, {
      name: this.person,
      quantity: parseInt(this.quantity) || 1
    });
    this.person = '';
    this.quantity = '';
  }

  splitEvenly() {
    this.split = true;
    this.personNames.forEach((person) => {
      this.shares.set(person, { name: person, quantity: 1 });
    })
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
