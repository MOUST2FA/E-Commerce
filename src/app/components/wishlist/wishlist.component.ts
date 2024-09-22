import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/service/wishlist.service';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  animations: [
    trigger('translateY', [
      transition('void=>*', [
        style({
          opacity: 0,
          transform: 'translateY(100px)'
        }),
        animate(500, style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService: WishlistService, private _Renderer2: Renderer2,
    private _CartService: CartService, private _ToastrService: ToastrService) { }

  displayWishlist: any[] = [];
  wishlistId: any = [];

  ngOnInit(): void {
    // ~-------------getToWishlist--------------
    this._WishlistService.getToWishlist().subscribe({
      next: (response) => {
        this.displayWishlist = response.data
        const newData = response.data.map((item: any) => item._id)
        this.wishlistId = newData
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  // ~-------------AddToCart--------------
  addCart(id: string, elm: HTMLButtonElement): void {
    this._Renderer2.setAttribute(elm, 'disabled', 'true')
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNum.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(elm, 'disabled')
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(elm, 'disabled')
      }
    })
  }

  // ~-------------AddWishlist--------------
  addWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // ~-------------removeWishlist--------------
  removeWishlist(id: string): void {
    this._WishlistService.removeToWishlist(id).subscribe({
      next: (response) => {
        this.wishlistId = response.data
        // ~-------------removeProd--------------
        const newProdWishlist = this.displayWishlist.filter((item: any) => this.wishlistId.includes(item._id))
        this.displayWishlist = newProdWishlist
        this._WishlistService.numWishlist.next(response.data.length)
        this._ToastrService.error(response.message)
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}
