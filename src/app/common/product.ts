export class Product {

    // public sku: String | undefined;
        public id!: String;
        public sku!: String;
        public name!: String;
        public description!: String;
        public unitPrice!: number;
        public imageUrl!: String;
        public active!: boolean;
        public unitsInStock!: number;
        public dateCreated!: Date;
        public lastUpdated!: Date;

    // constructor(public sku: String,
    //     public name: String,
    //     public description: String,
    //     public unit_price: number,
    //     public image_url: String,
    //     public active: boolean,
    //     public units_in_stock: number,
    //     public date_created: Date,
    //     public last_updated: Date,
    // ){

    // }
}
