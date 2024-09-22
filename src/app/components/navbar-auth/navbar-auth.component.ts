import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-auth.component.html',
  styleUrls: ['./navbar-auth.component.scss']
})
export class NavbarAuthComponent implements OnInit {
  constructor(private _Renderer2: Renderer2) { }
  them: any = localStorage.getItem('them');

  ngOnInit(): void {
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

  // ~------------------StartNavMenu--------------------
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
