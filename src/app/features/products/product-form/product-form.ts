import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Resolved product (will be populated if editing)
  product = input<Product | null>(null);

  productForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  ngOnInit() {
    // Determine if editing based on current route
    this.isEditMode = this.route.snapshot.url.some(segment => segment.path === 'edit');

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      photoUrl: ['', [Validators.required]]
    });

    // If edit mode and product is resolved, populate form
    const prod = this.product();
    if (this.isEditMode && prod) {
      this.productForm.patchValue({
        name: prod.name,
        price: prod.price,
        photoUrl: prod.photoUrl
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.productForm.value;

    if (this.isEditMode) {
      const prod = this.product();
      if (prod) {
        this.productService.updateProduct(prod.id, formValue).subscribe({
          next: () => {
            this.isSubmitting = false;
            this.router.navigate(['/products', prod.id]);
          },
          error: () => {
            this.isSubmitting = false;
            alert('Failed to update product');
          }
        });
      }
    } else {
      this.productService.addProduct(formValue).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/products']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('Failed to add product');
        }
      });
    }
  }
}
