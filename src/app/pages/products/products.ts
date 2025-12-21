import { Component } from '@angular/core';
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
