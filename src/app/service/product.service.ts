import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';
import { GetResponse } from '../modals/GetResponse';
import { GetCategoryResponse } from '../modals/GetCategoryResponse';
import { ProductCategory } from '../common/product-category';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl = "http://localhost:8080/api/products";
  searchUrl = 'http://localhost:8080/api/products/search/findByCategoryId?id=';
  productCategoryUrl= 'http://localhost:8080/api/productCategories';
  searchByProductNameUrl = "http://localhost:8080/api/products/search/findByNameContaining?name="

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }


  // getProductList(): Observable<any>{
  //   return this.httpClient.get<GetResponse>(this.baseUrl)
    
  // }

  getProductListPaginate(pageNo: number, pageSize: number): Observable<any>{
    console.log(this.baseUrl+"?page="+pageNo+"&size"+pageSize);
    return this.httpClient.get<GetResponse>(this.baseUrl+"?page="+pageNo+"&size="+pageSize);
    
  }


  getAProduct(id: any): Observable<Product>{
   return this.httpClient.get<any>(this.baseUrl+'/'+id);
  }

  getProductByCategory(id: number): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.searchUrl+id).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductByCategoryPaginate(id: number, pageNo?: number, pageSize?: number): Observable<any> {
    console.log(id,pageNo,pageSize, this.searchUrl+id+"?page="+pageNo+"&size="+pageSize);
    return this.httpClient.get<GetResponse>(this.searchUrl+id+'&page='+pageNo+'&size='+pageSize)
  }

  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetCategoryResponse>(this.productCategoryUrl).pipe(
        map(response=> response._embedded.productCategories)
    );
  }

  getSearchByName(name: any): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.searchByProductNameUrl+ name).pipe(map(
      response => response._embedded.products)
    );
  }

  getSearchByNamePaginate(name: any, pageNo: number, pageSize: number): Observable<any>{
    return this.httpClient.get<GetResponse>(this.searchByProductNameUrl+name+'&page='+pageNo+'&size='+pageSize)
  }


}
