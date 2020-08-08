import * as product from '../Actions/product.actions';

// tslint:disable-next-line:interface-name
export interface appStateProduct {
    Product: any,
    ProductXCategory: any,
    ProductCar: any,
    ProductOrder: string,
    Total: any
}

export const initialState = {
    Product: [],
    ProductXCategory: [],
    ProductCar: [],
    ProductOrder: "",
    Total: 0
}

export function reducerProduct(state: appStateProduct = initialState, actionProduct: product.ProductActions) {
    console.log(actionProduct);

    switch (actionProduct.type) {
        case product.PRODUCT:
            return {
                ...state,
                Product: actionProduct.payload
            }
        case product.PRODUCTXCATEGORY:
            return {
                ...state,
                // Product: state.Product.filter((x)=> x.categories[0].id == action.payload)
                ProductXCategory: actionProduct.payload
            }
        case product.REMOVEPRODUCTXCATEGORY:
            return {
                ...state,
                ProductXCategory: state.Product
            }
        case product.ADDPRODUCTCAR:
            let y = state.Product.find((item) => item.id === actionProduct.id)
            let itemExist = state.ProductCar.find((item) => item.id === actionProduct.id);

            if (itemExist) {
                itemExist = JSON.parse(JSON.stringify(itemExist));

                // itemExist.Cant += 1;
                let index = state.ProductCar.findIndex((item) => item.id === actionProduct.id);
                let ppp = JSON.parse(JSON.stringify(state.ProductCar));
                ppp[index].Cant += 1;
                let Total = parseInt(state.Total) + parseInt(itemExist.price)
                return {
                    ...state,
                    Total,
                    ProductCar: ppp,
                }
            }
            else {
                let itemProduct = JSON.parse(JSON.stringify(y));
                itemProduct.Cant = 1;
                let Total = parseInt(state.Total) + parseInt(itemProduct.price)
                return {
                    ...state,
                    ProductCar: [...state.ProductCar, itemProduct],
                    Total
                }
            }

        case product.REMOVEPRODUCTCAR:
            let itemRemove = state.ProductCar.find((item) => item.id === actionProduct.payload);
            let newTotal = state.Total - (itemRemove.price * itemRemove.Cant)
            return {
                ...state,
                ProductCar: state.ProductCar.filter((x) => x.id !== actionProduct.payload),
                Total: newTotal
            }

        case product.DELETEITEMPRODUCTCAR:
            let itemExistDelete = state.ProductCar.find((item) => item.id === actionProduct.id);
            
            itemExistDelete = JSON.parse(JSON.stringify(itemExistDelete));
            // itemExist.Cant += 1;
            let index = state.ProductCar.findIndex((item) => item.id === actionProduct.id);
            let ppp = JSON.parse(JSON.stringify(state.ProductCar));
            let Total
            if ((ppp[index].Cant - 1) > 0) {
                ppp[index].Cant -= 1;
                Total = parseInt(state.Total) - parseInt(itemExistDelete.price)
            }
            
            return {
                ...state,
                Total,
                ProductCar: ppp,
            }

        case product.ORDERPRODUCT:
            return {
                ...state,
                ProductOrder: actionProduct.payload
            }

        default:
            return state;
    }
}