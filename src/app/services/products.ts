import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private products: Product[] = [
    {
      id: '1',
      name: 'Audífonos In Ear Pro',
      description: 'Audífonos originales con micrófono y cancelación básica.',
      price: 120,
      stock: 15,
      imageUrl: 'https://via.placeholder.com/300',
      category: 'audio',
      isActive: true,
    },
    {
      id: '2',
      name: 'Cargador USB-C 65W',
      description: 'Carga rápida, compatible con múltiples dispositivos.',
      price: 180,
      stock: 8,
      imageUrl: 'https://via.placeholder.com/300',
      category: 'cargadores',
      isActive: true,
    },
    {
      id: '3',
      name: 'Cable USB-C',
      description: 'Cable reforzado de 1 metro.',
      price: 45,
      stock: 30,
      imageUrl: 'https://via.placeholder.com/300',
      category: 'Cables',
      isActive: true,
    },
  ];

  //El metodo devuelve productos que cumplan, que esten activos
  getProducts(): Product[] {
    return this.products.filter(p => p.isActive);
  }
  //El metodo devuelve las categorias de los productos sin repetir
    //Usamos Set para eliminar duplicados y map para extraer las categorias
  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }
  //El metodo devuelve los productos por categoria
  getProductsByCategory(category: string): Product[] {
    return this.getProducts().filter(p => p.category === category);
  }
  
}