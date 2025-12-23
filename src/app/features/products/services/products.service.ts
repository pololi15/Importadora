import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private supabaseService: SupabaseService) {}

  async getProducts() {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }

    return data;
  }
}
