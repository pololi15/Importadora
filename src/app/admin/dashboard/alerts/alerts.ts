import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../services/products';

@Component({
  selector: 'admin-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.html',
})
export class AlertsComponent implements OnInit {

  lowMargin: any[] = [];
  oldStock: any[] = [];
  lowStock: any[] = [];
  badSales: any[] = [];

  loading = true;

  constructor(private productsService: Products) {}

  async ngOnInit() {
    try {
      const [
        lowMargin,
        oldStock,
        lowStock,
        badSales
      ] = await Promise.all([
        this.productsService.getLowMarginProducts(),
        this.productsService.getOldStockProducts(),
        this.productsService.getLowStockProducts(),
        this.productsService. getBadSalesProducts(),
      ]);

      this.lowMargin = lowMargin ?? [];
      this.oldStock = oldStock ?? [];
      this.lowStock = lowStock ?? [];
      this.badSales = badSales ?? [];

    } catch (error) {
      console.error('Error cargando alertas:', error);
    } finally {
      this.loading = false;
    }
  }
}
