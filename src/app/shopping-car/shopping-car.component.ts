import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appStateProduct } from '../Reducers/app.reducerProduct';
import * as product from '../Actions/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  ObjProduct: unknown[];
  Total: any;
  validateItems: boolean;

  constructor(
    private storeProducts: Store<appStateProduct>,
    private router: Router,) { }

  ngOnInit(): void {
    this.GetProducts()
  }

  GetProducts() {
    this.storeProducts.select('ProductCar')
      .subscribe(
        (product) => {
          let Objproduct = this.RemoveDuplicate(product.ProductCar);
          this.ObjProduct = Objproduct;
        }
      )
      this.GetTotal();
  }

  RemoveDuplicate(product) {
    let object = Array.from(product.reduce((m, t) => m.set(t.id, t), new Map()).values());
    return object;
  }

  DeleteProductCar(item) {
    this.storeProducts.dispatch(new product.RemoveProductCar(item.id));
    this.GetTotal();
  }

  AddItem(item) {
    // let cant = event.target.valueAsNumber;
    this.storeProducts.dispatch(new product.AddProductCar(item.id));
    this.GetTotal();
  }  

  DeleteItem(item) {
    this.storeProducts.dispatch(new product.DeleteProductCar(item.id));
    this.GetTotal();
  }

  GetTotal() {
    this.storeProducts.select('Total')
      .subscribe(
        (product) => {
          this.Total = product.Total;
          this.validateItems = this.Total > 0 ? false : true;          
        }
      )
  }

  ToCustomer(){
    this.router.navigate(['Customer']);
  }

  
}
