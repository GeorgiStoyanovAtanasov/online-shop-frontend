import { CartItem } from "./cart-item";

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: string;

  // constructor overloads (signatures only, no body)
  constructor(imageUrl: string, unitPrice: number, quantity: number, productId: string);
  constructor(cartItem: CartItem);

  // actual constructor implementation
  constructor(
    imageUrlOrCartItem: string | CartItem,
    unitPrice?: number,
    quantity?: number,
    productId?: string
  ) {
    if (typeof imageUrlOrCartItem === "string") {
      // when called with individual values
      this.imageUrl = imageUrlOrCartItem;
      this.unitPrice = unitPrice!;
      this.quantity = quantity!;
      this.productId = productId!;
    } else {
      // when called with a CartItem
      this.imageUrl = imageUrlOrCartItem.imageUrl;
      this.quantity = imageUrlOrCartItem.quantity;
      this.unitPrice = imageUrlOrCartItem.unitPrice;
      this.productId = imageUrlOrCartItem.id;
    }
  }
}

