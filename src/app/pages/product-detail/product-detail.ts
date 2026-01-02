import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;

  images: string[] = [];
  selectedImage = 'placeholder.png'; // valor inicial seguro

  constructor(
    private route: ActivatedRoute,
    private productsService: Products,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    try {
      const data = await this.productsService.getProductById(id);

      if (!data) {
        throw new Error('Producto no encontrado');
      }

      this.product = data;

      // Generar imágenes por ID
      this.images = [
        `${this.product.id}-1.jpg`,
        `${this.product.id}-2.jpg`,
        `${this.product.id}-3.jpg`,
      ];

      // Protección obligatoria: si no hay imágenes, usar placeholder
      this.selectedImage = this.images.length
        ? this.images[0]
        : 'placeholder.png';
    } catch (error) {
      console.error('Error cargando producto:', error);
      this.product = null;
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  get whatsappLink(): string {
    if (!this.product) return '';

    const message = `Hola, estoy interesado en el producto "${this.product.name}" que cuesta Bs ${this.product.price_b2c}. ¿Me podrías dar más información?`;

    return `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  }
}
