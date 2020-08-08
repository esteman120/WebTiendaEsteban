import { Component, OnInit } from '@angular/core';
import { appStateProduct } from '../Reducers/app.reducerProduct';
import { Store } from '@ngrx/store';
import * as product from '../Actions/product.actions';
import { Producto } from '../Entities/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  ObjProduct: any;

  constructor(private storeProducts: Store<appStateProduct>,) { }

  ngOnInit(): void {
    this.storeProducts.select('Product')
      .subscribe(
        (product) => {
          // let Objproduct = this.RemoveDuplicate(product.Product);    
          this.ObjProduct = Producto.fromJsonList(product.Product);
          this.ObjProduct.sort((a, b) => (a.productName > b.productName) ? 1 : -1);  
        }
      )

      this.storeProducts.select('ProductXCategory')
      .subscribe(
        (product) => {
          let ObjProduct = Producto.fromJsonList(product.ProductXCategory);
          // let Objproduct = this.RemoveDuplicate(product.ProductXCategory);
          if (ObjProduct.length > 0) {
            this.ObjProduct = ObjProduct;
          }
          
        }
      )

      this.storeProducts.select('ProductOrder')
      .subscribe(
        (product) => {
          let Objproduct = product["ProductOrder"];
          this.FiltroOrdenar(Objproduct);
          
        }
      )
  }

  RemoveDuplicate(product) {
    let object = Array.from(product.reduce((m, t) => m.set(t.id, t), new Map()).values());
    return object;
  }

  AddElement(item){ 
    // item = {
    //   ...item,
    //   Cant: 1,
    //   Total: item.price      
    // }
    this.storeProducts.dispatch(new product.AddProductCar(item.id));
  }

  FiltroOrdenar(e) {
    switch (e) {     
      case "1":
        this.ObjProduct.sort((a, b) => (a.productName > b.productName) ? 1 : -1);         
        break;
      case "2":
        this.ObjProduct.sort((a, b) => (a.productName > b.productName) ? -1 : 1);  
        break;
      case "3":
        this.ObjProduct.sort((a, b) => (parseInt(a.price)  > parseInt(b.price)) ? -1 : 1);        
        break;
      case "4":
        this.ObjProduct.sort((a, b) => (parseInt(a.price)  > parseInt(b.price)) ? 1 : -1);
        break;
      case "5":
        this.ObjProduct.sort((a, b) => ( new Date(a.datePublish)  > new Date(b.datePublish)) ? 1 : -1);
        break;        
      default:
        break;
    }
  }

}
