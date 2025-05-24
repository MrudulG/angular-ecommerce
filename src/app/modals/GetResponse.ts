import { Page } from "../common/page";
import { Product } from "../common/product";

export interface GetResponse {

    _embedded: {
      products: Product[];
    },
    page : {
      pagedata : Page;
    }
  
  }