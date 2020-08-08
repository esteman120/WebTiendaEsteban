import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
import { ListProductComponent } from './list-product/list-product.component';
import { CustomerComponent } from './customer/customer.component';


const routes: Routes = [
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  {path:'', component: ListProductComponent},
  {path:'Product-Car', component: ShoppingCarComponent},
  {path:'Customer', component: CustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
