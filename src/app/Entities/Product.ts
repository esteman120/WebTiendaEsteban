export class Producto{

    id: number;
    productName: string;
    price: string;
    datePublish: Date
    description: string;
    categories: any;
    Cant: number;
    SubTotal: number

    constructor(
        id: number,
        productName: string, 
        price: string, 
        datePublish: Date,
        description: string,
        categories: any,
        Cant: number,
        SubTotal: number
        ){
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.datePublish = datePublish;
        this.description = description;
        this.categories = categories;
        this.Cant = Cant;
        this.SubTotal = SubTotal;
    }

    public static fromJson(element: any) {
        return new Producto(
            element.id,
            element.productName,
            element.price,
            element.datePublish,
            element.description,
            element.categories,
            0,
            0
        );
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}