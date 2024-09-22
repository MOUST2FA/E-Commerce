import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { CartService } from 'src/app/service/cart.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/service/wishlist.service';
import { animate, group, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
        }))
      ])
    ]),
  ]
})
export class ProductComponent {
  constructor(private _BlankService: BlankService, private _CartService: CartService,
    private _Renderer2: Renderer2, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }

  displayProduct: any[] = [];
  wishlistId: any = [];
  term: string = ``;
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;


  ngOnInit(): void {
    // ~---------------get All Product-------------
    this._BlankService.getProduct().subscribe({
      next: (response) => {
        this.displayProduct = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (err) => {
        console.log(err);

      }
    })

    // ~---------------get All Wishlist-------------
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
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(elm, 'disabled')
        this._CartService.cartNum.next(response.numOfCartItems)
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
        console.log(response.data.length);
        this._WishlistService.numWishlist.next(response.data.length)
        this._ToastrService.success(response.message)
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // ~---------------RemoveWishlist-------------
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


  // ~---------------PageChanged-------------
  pageChanged(event: any): void {
    this._BlankService.getProduct(event).subscribe({
      next: (response) => {
        this.displayProduct = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
