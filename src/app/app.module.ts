import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ItemsService } from '../services/items.service';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { CardComponent } from '../common/components/card/card.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { OffersComponent } from './offers/offers.component';
import { AlertComponent } from '../common/components/alert/alert.component';
import { CartItemsComponent } from './cart-items/cart-items.component';

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    DisplayItemsComponent,
    CardComponent,
    SideMenuComponent,
    OffersComponent,
    AlertComponent,
    CartItemsComponent,
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
