import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,MatMenuModule, MatButtonModule],
  template: `

<nav class="navbar">
<a routerLink="/" class="navbar-brand">Product System</a>
  <div class="dropdown">
    <button mat-button [matMenuTriggerFor]="menu">Menu</button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item routerLink="/products" routerLinkActive="active">Products</button>
      <button mat-menu-item routerLink="/products/add" routerLinkActive="active">Add Product</button>

    </mat-menu>
  </div>
</nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {}
//