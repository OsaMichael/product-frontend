import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product.component';
import { LandingComponent } from './pages/landing.component';
import { RegisterProductComponent } from './pages/register-product.component';
import { UpdateProductComponent } from './pages/product-update.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },  
  { path: 'products', component: ProductComponent },
   { path: 'products/add', component: RegisterProductComponent },
   { path: 'products/update/:id', component: UpdateProductComponent },

];

