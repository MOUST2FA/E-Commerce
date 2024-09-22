import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('translateY', [
      transition('void=>*', [
        style({
          opacity:0,
          transform: 'translateY(100px)'
        }),
        animate(500, style({
          opacity:1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class CategoryComponent implements OnInit {
  constructor(private _BlankService: BlankService) { }
  getCategory: any[] = [];
  ngOnInit(): void {
    // ~-----------------get All Category--------------
    this._BlankService.getCategory().subscribe({
      next: (response) => {
        this.getCategory = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
