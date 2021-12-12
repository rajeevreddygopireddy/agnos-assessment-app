import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';

import items from '../configs/items';
import { Item } from '../models/items.model';

@Injectable()
export class ItemsService {
  cartItems = {};
  constructor() {}

  private _items$ = new ReplaySubject<Item[]>(1);
  public items$ = this._items$.asObservable();

  getItemsFromApi(): void {
    // need to get all available items from APIs
    this.setItems(items);
  }
  getItems(): Observable<Item[]> {
    return this._items$;
  }
  setItems(items: Item[]): void {
    this._items$.next(items);
  }
  setItemsToCart(item: Item, operation?: string): void {
    if (this.cartItems[item.id]) {
      this.cartItems[item.id].quantity =
        operation === 'minus'
          ? this.cartItems[item.id].quantity - 1
          : this.cartItems[item.id].quantity + 1;
      this.cartItems[item.id].totalItemPrice = this.getPrice(
        item,
        this.cartItems[item.id].quantity
      );
    } else {
      this.cartItems[item.id] = {
        quantity: 1,
        item: item,
        totalItemPrice: this.getPrice(item, 1),
      };
    }
    console.log('items in cart', this.cartItems);
  }

  getPrice(item: Item, quantity: number): number {
    return item.discountPrice
      ? item.discountPrice * quantity
      : item.itemPrice * quantity;
  }

  updatePriceWithNewDiscount(item): void {
    if (this.cartItems[item.id]) {
      this.cartItems[item.id].totalItemPrice = this.getPrice(
        item,
        this.cartItems[item.id].quantity
      );
      console.log('updated price' + this.cartItems[item.id].totalItemPrice);
    }
  }

  deleteItemFromCart(item): void {
    delete this.cartItems[item.id];
  }
}
