import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../models/product.model';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-product-detail',
  standalone: true,                 // 👈 standalone
  imports: [CommonModule],          // 👈 directivas comunes (*ngIf, *ngFor)
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'], // 👈 plural
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productsService: Products,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.loading = true;
  this.cdr.detectChanges(); // 👈 CLAVE

  try {
    this.product = await this.productsService.getProductById(id);
  } catch (error) {
    console.error(error);
  } finally {
    this.loading = false;
    this.cdr.detectChanges(); // 👈 CLAVE
    }
  }
}