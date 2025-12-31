import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Products {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async getProducts(): Promise<Product[]> {
  
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
  console.log('products data:', data);
    if (error) throw error;
    
    console.log('products error:', error);
    return data as Product[];

  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('category')
      .eq('is_active', true);

    if (error) throw error;

    return [...new Set(data.map(p => p.category))];
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true);

    if (error) throw error;
    return data as Product[];
  }
  async getProductById(id: number): Promise<Product> {
    const { data, error } = await this.supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    if (error) throw error;
    return data as Product;
  }
}
