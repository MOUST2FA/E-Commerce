import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/service/forget-password.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
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
export class ForgetPasswordComponent {

  constructor(private _ForgetPasswordService: ForgetPasswordService, private _Router: Router) { }

  step1: boolean = true
  step2: boolean = false
  step3: boolean = false
  email: string = ''
  isMsg: string = ''
  isLoading: boolean = false;

  forgetCodePassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,8}$/)])
  })

  resetCodePassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,}/)])
  })


  passwordForget(): void {
    this.isLoading = true
    let forgetPassword = this.forgetCodePassword.value;
    this.email = forgetPassword.email
    this._ForgetPasswordService.forgotPasswords(forgetPassword).subscribe({
      next: (response) => {
        this.isMsg = response.message
        this.isLoading = false
        this.step1 = false
        this.step2 = true
      }, error: (err) => {
        this.isMsg = err.error.message
        this.isLoading = false
      }
    })
  }
  passwordReset(): void {
    this.isLoading = true
    let resetCode = this.resetCodeForm.value;
    this._ForgetPasswordService.resetCode(resetCode).subscribe({
      next: (response) => {
        this.isMsg = response.status
        this.isLoading = false
        this.step2 = false
        this.step3 = true
      }, error: (err) => {
        this.isMsg = err.error.status
        this.isLoading = false
      }
    })
  }
  passwordCodeForget(): void {
    this.isLoading = true
    let resetPassword = this.resetCodePassword.value;
    resetPassword.email = this.email
    this._ForgetPasswordService.resetPassword(resetPassword).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('_token', response.token)
          this.isLoading = false
          this._Router.navigate(['/home'])
        }

      }, error: (err) => {
        this.isMsg = err.error.message
        this.isLoading = false
      }
    })
  }

}
