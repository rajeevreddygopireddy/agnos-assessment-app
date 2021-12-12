import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  itemsInCart = {};
  totalBill = 0;
  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsInCart = this.itemsService.cartItems;
    for (let i in this.itemsInCart) {
      this.totalBill = this.totalBill + this.itemsInCart[i].totalItemPrice;
      console.log('in obj loop', i);
    }
    console.log('total p' + this.totalBill);
  }
}
