import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/items.model';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css'],
})
export class DisplayItemsComponent implements OnInit {
  items$: Observable<Item[]>;
  itemsInCart = {};
  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.items$ = this.itemsService.getItems();
    this.itemsInCart = this.itemsService.cartItems;
  }

  addToCart(item: Item, operation?: string): void {
    if (this.itemsInCart[item.id]?.quantity === 1 && operation === 'minus') {
      this.itemsService.deleteItemFromCart(item);
    } else {
      this.itemsService.setItemsToCart(item, operation);
    }
    this.itemsInCart = this.itemsService.cartItems;
  }
}
