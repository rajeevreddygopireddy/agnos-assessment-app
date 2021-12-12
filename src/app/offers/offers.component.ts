import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { Item } from '../../models/items.model';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit, OnDestroy {
  selectedOffer = '';
  item1 = {} as Item;
  item2 = {} as Item;
  amount = null;
  items$: Observable<Item[]>;
  subscriptions: Subscription[] = [];
  comboAdded = false;
  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.items$ = this.itemsService.getItems().pipe(
      map((items) => items.filter((item) => !item.itemType)),
      tap((items) => {
        this.item1 = items[0];
        this.item2 = items[1];
      })
    );
  }
  onCombo1Chng(): void {
    console.log(JSON.stringify(this.item1));
  }
  addOffer(event: string): void {
    console.log(event);
    this.subscriptions.push(
      of(event)
        .pipe(
          withLatestFrom(this.itemsService.getItems()),
          map(([res, items]: [any, Item[]]) => {
            console.log('after add combo event clicked' + res, items);
            let availableItems;
            if (event === 'addCombo' || event === 'oneplusone') {
              availableItems = [...items];
              const newId = availableItems.length + 1;
              availableItems.push({
                id: newId,
                itemName: this.getName(event),
                itemPrice: this.amount,
                itemType: event === 'addCombo' ? 'COMBO' : 'ONEPLUSONE',
                itemDescription:
                  this.item1.itemName + ' + ' + this.item2.itemName,
                comboItems: [...[], this.item1, this.item2],
              });
            } else {
              availableItems = [...items];
              console.log(this.item1.id);
              availableItems = availableItems.map((item) => {
                if (item.id === this.item1.id) {
                  item.itemType = 'DISCOUNT';
                  item.discountPrice = this.amount;
                  this.itemsService.updatePriceWithNewDiscount(this.item1);
                }
                return item;
              });
            }
            console.log('after add combo event clicked' + res, items);
            this.itemsService.setItems(availableItems);
          })
        )
        .subscribe((_) => {
          this.comboAdded = true;
          setTimeout(() => {
            this.comboAdded = false;
            this.amount = null;
          }, 2000);
        })
    );
  }

  getName(event: string): string {
    if (event === 'addCombo') return 'Combo';
    if (event === 'oneplusone')
      return (
        'Buy ' +
        this.item1.itemName +
        ' ' +
        'get ' +
        this.item2.itemName +
        ' for free at'
      );
    if (event === 'discount') return '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
// console.log({
//   id: newId,
//   itemName: this.getName(event),
//   itemPrice: this.amount,
//   itemDescription:
//     this.item1.itemName + ' ' + this.item2.itemName,
//   comboItems: [...[], this.item1, this.item2],
// });
