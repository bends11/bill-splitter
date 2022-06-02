import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../../services/item.service';
import { PersonService } from '../../services/person.service';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends BaseComponent implements OnInit {

  imageProcessProgress: number = 0;
  isProcessingImage: boolean = false;

  constructor(personService: PersonService, itemService: ItemService, route: ActivatedRoute) {
    super(personService, itemService, route)
  }

  get itemList(): Item[] {
    return Array.from(this.items.values());
  }

  remove(item: Item): void {
    this.items.delete(item.name);
    item.people.forEach(person => {
      this.people.get(person)?.purchases.delete(item.name);
    });
  }

  getLimitedName(name: string, price: number) {
    const maxLength = 25 - Math.floor(Math.log10(price));

    if (name.length < maxLength) return name;

    return name.substring(0, maxLength - 3) + '...';
  }

  onImageSelected(event: any) {
    const image: File = event.target.files[0];

    this.isProcessingImage = true;

    Tesseract.recognize(
      image,
      'eng',
      { logger: message => {
          if (message.status === 'recognizing text') {
            this.imageProcessProgress = message.progress * 100;
          }
        }
      }
    ).then(({ data: { text } }) => {
      text.split('\n').forEach((line: string) => {
        let priceIndex = line.indexOf('$');

        const priceMatches: RegExpMatchArray | null = line.substring(priceIndex).match('[0-9]*\\.[0-9]{2}[^0-9]*$');

        if (priceMatches) {
          const price: number = parseFloat(priceMatches[0]);

          if (priceIndex < 0) priceIndex = line.indexOf(price.toString());

          const itemName: string = this.disambiguateName(line.substring(0, priceIndex).trim());

          this.items.set(itemName, {
            name: itemName,
            price,
            people: [],
            quantity: 0
          });
        }
      });
    }).finally(() => this.isProcessingImage = false);

    // const text: string = `2 2TORO T
    // 2 3.HAMACH] 3??38 "
    // 3 9.UNAGI $17 |
    // T 12.WHITE TUNA $5.99
    // | 29.SPICY YELLOWTAIL 3450
    // ROLL
    // 1T 61.KABUKI ROLL $8.95
    // 2 63.DRAGON ROLL 53350 |
    // 1 KAMIKAZE $9.95
    // 1 ALLIGATOR $14.95
    // 1 ONIGOROSHI HONJOIO  $8.50
    // 1 OYSTER BAY SAUVIGNON  $8.99
    // BLANC
    // GLASS (98.99)`;
  }
}
