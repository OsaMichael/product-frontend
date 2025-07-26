
import { Component } from '@angular/core';
 import { MatIconModule } from '@angular/material/icon';
 import { RouterModule } from '@angular/router';

 @Component({
   selector: 'app-landing',
   standalone: true,
   imports: [MatIconModule, RouterModule],
   templateUrl: './landing.component.html',
 styleUrls: ['./landing.component.scss']
})
 export class LandingComponent {}

