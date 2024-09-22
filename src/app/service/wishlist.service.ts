import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient) { }

  numWishlist: BehaviorSubject<number> = new BehaviorSubject(0)

  // ? --------------- baseUrl ---------------
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  // ? --------------- AddToWishlist ---------------
  addToWishlist(idWish: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist`,
      {
        productId: idWish
      }
    )
  }

  // ? --------------- GetToWishlist ---------------
  getToWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`)
  }

  // ? --------------- RemoveToWishlist ---------------
  removeToWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`)
  }
}
