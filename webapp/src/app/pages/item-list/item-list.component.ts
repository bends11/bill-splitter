import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Item, ItemService } from '../../services/item.service';
import { PersonService } from '../../services/person.service';
import * as Tesseract from 'tesseract.js';
import { TabscannerService } from 'src/app/services/tabscanner.service';
import { catchError, delay, of, repeat, skipWhile, switchMap, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends BaseComponent implements OnInit {

  imageProcessProgress: number = 0;
  isProcessingImage: boolean = false;

  constructor(personService: PersonService, itemService: ItemService, private tabScannerService: TabscannerService, route: ActivatedRoute, private snackBar: MatSnackBar) {
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
    this.processReceipt(event.target.files[0]);
  }

  private processReceipt(receipt: File) {
    this.isProcessingImage = true;

    this.tabScannerService.processReceipt(receipt).pipe(
      catchError(err => of(err)),
      switchMap((processResponse: any) => {
        if (processResponse?.error) return of(processResponse);

        if (processResponse?.status === 'success') {
          return this.tabScannerService.getResult(processResponse.token).pipe(
            catchError(err => of(err)),
            delay(1000),
            repeat(60),
            skipWhile((resultResponse: any) => resultResponse.status !== 'done'),
            take(1),
          );
        }

        return of(processResponse);
      }),
    ).subscribe((response: any) => {
      if (response?.result?.lineItems) {
        response.result.lineItems.filter((item: any) => item.lineTotal > 0).forEach((item: any) => {
          this.addItem(item.desc, item.lineTotal);
        });
      } else {
        console.log(response);
        this.snackBar.open("Error processing receipt", "Close", {
          duration: 5000
        })
      }

      this.isProcessingImage = false;
    });
  }

  private processImageLocally(image: File) {
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

          const name: string = line.substring(0, priceIndex).trim();

          this.addItem(name, price);
        }
      });
    }).finally(() => this.isProcessingImage = false);
  }

  private addItem(name: string, price: number) {
    const itemName = this.disambiguateName(name);

    this.items.set(itemName, {
      name: itemName,
      price,
      people: [],
      quantity: 0
    });
  }
}
