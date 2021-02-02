import { Component, OnInit } from '@angular/core'
import {IProduct} from './product'
import {ProductService} from './product.service'

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    showImage: boolean = false;
    filteredProducts: IProduct[];
    private _listFilter: string;
    
    get listFilter() :string {
        return this._listFilter;
    };
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    };
    products: IProduct[];

    constructor(private productService: ProductService) {};
    
    ngOnInit() {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    };
    
    toggleImage(): void {
        this.showImage = !this.showImage;
    };
    
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        });
    };

    onRatingClicked(msg: string): void {
       this.pageTitle = 'Product List: ' + msg; 
    }
}