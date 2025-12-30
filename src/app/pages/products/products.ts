import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Products as ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,              
  imports: [CommonModule],       // importa directivas comunes (*ngIf, *ngFor)
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading = true;

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  //Método único para cargar productos
  async loadProducts(category?: string) {
    this.loading = true;
    this.cdr.detectChanges();

    try {
      this.products = category
        ? await this.productsService.getProductsByCategory(category)
        : await this.productsService.getProducts();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  //Inicialización Limpia 
  async ngOnInit() {
    try {
      this.categories = await this.productsService.getCategories();
      await this.loadProducts(); // carga inicial sin categoría
    } catch (error) {
      console.error(error);
    }
  }

  //  Filtro 
  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    this.loadProducts(category || undefined);
  }
}