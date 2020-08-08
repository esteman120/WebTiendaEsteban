import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';


import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools"
import { reducerCategory } from './Reducers/app.reducerCategory';
import { CategoryComponent } from './category/category.component';
import { Mensajes } from './utils/Mensajes';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducerProduct } from './Reducers/app.reducerProduct';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
import { ListProductComponent } from './list-product/list-product.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoryComponent,
    ShoppingCarComponent,
    ListProductComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot({
      Category : reducerCategory,
      Product: reducerProduct,
      ProductXCategory: reducerProduct,
      ProductCar: reducerProduct,
      ProductOrder: reducerProduct,
      Total: reducerProduct
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,      
    })
  ],
  providers: [Mensajes ],
  bootstrap: [AppComponent]
})
export class AppModule { }
