import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm: FormGroup;

  title: string ="Create";
    
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private productService: ProductService,
              private aRouter: ActivatedRoute) {

    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.updateProduct();
  }

  addProduct() {

    const PRODUCT: Product = {
     name: this.productForm.get('product')?.value,
     category: this.productForm.get('category')?.value,
     location: this.productForm.get('location')?.value,
     price: this.productForm.get('price')?.value
    }

    if (this.id !== null) {
      this.productService.updateProduct(this.id, PRODUCT).subscribe(data => {
        this.toastr.success('Product updated', 'Done!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        this.productForm.reset();
      });
    } else {
      console.log(PRODUCT);
      this.productService.createProduct(PRODUCT).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      });
    }
  }

  updateProduct() {
    if (this.id !== null) {
      this.title = 'Edit Product';
      this.productService.getProduct(this.id).subscribe(data => {
        this.productForm.setValue({
          product: data.name,
          category: data.category,
          location: data.location,
          price: data.price
        });
      });
    }
  }

}