import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlankService } from 'src/app/service/blank.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
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
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute,
    private _BlankService: BlankService, private _CartService: CartService,
    private _Renderer2: Renderer2, private _ToastrService: ToastrService) { }

  detailsId: any = '';
  displayDetails: any = {};

  ngOnInit(): void {
    // ~-------------------get Id Details------------------
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.detailsId = params.get('id')
      }
    })

    // ~-------------------get Details------------------
    this._BlankService.getDetails(this.detailsId).subscribe({
      next: (response) => {
        this.displayDetails = response.data
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  // ~-------------------AddToCart------------------
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

  // ~-------------------slide Details------------------
  customOptionsDetails: OwlOptions = {
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
}
