import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
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
export class CheckOutComponent implements OnInit {

  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }
  isLoading: boolean = false;
  isMessage: string = "";
  paramCart: any = '';

  // ~--------------------gitIdCart----------------
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.paramCart = param.get('id')
      }
    })
  }

  // ~--------------------createObjectFormCheckOut----------------
  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
  })

  // ~--------------------submitFormCheckOut----------------
  handelForm(): void {
    if (this.checkOutForm.valid) {
      this.isLoading = true;
      this._CartService.checkOutPayment(this.paramCart, this.checkOutForm.value).subscribe({
        next: (response) => {
          if (response.status === "success") {
            window.open(response.session.url , '_self')
            this.isLoading = false;
          }
        }, error: (err) => {
          console.log(err);
          this.isMessage = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }
}
