import { Action } from "@ngrx/store";

export const PRODUCT = '[Product] Carga';
export const PRODUCTXCATEGORY = '[Product] ProductoXCategoria';
export const REMOVEPRODUCTXCATEGORY = '[Product] RemoveProductoXCategoria';

export const ADDPRODUCTCAR = '[Product] AddProductCar';
export const REMOVEPRODUCTCAR = '[Product] RemoveProductCar';
export const ORDERPRODUCT = '[Product] OrderProduct';
export const CANTTOTAL = '[Product] CantTotal';
export const DELETEITEMPRODUCTCAR = '[Product] DeleteItemProductCar';


export class ProductData implements Action {
    readonly type = PRODUCT;

    constructor(public payload : any){

    }
}

// tslint:disable-next-line:max-classes-per-file
export class ProductXCateogry implements Action {
    readonly type = PRODUCTXCATEGORY;

    constructor(public payload : any){

    }
}

// tslint:disable-next-line:max-classes-per-file
export class RemoveProductXCateogry implements Action {
    readonly type = REMOVEPRODUCTXCATEGORY;

    constructor(){

    }
}

// tslint:disable-next-line:max-classes-per-file
export class AddProductCar implements Action {
    readonly type = ADDPRODUCTCAR;

    constructor(public id : any){ 

    }
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteProductCar implements Action {
    readonly type = DELETEITEMPRODUCTCAR;

    constructor(public id : any){ 

    }
}

// tslint:disable-next-line:max-classes-per-file
export class RemoveProductCar implements Action {
    readonly type = REMOVEPRODUCTCAR;

    constructor(public payload : any){

    }
}

// tslint:disable-next-line:max-classes-per-file
export class ProductOrder implements Action {
    readonly type = ORDERPRODUCT;

    constructor(public payload : any){

    }
}

// tslint:disable-next-line:max-classes-per-file
export class ChangeCantTotal implements Action {
    readonly type = CANTTOTAL;

    constructor(public idItem){

    }
}

export type ProductActions = ProductData | 
ProductXCateogry | 
RemoveProductXCateogry |
AddProductCar |
RemoveProductCar |
ProductOrder |
ChangeCantTotal | 
DeleteProductCar;