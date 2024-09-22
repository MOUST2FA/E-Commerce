import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }
  paramId: any = '';
  userOrderId:any = [];


  ngOnInit(): void {
    // ~----------------getAllOlder--------------
    this._CartService.allOrder().subscribe({
      next: (response) => {
        this.userOrderId = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
