import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isMenuOpened= false;
  constructor(
    private router: Router
    ) {}

  ngOnInit() {}

  toggleNav() {
    this.isMenuOpened= !this.isMenuOpened;
  }
  goTo(routeUrl: string) {
    this.router.navigateByUrl(routeUrl);
    this.toggleNav();
  }

}
