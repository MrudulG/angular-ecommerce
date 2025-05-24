import { ProductCategory } from "../common/product-category";

export interface GetCategoryResponse {

    _embedded: {
        productCategories: ProductCategory[];
    }

}