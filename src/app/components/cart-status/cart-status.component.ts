import { Component, OnInit } from '@angular/core';
import { CartStatusService } from 'src/app/service/cart-status.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalAmount: number = 0;
  totalItems: number = 0
  

  constructor(private cartStatusService: CartStatusService) { }

  ngOnInit(): void {

    this.cartStatusService.totalAmountSubject.subscribe(
      (data) => {
        this.totalAmount = data;
      }
      
    )
    this.cartStatusService.totalItemsSubject.subscribe(
      (data) => {
        this.totalItems = data;
      })
    console.log("fetch cart status",this.totalAmount,this.totalItems);
    
  }
  
}
