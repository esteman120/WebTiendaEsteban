import { Component, OnInit } from '@angular/core';
import { appStateCategory } from '../Reducers/app.reducerCategory';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreService } from '../Service/service';
import { Mensajes } from '../utils/Mensajes';
import { appStateProduct } from '../Reducers/app.reducerProduct';
import * as product from '../Actions/product.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  ObjCategory: any;
  objProduct: any;

  constructor(
    private store: Store<appStateCategory>,
    private storeProducts: Store<appStateProduct>,
    private spinner: NgxSpinnerService,
    private service: StoreService,
    private mensajes: Mensajes,
  ) { }

  ngOnInit(): void {
    this.store.select("Category")
      .subscribe(
        (category) => {
          this.ObjCategory = category.Category;
        }
      )
  }

  SelectCategory(item) {

    if (item == -1) {
      this.storeProducts.dispatch(new product.RemoveProductXCateogry());
    }
    else {
      this.spinner.show();
      this.SelectProduct(item.id);
    }

  }

  SelectProduct(id) {
    this.service.GetProductXCategory(id).then(
      (res) => {
        console.log(res);
        let objProduct = res["data"]["rows"];        
        this.storeProducts.dispatch(new product.ProductXCateogry(objProduct));
        this.spinner.hide();
      }
    ).catch(
      (error) => {
        console.log(error)
        this.mensajes.MostrarError("Error al obtener el producto");
      }
    );
  }

  FiltroOrdenar(e){
    this.storeProducts.dispatch(new product.ProductOrder(e));
  }

}
