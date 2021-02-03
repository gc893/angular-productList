import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, find, map} from'rxjs/operators';

import {IProduct} from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json'

    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
            map(products => products.find(product => product.productId === id)),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error ocurred ${err.error.message}`
        } else {
            errorMessage = `${err.status}, ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}