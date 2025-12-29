import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
//import { Products } from './pages/products/products';
import { AboutComponent } from './pages/about/about';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductsComponent },
    //{ path: 'productos', component: Products },
    { path: 'nosotros', component: AboutComponent },
    { path: '**', redirectTo: '' }
];
