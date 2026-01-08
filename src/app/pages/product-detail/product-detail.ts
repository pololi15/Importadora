import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';

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
  selectedImage = '/assets/products/placeholder.png';

  constructor(
    private route: ActivatedRoute,
    private productsService: Products,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
  console.log('Iniciando carga...'); // Control
  this.loading = true;

  try {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    console.log('ID a buscar:', id);

    const [product, images] = await Promise.all([
      this.productsService.getProductById(id),
      this.productsService.getProductImages(id)
    ]);

    console.log('Datos recibidos:', { product, images });

    this.product = product;
    this.images = images;

    if (this.images.length === 0 && this.product?.image_url) {
      this.images = [this.product.image_url];
    }

    this.selectedImage = this.images.length > 0 
      ? this.images[0] 
      : '/assets/products/placeholder.png';

  } catch (error) {
    console.error('❌ Error capturado:', error);
  } finally {
    this.loading = false;
    console.log('Carga finalizada, loading = false');
    this.cdr.detectChanges(); // 3. Fuerza a Angular a revisar la pantalla
  }
}

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/products/placeholder.png';
  }

  get whatsappLink(): string {
    if (!this.product) return '';
    const message = `Hola, estoy interesado en el producto "${this.product.name}" que cuesta Bs ${this.product.price_b2c}. ¿Me podrías dar más información?`;
    return `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}