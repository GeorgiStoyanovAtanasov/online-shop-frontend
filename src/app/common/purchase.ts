import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];

  constructor(
    customer: Customer = new Customer(),
    shippingAddress: Address = new Address(),
    billingAddress: Address = new Address(),
    order: Order = new Order(),
    orderItems: OrderItem[] = []
  ) {
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.order = order;
    this.orderItems = orderItems;
  }
}
