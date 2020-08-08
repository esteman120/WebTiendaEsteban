


import * as category from '../Actions/category.actions';



// tslint:disable-next-line:interface-name
export interface appStateCategory {
    Category: any,    
}

export const initialState = {
    Category: []
}

export function reducerCategory(state : appStateCategory = initialState , action: category.CategoryActions){ 
    console.log(action);

    switch (action.type) {
        case category.CATEGORY:
            return{
                ...state,
                Category: action.payload
            }
    
        default:
            return state;
    }
}
