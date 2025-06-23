import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ItemService } from 'src/app/services/item.service';
import { PersonService } from 'src/app/services/person.service';

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

  constructor(personService: PersonService,
              itemService: ItemService,
              route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: ItemNameTakenData
  ) {
    super(personService, itemService, route);

  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.newName = this.disambiguateName(this.data.name);
  }

}
