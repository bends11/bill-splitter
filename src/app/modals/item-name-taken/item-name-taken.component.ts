import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ItemService } from 'src/app/services/item.service';
import { PersonService } from 'src/app/services/person.service';
import { AppState } from 'src/app/state/app.state';

export interface ItemNameTakenData {
  name: string,
}

@Component({
  selector: 'app-item-name-taken',
  templateUrl: './item-name-taken.component.html',
  styleUrls: ['./item-name-taken.component.css']
})
export class ItemNameTakenComponent extends BaseComponent implements OnInit {
  newName: string = this.data.name;

  constructor(store: Store<AppState>,
              route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: ItemNameTakenData
  ) {
    super(store, route);

  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.newName = this.disambiguateName(this.data.name);
  }

}
