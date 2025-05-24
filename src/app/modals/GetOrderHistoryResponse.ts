import { OrderHistory } from "../common/order-history";

export interface GetOrderHistoryResponse {
    
    _embedded: {
            orders: OrderHistory[];
        }
}