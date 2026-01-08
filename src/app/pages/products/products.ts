import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';   
import { Product } from '../../models/product.model';
import { Products as ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading = true;

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.categories = await this.productsService.getCategories();
      await this.loadProducts();
    } catch (error) {
      console.error('Error al inicializar:', error);
    }
  }

  async loadProducts(category?: string) {
    this.loading = true;
    this.cdr.detectChanges();

    try {
      this.products = category
        ? await this.productsService.getProductsByCategory(category)
        : await this.productsService.getProducts();
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    this.loadProducts(category || undefined);
  }

  goToDetail(id: number) {
    this.router.navigate(['/product', id]);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/products/placeholder.png';
  }
}

