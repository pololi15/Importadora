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

  //Dashboard de Admin
  calculateLandedCost(batch: any) {
    const arrivalDate = new Date(batch.arrival_date);
    const today = new Date();
    const daysInStock = Math.floor((today.getTime() - arrivalDate.getTime()) / (1000 * 3600 * 24));
    
    const holdingCost = daysInStock * batch.storage_cost_per_day;
    const totalCost = batch.purchase_price_unit + batch.shipping_cost_unit + batch.import_tax_unit + holdingCost;
    
    return {
        totalCost,
        daysInStock,
        needsLiquidation: daysInStock > 90 // regla de los 3 meses
    };
  }

  async getAISuggestions() {
    const { data, error } = await this.supabaseService.client.functions.invoke('suggest-products');
    return data.suggestions; // ["Drones FPV", "Cerraduras Zigbee"]
  }
}
