import { Injectable } from '@angular/core';
import { Product, AlertSummary } from '../models/product.model';
import { SupabaseService } from '../core/services/supabase.service';

@Injectable({ providedIn: 'root' })
export class Products {
  
  constructor(private supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.client;
  }

  private handleError(error: any) {
    console.error('Database Error:', error);
    throw error;
  }

  async getProducts(): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) this.handleError(error);
    return data ?? [];
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await this.client
      .from('products')
      .select('category')
      .eq('is_active', true);

    if (error) this.handleError(error);
    return [...new Set(data?.map(p => p.category) ?? [])];
  }

  async getProductById(id: number): Promise<Product> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) this.handleError(error);
    return data as Product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true);

    if (error) this.handleError(error);
    return data ?? [];
  }

  // --- SECCIÓN ADMIN (Tipado fuerte) --- [cite: 73]

  async getAlertSummary(): Promise<AlertSummary> {
    const { data, error } = await this.client
      .from('alert_summary')
      .select('*')
      .single();

    if (error) this.handleError(error);
    return data as AlertSummary;
  }

  async getLowMarginProducts(): Promise<any[]> {
    const { data, error } = await this.client
      .from('alert_low_margin')
      .select('*');
    if (error) this.handleError(error);
    return data ?? [];
  }

  async getOldStockProducts(): Promise<any[]> {
    const { data, error } = await this.client
      .from('alert_old_stock')
      .select('*');
    if (error) this.handleError(error);
    return data ?? [];
  }

  async getLowStockProducts(): Promise<any[]> {
    const { data, error } = await this.client
      .from('alert_low_stock')
      .select('*');
    if (error) this.handleError(error);
    return data ?? [];
  }
}