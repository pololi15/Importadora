import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { adminGuard } from './admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboard,
    canActivate: [adminGuard],
    children: []
  }
];