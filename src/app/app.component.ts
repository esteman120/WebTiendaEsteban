import { Component } from '@angular/core';
import { StoreService } from './Service/service';
import { Store } from '@ngrx/store';
// import { appState } from './Reducers/app.reducerCategory';
import * as category from '../app/Actions/category.actions';
import * as product from '../app/Actions/product.actions';
import { appStateCategory } from './Reducers/app.reducerCategory';
import { appStateProduct } from './Reducers/app.reducerProduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ObjCar: any;
  CantProductSelect: number = 0;
  
  constructor(
    private service: StoreService,
    private store: Store<appStateCategory>,
    private storeProducts: Store<appStateProduct>,){
    
  }

  ngOnInit(): void {
    
    this.GetCategory();
    this.GetProduct();

    this.GetProductCar();
  }

  GetProductCar() {
    this.storeProducts.select("ProductCar")
      .subscribe(
        (car) => {
          let obj = this.RemoveDuplicate(car.ProductCar);
          this.CantProductSelect = obj.length;
          this.ObjCar = obj;
        }
      )
  }

  GetProduct() {
    this.service.GetProduct().then(
      (res)=>{
        let Objproduct = res["data"]["rows"].map((obj)=> ({ ...obj, Cant: 0, SubTotal: 0 }));
        this.storeProducts.dispatch( new product.ProductData(Objproduct));
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }


  GetCategory() {
    this.service.GetCategories().then(
      (res)=>{
          console.log(res);
          this.store.dispatch( new category.CategoryData(res.data));
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  RemoveDuplicate(product) {
    let object = Array.from(product.reduce((m, t) => m.set(t.id, t), new Map()).values());
    return object;
  }
}
