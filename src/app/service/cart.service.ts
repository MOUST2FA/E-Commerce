import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  cartNum: BehaviorSubject<number> = new BehaviorSubject(0)

  // ? --------------- baseUrl ---------------
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`
  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart`,
      {
        productId: prodId
      },
    )
  }

  // ? --------------- GetCart ---------------
  getCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `cart`)
  }

  // ? --------------- RemoveCart ---------------
  removeCart(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${id}`)
  }

  // ? --------------- clearAllCart ---------------
  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart`)
  }

  // ? --------------- changeCountCart ---------------
  changeCountCart(id: string, countNum: number): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `cart/${id}`,
      {
        count: countNum
      }
    )
  }

  // ? --------------- checkOutPayment ---------------
  checkOutPayment(id: string, orderInfo: object): Observable<any> {
    // return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://moust2fa.github.io/E-Commerce/`,
      {
        shippingAddress: orderInfo
      }
    )
  }

  // ? --------------- AllOrder ---------------
  allOrder(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `orders/`)
  }
}
