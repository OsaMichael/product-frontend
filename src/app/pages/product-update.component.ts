import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, ReactiveFormsModule,MatOptionModule, MatSelectModule
  ],
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class UpdateProductComponent implements OnInit{
  updateProductForm!: FormGroup;
  @Input() product: Product = { productName: '', price: 0, category: '', description: ''};
  id: string = '';
 
  constructor(private route: ActivatedRoute,
     private router: Router,
     private fb: FormBuilder,
     private productService: ProductService)
     {
}
    ngOnInit(): void {

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
      console.log('about to call api service');
    this.productService.getProductById(+id).subscribe((data) => {
      this.product = data;
      this.updateProductForm.patchValue(data);
    });
  } else {
    alert('No ID found in route');
  }
        this.updateProductForm = this.fb.group({
            id: [0],
            productName: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            description: ['', Validators.required]
        })

      this.retrieveId()
    }

   get _id(){
        return this.updateProductForm.get('id')
    }

    get _productName(){
        return this.updateProductForm.get('productName')
    }

    get _price(){
        return this.updateProductForm.get('price')
    }

    get _category(){
        return this.updateProductForm.get('category')
    }

    get _description(){
        return this.updateProductForm.get('description')
    }

retrieveId() {
  const productData = localStorage.getItem('selectedProduct');
  if (productData) {
    const selected = JSON.parse(productData);
    this.updateProductForm.patchValue({ ...selected });
  } else {
    console.log('No selected product found in localStorage.');
  }
}
saveProduct(data: any) {
  if (this.updateProductForm.valid) {
    const updatedProduct = this.updateProductForm.getRawValue();
    const productId = this.product.id;

    if (!productId) {
      console.error('Product ID is missing!');
      alert('Product ID is missing. Cannot update.');
      return;
    }
    console.log('Updating product:', updatedProduct);
    this.productService.updateProduct(productId, updatedProduct).subscribe({
      next: (res) => {
        console.log('Update success:', res);
        alert('Product updated successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update product.');
      }
    });
  }
}

  
}



