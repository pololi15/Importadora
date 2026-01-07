import { Component } from '@angular/core';
import { KpisComponent } from '../kpis/kpis';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [KpisComponent],
  template: `
    <section class="p-6">
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
      <admin-kpis />
    </section>
  `
})
export class AdminDashboard {}
