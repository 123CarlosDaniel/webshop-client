import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core'
import { FormGroup, Validators, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms'

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ErrorStateMatcher } from '@angular/material/core'
import { AuthService } from '@services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  selector: 'app-admin-login',
  providers: [AuthService]
})
export class LoginComponent {
  isValidForm = true
  showSpinner = false
  hide = true

  private authService = inject(AuthService)  
  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

  loginForm = new FormGroup({
    username: new FormControl('admin123', [Validators.required]),
    password: new FormControl('admin123', [Validators.required])
  })

  matcher = new MyErrorStateMatcher()
  loginFormSub: Subscription

  ngOnInit() {
    this.loginFormSub = this.loginForm.statusChanges.subscribe(() => {
      this.isValidForm = this.loginForm.valid
    })
  }

  ngOnDestroy() {
    this.loginFormSub.unsubscribe()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showSpinner = true
      const {username, password} = this.loginForm.getRawValue()
      this.authService.login(username!, password!).subscribe({
        next: (res) => {
          this.router.navigate(['/admin'])
        },
        error: (err) => {
          if (err.statusText == "OK") {
            this.snackBar.open("Credenciales invalidas", 'Close', {duration: 3000})
          }
          else {
            this.snackBar.open("Error del servidor", 'Close', {duration: 3000})
          }
          this.showSpinner = false
        }
      })
    }
 
  }
}
