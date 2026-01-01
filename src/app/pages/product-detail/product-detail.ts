import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../models/product.model';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-product-detail',
  standalone: true,                 
  imports: [CommonModule],          
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'], 
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
  this.cdr.detectChanges(); 

  try {
    this.product = await this.productsService.getProductById(id);
  } catch (error) {
    console.error(error);
  } finally {
    this.loading = false;
    this.cdr.detectChanges(); 
    }
  }
  get whatsappLink(): string {
  if (!this.product) return '';

  const message = `Hola, estoy interesado en el producto "${this.product.name}" que cuesta Bs ${this.product.price_b2c}. ¿Me podrías dar más información?`;

  return `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

}