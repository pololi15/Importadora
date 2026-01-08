import { Injectable } from '@angular/core';
import { Product, AlertSummary } from '../models/product.model';
import { SupabaseService } from '../core/services/supabase.service';
import { environment } from '../../environments/environment';

const IMAGE_BUCKET = 'products';

@Injectable({ providedIn: 'root' })
export class Products {
  
  constructor(private supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.client;
  }

  // Público: retorna la URL pública o '' si no hay ruta
  public getPublicUrl(filePath: string | null): string {
  if (!filePath) return '';
  
  // Si ya es una URL completa de Supabase, devuélvela tal cual
  if (filePath.startsWith('http')) return filePath;

  // Solo si es un PATH (ej: "1/foto.jpg") aplicamos la lógica de Supabase
  const { data } = this.client.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);
  return data?.publicUrl || '';
}

  // Privado: devuelve URL pública o placeholder cuando no hay ruta
  private resolveImage(url: string | null | undefined): string {
    const publicUrl = this.getPublicUrl(url ?? null);
    return publicUrl || '/assets/products/placeholder.png';
  }

  private handleError(error: any) {
    console.error('❌ Database Error:', error);
    throw error;
  }

  async getProducts(): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) this.handleError(error);
    const items = (data ?? []) as Product[];
    return items.map(p => ({
      ...p,
      image_url: this.resolveImage(p.image_url)
    }));
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await this.client
      .from('products')
      .select('category')
      .eq('is_active', true);

    if (error) this.handleError(error);
    return [...new Set(data?.map(p => p.category) ?? [])];
  }

  // En tu servicio Products.ts
async getProductById(id: number): Promise<Product | null> {
  const { data, error } = await this.client
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle(); // Cambia .single() por .maybeSingle()

  if (error) {
    console.error('Error en DB:', error);
    return null;
  }
  
  const product = data as Product;
  if (product && product.image_url) {
    product.image_url = this.resolveImage(product.image_url);
  }
  return product;
}

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true);

    if (error) this.handleError(error);
    const items = (data ?? []) as Product[];
    return items.map(p => ({
      ...p,
      image_url: this.resolveImage(p.image_url)
    }));
  }

  // --- SECCIÓN ADMIN ---
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
  
  async getBadSalesProducts(): Promise<any[]> {
    const { data, error } = await this.client
      .from('alert_bad_sales')
      .select('*');
    if (error) this.handleError(error);
    return data ?? [];
  }

  // Si tu bucket es privado puedes generar una URL firmada
  async getSignedUrl(filePath: string, expiresIn = 60): Promise<string> {
    if (!filePath) return '';
    try {
      const { data, error } = await this.client.storage
        .from(IMAGE_BUCKET)
        .createSignedUrl(filePath, expiresIn) as any;
      if (error) {
        console.error('❌ Signed URL error:', error);
        return '';
      }
      return data?.signedUrl ?? '';
    } catch (err) {
      console.error('❌ Error creating signed URL:', err);
      return '';
    }
  }

  async getProductImages(productId: number): Promise<string[]> {
    const { data, error } = await this.client
      .from('product_images')
      .select('image_url')
      .eq('product_id', productId)
      .order('position', { ascending: true });

    if (error) {
      console.error('❌ Error cargando imágenes:', error);
      return [];
    }

    return (data ?? []).map(img => this.resolveImage(img.image_url));
  }
}

