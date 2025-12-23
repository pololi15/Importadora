import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
//import { Products } from './pages/products/products';
import { About } from './pages/about/about';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'productos', component: ProductsComponent },
    //{ path: 'productos', component: Products },
    { path: 'nosotros', component: About },
    { path: '**', redirectTo: '' }
];
