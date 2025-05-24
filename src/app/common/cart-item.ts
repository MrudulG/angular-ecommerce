import { Product } from "./product";

export class CartItem {

        public id!: String;
        public name!: String;
        public unitPrice!: number;
        public imageUrl!: String;
        public unitsInStock!: number;

        public quantity: number;

        constructor(product: Product) {
                this.id = product.id;
                this.name = product.name;
                this.unitPrice = product.unitPrice;
                this.imageUrl = product.imageUrl;
                this.unitsInStock = product.unitsInStock;

                this.quantity = 1;
        }
}
