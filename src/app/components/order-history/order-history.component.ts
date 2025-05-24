import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { GetOrderHistoryResponse } from 'src/app/modals/GetOrderHistoryResponse';
import { OrderHistoryService } from 'src/app/service/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

orderHistoryList: OrderHistory[] = [];
storage : Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory(){
    const theEmail = this.storage.getItem('email')!;
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      (data)=> {
            this.orderHistoryList = data._embedded.orders;
      }
    )
  }

}
