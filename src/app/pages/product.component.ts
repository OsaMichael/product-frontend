
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule,MatFormFieldModule,MatButtonModule, MatOptionModule, MatSelectModule,MatTableModule,MatProgressBarModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: any | null = null;

  displayedColumns: string[] = ['id','productName','price', 'category', 'description']
  
  @Input() product: Product = { productName: '', price: 0, category: '', description: ''};
 // @Output() save = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (productData) => {
       this.products = productData; 
        //  alert('get products');
        this.router.navigate(['/products']);
      },
      error: (err) => {
         console.error('Error fetching products:', err);
       alert('Failed to fetch products. Please try again.');
      },
     });
   }

   selectProduct(product: Product) {
  // about to save selected product to localStorage (as a single item, not array)
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  console.log('Selected product:', product);
  this.router.navigate([`/products/update/${product.id}`]);
}

  deleteProduct(id: any) {
    if (!id) {
        console.error('Invalid product id:', id);
        alert('Invalid product id!');
        return;
    }
    console.log(`Product ${id} about to delete`);
    this.productService.deleteProduct(id.toString()).subscribe({
      next: () => {
        console.log(`Product ${id} deleted successfully`);
        alert('Product deleted successfully!');

        this.loadProducts(); //  Calls method to refresh the list dynamically    
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert('Failed to delete product.');
      }
    });
}

loadProducts() {
  this.productService.getProducts().subscribe({
      next: (products) => {
          this.products = products; //  Updates the products list
      },
      error: (err) => {
          console.error('Error fetching products:', err);
      }
  });
}

}

