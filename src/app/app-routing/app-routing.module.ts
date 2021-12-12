import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DisplayItemsComponent } from '../display-items/display-items.component';
import { OffersComponent } from '../offers/offers.component';
import { CartItemsComponent } from '../cart-items/cart-items.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: DisplayItemsComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'cart', component: CartItemsComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
