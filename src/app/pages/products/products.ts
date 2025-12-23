import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Products as ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,              // 👈 standalone moderno
  imports: [CommonModule],       // 👈 importa directivas comunes (*ngIf, *ngFor)
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading = true;

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    try {
      // 👇 si getProducts devuelve Promise
      this.products = await this.productsService.getProducts();
      this.categories = await this.productsService.getCategories();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  filterByCategory(category: string | null) {
  this.selectedCategory = category;

  if (category) {
    this.products = this.productsService.getProductsByCategory(category);
  } else {
    this.products = [...this.productsService['allProducts']];
  }
}

}
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Products as ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
})
export class Products {

  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null; 

  constructor(private productsService: ProductsService) {
    this.products = this.productsService.getProducts();
    this.categories = this.productsService.getCategories();
  }

  filterByCategory(category: string | null) {
    this.selectedCategory = category;

    this.products = category
      ? this.productsService.getProductsByCategory(category)
      : this.productsService.getProducts();
  }
}
*/
