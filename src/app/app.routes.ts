import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
//import { Products } from './pages/products/products';
import { AboutComponent } from './pages/about/about';
import { ProductDetailComponent } from './pages/product-detail/product-detail';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductsComponent },
    {
      path: 'admin', 
      loadChildren: () => import('./admin/dashboard/admin.routes').then(m => m.adminRoutes)
    },
    { path: 'nosotros', component: AboutComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: '**', redirectTo: '' }
];

/*

    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes) },
// Nueva ruta admin
    {
      path: 'admin', 
      loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes) 
    },

*/