import type Product from "./product";

export default interface Cart {
    Id: number;
    UserId: string;
    CartPrice: number;
}

export default interface CartItem {
    Id: number;
    CartId: number;
    ProductId: number;
    Quantity: number;
    ItemPrice: number;
    Product: Product;
    Cart: Cart;
}