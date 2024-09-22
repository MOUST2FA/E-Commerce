import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  animations:[
    trigger('translateY',[
      transition('void=>*',[
        style({
          opacity:0,
          transform:'translateY(100px)'
        }),
        animate(500 ,style({
          opacity:1,
          transform:'translateY(0)'
        }))
      ])
    ])
  ]
})
export class BrandsComponent implements OnInit {
  constructor(private _BlankService: BlankService) { }
  getBrands: any[] = [];


  ngOnInit(): void {
    // ~-------------getAllBrands--------------
    this._BlankService.getBrands().subscribe({
      next: (response) => {
        this.getBrands = response.data
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
