import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  category_id: number = 1;
  menuList: ProductCategory[] = [];

  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    this.service.getProductCategory().subscribe((response)=>{
      this.menuList = response;
    })
  }

  selectCategry(category = 1){
    this.category_id = category;
 }

}
