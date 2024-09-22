import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { BlankService } from 'src/app/service/blank.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-brands.component.html',
  styleUrls: ['./product-brands.component.scss'],
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
export class ProductBrandsComponent {
  constructor(private _Renderer2: Renderer2, private _CartService: CartService,
    private _ToastrService: ToastrService, private _BlankService: BlankService, private _ActivatedRoute: ActivatedRoute) { }

  displayProductBrands: any[] = [];
  prodId: any = ``;

  ngOnInit(): void {
    // ~----------------getIdProduct---------------
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.prodId = param.get('id')
      }
    })

    // ~----------------getProductBrands---------------
    this._BlankService.getProductBrands(this.prodId).subscribe({
      next: (response) => {
        this.displayProductBrands = response.data
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // ~----------------AddToCart---------------
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

}
