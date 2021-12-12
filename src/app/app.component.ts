import { Component, OnInit, VERSION } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  constructor(private itemsService: ItemsService) {}
  ngOnInit(): void {
    this.itemsService.getItemsFromApi();
  }
}
