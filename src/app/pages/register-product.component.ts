
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule,MatInputModule,MatFormFieldModule,MatButtonModule, MatOptionModule, 
    MatSelectModule,MatTableModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent implements OnInit {
  product: Product = {productName: '', price: 0, category: '', description: ''};

  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe({  
      next: (response) => {
        //console.log(`Response: ${response.message}`);
        //alert(`Response: ${response.message}`); 
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please try again.');
      },
    });
  }
   ngOnInit(): void {

  }
  

}


