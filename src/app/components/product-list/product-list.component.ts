import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';
import { Page } from 'src/app/common/page';
import { CartStatusService } from 'src/app/service/cart-status.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  pageData!: Page;
  userSearch: boolean = false;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  category_id: number = 1;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log("e", e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.serviceCallDecision();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private service: ProductService, private route: ActivatedRoute,
     private router: Router, private cartStatusService: CartStatusService) { }

  ngOnInit(): void {
    this.serviceCallDecision();
  }

  serviceCallDecision() {
    this.route.paramMap.subscribe(() => {
      this.userSearch = this.route.snapshot.paramMap.has('name');
      if (this.userSearch) {
        this.searchProduct();
      }
      else {
        this.category_id = this.route.snapshot.paramMap.has("id") ? Number(this.route.snapshot.paramMap.get("id")) : 5;
        this.list();
      }
    })
  }

  searchProduct() {
    this.service.getSearchByNamePaginate(this.route.snapshot.paramMap.get('name'), this.pageIndex, this.pageSize).subscribe(this.processData())
  }

  processData() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageData = data.page;
      this.mapPageData(this.pageData);
    }
  }

  list() {
    if (this.category_id == 5) {
      this.listProducts();
    }
    else {
      this.listACategory();
    }
  }

  listProducts() {
    this.service.getProductListPaginate(this.pageIndex, this.pageSize).subscribe(this.processData());
  }

  mapPageData(data: any) {
    this.length = data.totalElements;
    this.pageSize = data.size;
    this.pageIndex = data.number;
  }

  listACategory() {
    this.service.getProductByCategoryPaginate(this.category_id, this.pageIndex, this.pageSize).subscribe(this.processData())
  }

  addToCartHandler(product: Product){
    console.log("Add to cart");
    const cartItem = new CartItem(product);
    this.cartStatusService.addToCart(cartItem);
  }

}
