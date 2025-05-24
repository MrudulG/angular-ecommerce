import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetOrderHistoryResponse } from '../modals/GetOrderHistoryResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrderHistory(email: string): Observable<GetOrderHistoryResponse>{
    const orderHistoryUrl = this.orderUrl+"/search/findByCustomerEmailOrderByDateCreatedDesc?email="+email;
    return this.http.get<GetOrderHistoryResponse>(orderHistoryUrl);
  }


}
