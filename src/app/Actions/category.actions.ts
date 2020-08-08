import { Action } from "@ngrx/store";

export const CATEGORY = '[Category] Carga';

export class CategoryData implements Action {
    readonly type = CATEGORY;

    constructor(public payload : string){

    }
}

export type CategoryActions = CategoryData;