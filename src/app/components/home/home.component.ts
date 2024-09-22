import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BlankService } from 'src/app/service/blank.service';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/service/wishlist.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('translateY', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: "translateY(100px)"
        }),
        animate(500, style({
          opacity: 1,
          transform: "translateY(0)"
        })),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private _BlankService: BlankService, private _CartService: CartService,
    private _Renderer2: Renderer2, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }

  displayProduct: any[] = [];
  displayCategory: any[] = [];
  wishlistId: any = [];

  ngOnInit(): void {
    // ~---------------get All Product-------------
    this._BlankService.getProduct().subscribe({
      next: (response) => {
        this.displayProduct = response.data;
      },
      error: (err) => {
        console.log(err);

      }
    })

    // ~---------------get slide Category-------------
    this._BlankService.getCategory().subscribe({
      next: (response) => {
        this.displayCategory = response.data;
      },
      error: (err) => {
        console.log(err);

      }
    })

    // ~---------------getToWishlist-------------
    this._WishlistService.getToWishlist().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id)
        this.wishlistId = newData
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  // ~---------------AddToCart-------------
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

  // ~---------------AddToWishlist-------------
  addWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (response) => {
        this.wishlistId = response.data
        this._WishlistService.numWishlist.next(response.data.length)
        this._ToastrService.success(response.message)
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // ~---------------RemoveToWishlist-------------
  removeWishlist(id: string): void {
    this._WishlistService.removeToWishlist(id).subscribe({
      next: (response) => {
        this.wishlistId = response.data
        this._ToastrService.error(response.message)
        this._WishlistService.numWishlist.next(response.data.length)
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // ~---------------get slide home-------------
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  // ~---------------get slide Category-------------
  customOptionsCAtegory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      550: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

}
