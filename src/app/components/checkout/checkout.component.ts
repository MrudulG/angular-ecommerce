import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mapTo } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/checkout-details/order';
import { OrderItem } from 'src/app/common/checkout-details/order-item';
import { Purchase } from 'src/app/common/checkout-details/purchase';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartStatusService } from 'src/app/service/cart-status.service';
import { CheckoutFormService } from 'src/app/service/checkout-form.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  totalQuantity = 0;
  totalPrice = 0;
  cartItem: CartItem[] = [];
  creditCardMonths: number[] =[];
  creditCardYear: number[] = [];
  countryList: Country[] = [];
  billingstateList: any = [];
  shippingstateList: any = [];
  storage : Storage = sessionStorage;

  constructor(private formBuilder : FormBuilder,
    private cartStatusService: CartStatusService,
    private formService: CheckoutFormService,
    private infoService: InfoService,
    private router: Router
  
  ) { }

  ngOnInit(): void {
    this.formService.getCountryList().subscribe(
      (data)=> {
        this.countryList = data;
  })
    const theEmail = this.storage.getItem('email')!;
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl ('Mehul', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl ('Shah', [Validators.required, Validators.minLength(2)]),
        email: new FormControl (theEmail , [Validators.required, Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        country: ['Brazil', Validators.required],
        street: ['123', Validators.required],
        city: ['Ast', Validators.required],
        state: ['',  Validators.required],
        zipCode: ['123456',  [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      }),
      billingAddress: this.formBuilder.group({
        country: ['', Validators.required],
        street: ['aa', Validators.required],
        city: ['aax', Validators.required],
        state: ['',  Validators.required],
        zipCode: ['123432',  Validators.required],
      }),
      cardInfo: this.formBuilder.group({
        cardType: ['', Validators.required],
        nameOnCard: ['', Validators.required],
        cardNumber: ['', Validators.required],
        cvv: ['',  Validators.required],
        expiryMonth: ['',  Validators.required],
        expiryYear: ['',  Validators.required],
      }),

    })


    this.getCartData();
    this.getCreditCardYears();
    
  }

onSubmit(){
  console.log("Form submitted");
  
  if(this.checkoutForm.invalid){
    this.checkoutForm.markAllAsTouched();
    // return;
  }
  //setup an order
  let order = new Order();
  order.totalPrice = this.totalPrice;
  order.totalQuantity = this.totalQuantity;

  //get cart Items
  
  const cartItems = this.cartStatusService.cartItem;


  // create orderItems from cartItems

  
  // for (let i = 0; i< cartItems.length; i++){
  //   orderItems[i] = new OrderItem(cartItems[i]);
  // }
  let orderItems: OrderItem[] = [];
  orderItems = cartItems.map(m=> new OrderItem(m));

  // set up Purchase
  let purchase = new Purchase();

  // populate Purchase- Customer
  // purchase.customer = this.checkoutForm.get('customer')?.value;
  purchase.customer = this.checkoutForm.controls['customer']?.value;

  //populate Purchase - billing address
  purchase.billingAddress = this.checkoutForm.controls['billingAddress']?.value;
  purchase.shippingAddress = this.checkoutForm.controls['shippingAddress']?.value;

  //populate order and order items
  purchase.order = order;
  purchase.orderItems = orderItems; 

  // call rest API
  this.infoService.placeOrder(purchase).subscribe(
    {
      next: response => {
        console.log(response);
        alert("The order has been placed. The order Id is:" + response.orderTrackingNumber)
        this.reset();
      },
      error: err => console.log(err)
    }
  )


  }

  reset(){
    this.cartStatusService.cartItemSubject.next([]);
    this.cartStatusService.totalAmountSubject.next(0);
    this.cartStatusService.totalItemsSubject.next(0);
    this.checkoutForm.reset();
    this.router.navigate(['/products']);
  }

  copyAddress(event: any){
    if(event.target.checked){
      this.billingstateList = this.shippingstateList;
      this.checkoutForm.get('billingAddress')?.patchValue(this.checkoutForm.get('shippingAddress')?.value);
      
      // this.billingstateList = this.shippingstateList;
      // this.checkoutForm.get('billingAddress.state')?.setValue(this.checkoutForm.get('shippingAddress.state')?.value);
    }
    else{
      this.checkoutForm.get('billingAddress')?.reset();
      this.billingstateList = [];
    }
  }

  getCartData() {
    this.cartItem = this.cartStatusService.cartItem;
    this.cartStatusService.totalAmountSubject.subscribe(
      (data) => {
        this.totalPrice = data;
      }

    )
    this.cartStatusService.totalItemsSubject.subscribe(
      (data) => {
        this.totalQuantity = data;
      })
    // this.cartStatusService.computeCartTotals();
  }

  getCreditCardYears(){
    let startYear = new Date().getFullYear();
    for(let i=0; i<=10; i++){
      this.creditCardYear.push(startYear++)
    }

  }
  yearChangeEvent(){
    let startYear = new Date().getFullYear();
    let year = this.checkoutForm.get('cardInfo')?.value.expiryYear;
    this.creditCardMonths =[];
    let startMonth = new Date().getMonth()+1;
    if(year == Number(startYear)){
      for(let i=startMonth; i<=12; i++){
        this.creditCardMonths.push(startMonth++)
      }

    }
    else{
      for(let i=1; i<=12; i++){
        this.creditCardMonths.push(i)
      }
    }
  }

  countryChangeEvent(address: string){
    if(address === "shipping"){
      let country = this.checkoutForm.get('shippingAddress')?.value.country;
      this.shippingstateList = [];
      this.countryList.forEach((c)=> {
        if(c.name == country){
          this.populateStates(c.code, address);
        }
      })
    }
    else {
      let country = this.checkoutForm.get('billingAddress')?.value.country;
      this.billingstateList = [];
      this.countryList.forEach((c)=> {
        if(c.name == country){
          this.populateStates(c.code, address);
        }
      })
    }
  }

  populateStates(id: string, address: string){
    this.formService.getStateList(id).subscribe(
      data => { 
        if(address == "shipping"){
          this.shippingstateList = data.map(d=> d.name)
        }
        else{
          this.billingstateList = data.map(d=> d.name)
        }

      }
    )

  }

}
