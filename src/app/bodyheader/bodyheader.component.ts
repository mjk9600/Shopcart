import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodyheader',
  templateUrl: './bodyheader.component.html',
  styleUrls: ['./bodyheader.component.css'],
})
export class BodyheaderComponent implements DoCheck {
  isMenuVisible = false;

  constructor(private router: Router) {}

  ngDoCheck(): void {
    let currentroute = this.router.url;
    let role = sessionStorage.getItem('role');
    if (
      currentroute == '/login' ||
      currentroute == '/dashbord' ||
      currentroute == '/register'
    ) {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }
}
