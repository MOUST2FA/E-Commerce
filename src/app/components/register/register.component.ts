import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  isLoading: boolean = false;
  isMessage: string = "";

  // ~--------------------createObjectForm----------------
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword: new FormControl('', []),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: [this.confirmPassword] } as FormControlOptions)

  // ~--------------------confirmPassword----------------
  confirmPassword(group: FormGroup): void {
    const password = group.get('password')
    const rePassword = group.get('rePassword')
    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    }
    if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }

  // ~--------------------submitForm----------------
  handelForm(): void {
    if(this.registerForm.valid){
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message === "success") {
            this.isLoading = false;
            this._Router.navigate(['/login'])
            localStorage.setItem('name' , this.registerForm.value.name)
          }

        }, error: (err) => {
          this.isMessage = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }

}
