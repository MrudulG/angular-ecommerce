import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartStatusService } from 'src/app/service/cart-status.service';


@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})



export class CartDetailComponent implements OnInit {

  cartItem: CartItem[] = [];
  totalAmount: number = 0;
  totalItems: number = 0

  constructor(private cartStatusService: CartStatusService) { }

  ngOnInit(): void {
    this.getCartData();
  }

  addQuantity(item: CartItem){
    this.cartStatusService.addToCart(item);
  }

  minusQuantity(item: CartItem){
    this.cartStatusService.removeFromCart(item);
  }

  removeFromCart(item: CartItem){
    this.cartStatusService.removeItem(item);
  }


  getCartData() {
    this.cartItem = this.cartStatusService.cartItem;
    this.cartStatusService.totalAmountSubject.subscribe(
      (data) => {
        this.totalAmount = data;
      }

    )
    this.cartStatusService.totalItemsSubject.subscribe(
      (data) => {
        this.totalItems = data;
      })
    this.cartStatusService.computeCartTotals();
  }
}
