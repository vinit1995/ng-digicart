import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path:'dashboard', component: DashboardComponent, pathMatch:"full" },
  { path: 'add-product', component:AddProductComponent},
  { path: 'add-category', component:CategoryComponent},
  { path: 'cart', component:CartComponent},
  { path: '', redirectTo:'dashboard', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
];

// const routes: Routes = [
//   {
//     path: "products",
//     loadChildren: () => import("./features/products/products.routes").then((m) => m.PRODUCT_ROUTES),
//     data: { preload: true },
//   },
//   {
//     path: "categories",
//     loadChildren: () => import("./features/categories/categories.routes").then((m) => m.CATEGORY_ROUTES),
//   },
//   {
//     path: "cart",
//     canActivate: [authGuard],
//     loadChildren: () => import("./features/cart/cart.routes").then((m) => m.CART_ROUTES),
//   },
// ];