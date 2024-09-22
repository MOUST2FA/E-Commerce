import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
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
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _Renderer2: Renderer2) { }
  getCart: any = [];

  ngOnInit(): void {
    // ~----------------getAllCart-------------
    this._CartService.getCart().subscribe({
      next: (response) => {
        this.getCart = response.data
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  // ~----------------removeElementCart-------------
  removeCartElement(id: string, elmRemove: HTMLButtonElement): void {
    this._Renderer2.setAttribute(elmRemove, 'disabled', 'true')
    this._CartService.removeCart(id).subscribe({
      next: (response) => {
        this._Renderer2.removeAttribute(elmRemove, 'disabled')
        this.getCart = response.data
        this._CartService.cartNum.next(response.numOfCartItems)
      }, error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(elmRemove, 'disabled')
      }
    })
  }

  // ~----------------removeAllCart-------------
  clearAllCart(elmClear: HTMLButtonElement): void {
    this._Renderer2.setAttribute(elmClear, 'disabled', 'true')
    this._CartService.clearAllCart().subscribe({
      next: (response) => {
        this.getCart = ''
        this._Renderer2.removeAttribute(elmClear, 'disabled')
        this._CartService.cartNum.next(0)
      }, error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(elmClear, 'disabled')
      }
    })
  }

  // ~---------------- next & prev ElementCart -------------
  changeCount(id: string, countNum: number, elm1: HTMLButtonElement, elm2: HTMLButtonElement): void {
    if (countNum >= 1) {
      this._Renderer2.setAttribute(elm1, 'disabled', 'true')
      this._Renderer2.setAttribute(elm2, 'disabled', 'true')
      this._CartService.changeCountCart(id, countNum).subscribe({
        next: (response) => {
          this.getCart = response.data
          this._Renderer2.removeAttribute(elm1, 'disabled')
          this._Renderer2.removeAttribute(elm2, 'disabled')
        }, error: (err) => {
          console.log(err);
          this._Renderer2.removeAttribute(elm1, 'disabled')
          this._Renderer2.removeAttribute(elm2, 'disabled')
        }
      })
    }
  }

}
