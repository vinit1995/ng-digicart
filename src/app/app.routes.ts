import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path:'dashboard', component: DashboardComponent, pathMatch:"full"},
  { path: 'add-product', component:AddProductComponent},
  { path: 'add-category', component:CategoryComponent},
  { path: '', redirectTo:'dashboard', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
];
