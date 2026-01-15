// src/app/models/order-history-dto.ts
export interface OrderHistoryDTO {
  id: number;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  dateCreated: Date; 
}
