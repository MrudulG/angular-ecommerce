import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartStatusService } from 'src/app/service/cart-status.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId!: number| null;
  product! : Product;
  totalAmount =0;
  totalItems= 0;


  constructor(private service: ProductService,private route: ActivatedRoute,
              private cartStatusService: CartStatusService
  ) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe((data)=> {
      console.log(data);
      this.productId =  data.has('id') ?   Number (data.get('id')) : null;
      console.log(this.productId)
      if(this.productId) {
        this.loadProduct();
      }
    })

  }

  loadProduct(){
    this.service.getAProduct(this.productId).subscribe(
      (data) => {
        
        this.product= data;
        console.log(this.product);
      }
    )
  }
  

  addToCartHandler(product: Product){
    console.log("Add to cart");
    const cartItem = new CartItem(product);
    this.cartStatusService.addToCart(cartItem);
  }

}
