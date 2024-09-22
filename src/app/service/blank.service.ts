import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlankService {

  constructor(private _HttpClient: HttpClient) { }

  // ? --------------- baseUrl ---------------
  baseUrl = `https://ecommerce.routemisr.com/api/v1/`

  // ?--------------- getAllProduct ---------------
  getProduct(pageNum:number =1): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`)
  }
  // ? --------------- getAllCategory ---------------
  getCategory(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `categories`)
  }
  // ? --------------- getProductCategory ---------------
  getProductCategory(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `products?category[in]=${id}`)
  }
  // ? --------------- getDetailsProduct ---------------
  getDetails(idDetails: any): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `products/${idDetails}`)
  }
  // ? --------------- getAllBrands ---------------
  getBrands(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `brands`)
  }
  // ? --------------- getProductBrands ---------------
  getProductBrands(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `products?brand=${id}`)
  }

}
