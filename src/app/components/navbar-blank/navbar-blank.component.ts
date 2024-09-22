import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _Renderer2: Renderer2, private _Router: Router, private _CartService: CartService,
    private _WishlistService: WishlistService) { }

  cartCount: number = 0;
  countWishlist: number = 0;
  nameUser: any = ``;
  userIcon: string = ``;
  them: any = localStorage.getItem('them');

  ngOnInit(): void {
    // ~----------------GetCountCartIcon-----------------
    this._CartService.cartNum.subscribe({
      next: (data) => {
        this.cartCount = data
      }
    })

    // ~----------------GetCountWishlistIcon-----------------
    this._WishlistService.numWishlist.subscribe({
      next: (data) => {
        this.countWishlist = data
      }
    })

    // ~----------------GetCart-----------------
    this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartCount = response.numOfCartItems
      }
    })

    // ~----------------GetWishlist-----------------
    this._WishlistService.getToWishlist().subscribe({
      next: (response) => {
        this.countWishlist = response.data.length
      }
    })

    // ~----------------ForgetPasswordIcon-----------------
    if (localStorage.getItem('name') !== null) {
      this.nameUser = localStorage.getItem('name')
    } else {
      this.userIcon = `<i class="fa-solid fa-user text-[18px]"></i>`
    }

    // ~----------------DarkMode-----------------
    // ?----------DeviceSetting------------
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   document.documentElement.classList.add('dark')
    // }
    // ?----------localStorage-------------
    if (this.them === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }

  // ~----------------OnScrollNaveBar-----------------
  @ViewChild('nav') navBlank!: ElementRef
  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 100) {
      this._Renderer2.addClass(this.navBlank.nativeElement, 'py-2')
      this._Renderer2.addClass(this.navBlank.nativeElement, 'px-6')
    } else {
      this._Renderer2.removeClass(this.navBlank.nativeElement, 'py-2')
      this._Renderer2.removeClass(this.navBlank.nativeElement, 'px-6')
    }
  }

  // ~----------------MenuNavBarResponse-----------------
  @ViewChild('navMenu') navMenuElement!: ElementRef;
  @ViewChild('openMenu1') openMenuElement!: ElementRef;
  @ViewChild('exitMenu1') exitMenuElement!: ElementRef;

  openMenu() {
    this._Renderer2.removeClass(this.navMenuElement.nativeElement, 'right-full')
    this._Renderer2.addClass(this.navMenuElement.nativeElement, 'right-0')
    this._Renderer2.addClass(this.openMenuElement.nativeElement, 'hidden')
    this._Renderer2.removeClass(this.exitMenuElement.nativeElement, 'hidden')
  }

  exitMenu() {
    this._Renderer2.addClass(this.navMenuElement.nativeElement, 'right-full')
    this._Renderer2.removeClass(this.navMenuElement.nativeElement, 'right-0')
    this._Renderer2.removeClass(this.openMenuElement.nativeElement, 'hidden')
    this._Renderer2.addClass(this.exitMenuElement.nativeElement, 'hidden')
  }

  // ~----------------SingOut-----------------
  singOut(): void {
    localStorage.removeItem('_token')
    localStorage.removeItem('name')
    this._Router.navigate(['/login'])
  }

  // ~----------------DarkModeIcon-----------------
  @ViewChild('btnDark') darkElement!: ElementRef
  @ViewChild('btnSun') sunElement!: ElementRef

  darkMode(): void {
      this.them = 'dark'
      document.documentElement.classList.add('dark')
      this._Renderer2.addClass(this.darkElement.nativeElement, 'hidden')
      this._Renderer2.removeClass(this.sunElement.nativeElement, 'hidden')
      localStorage.setItem('them', this.them)
  }

  lightMode(): void {
      this.them = 'light'
      document.documentElement.classList.remove('dark')
      this._Renderer2.removeClass(this.darkElement.nativeElement, 'hidden')
      this._Renderer2.addClass(this.sunElement.nativeElement, 'hidden')
      localStorage.setItem('them', this.them)
  }
}
