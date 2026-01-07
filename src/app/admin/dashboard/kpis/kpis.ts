import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../services/products';

@Component({
  selector: 'admin-kpis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpis.html'
})
export class KpisComponent implements OnInit {
  loading = true;
  summary = {
    low_margin: 0,
    old_stock: 0,
    low_stock: 0,
    bad_sales: 0
  };

  constructor(
    private productsService: Products,
    private cdr: ChangeDetectorRef // Importante para detectar cambios tras async [cite: 16]
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const data = await this.productsService.getAlertSummary();
      
      // Si la data viene con nombres distintos (ej. low_margin_products), mapealos aquí:
      if (data) {
        this.summary = {
          low_margin: data.low_margin ?? data.low_margin ?? 0,
          old_stock: data.old_stock ?? data.old_stock  ?? 0,
          low_stock: data.low_stock ?? data.low_stock ?? 0,
          bad_sales: data.bad_sales ?? 0
        };
      }
    } catch (error) {
      console.error('Error cargando KPIs:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); 
    }
  }
}