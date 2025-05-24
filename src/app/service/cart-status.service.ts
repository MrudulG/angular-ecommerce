import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartStatusService {

  cartItem: CartItem[] = []; 
  cartItemSubject: Subject<CartItem[]> = new Subject<CartItem[]>();
  totalAmount =0;
  totalItems = 0;
  totalAmountSubject: Subject<number> = new BehaviorSubject<number>(this.totalAmount);
  totalItemsSubject: Subject<number> = new BehaviorSubject<number>(this.totalItems);

  storage: Storage = sessionStorage;


  constructor() { 

    let data = JSON.parse(this.storage.getItem('cartItem')!);

    if(data != null ){
      this.cartItem = data;
      this.computeCartTotals();
    }
  }

  getCartItems(): Observable<any>{
    console.log("Cart Status",this.totalItems, this.totalAmount);
    this.cartItemSubject.next(this.cartItem);
    return this.cartItemSubject;
  }

  addToCart(theCartItem: CartItem) {
    let existingCartItem: CartItem | undefined;
    if (this.cartItem.length > 0) {
      existingCartItem = this.cartItem.find((item) => item.id === theCartItem.id);
    }
    if (existingCartItem) {
      existingCartItem.quantity++;
    }
    else {
      // add the cart items to the array
      this.cartItem.push(theCartItem);
    }
    // compute cart total price and quantity
    this.computeCartTotals();
  }
  removeItem(theCartItem: CartItem){
   let itemIndex  = this.cartItem.findIndex((item) => item.id === theCartItem.id);
   if(itemIndex> -1){
    this.cartItem.splice(itemIndex,1);
   }
   this.computeCartTotals();
  }
  removeFromCart(theCartItem: CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity ==0){
      this.removeItem(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalAmount =0
    let totalItems = 0

    this.cartItem.forEach((item) => {
      totalAmount += item.quantity * item.unitPrice;
    totalItems += item.quantity;
    })

    this.totalAmountSubject.next(totalAmount);
    this.totalItemsSubject.next(totalItems);
    this.loggerMethod(totalAmount, totalItems);
    this.persistCartItems();
  }

  persistCartItems(){
    this.storage.setItem('cartItem', JSON.stringify(this.cartItem));
  }

  loggerMethod(totalAmount: any, totalItems: any){
     this.cartItem.forEach((item)=> {
      console.log(item.name + "-"+ item.quantity);
      console.log("price per piece-"+ item.unitPrice);

     })
     console.log("total items-"+ totalItems + "Total Price"+ totalAmount)
    
  }
}
