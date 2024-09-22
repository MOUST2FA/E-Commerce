import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  isLoading: boolean = false;
  isMessage: string = "";
  // ~--------------------createObjectForm----------------
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  })

  // ~--------------------submitForm----------------
  handelForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === "success") {
            this.isLoading = false;
            localStorage.setItem('_token', response.token)
            this._Router.navigate(['/home'])
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
