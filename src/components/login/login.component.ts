import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { user } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm: FormGroup;
  show = true;
  loginError = ''; // משתנה לשגיאות התחברות

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
    });
  }

  showpasword() {
    this.show = !this.show;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value.user;

      // בדיקה אם אנחנו בדפדפן
      if (typeof window !== 'undefined') {
        // קריאה לשירות ההתחברות
        this.AuthService.login(email, password).subscribe({
          next: (data) => {
            console.log("נכנסת בהצלחה");
            localStorage.setItem('role', data.role);
            sessionStorage.setItem('token', data.token); // שמירת הטוקן
            this.router.navigate(['/dashboard']); // ניווט לעמוד הבא לאחר התחברות מוצלחת
          },
          error: (err) => {
            console.error("שגיאה בהתחברות", err);
            this.loginError = 'לא הצלחנו להתחבר. אנא בדוק את פרטי הכניסה שלך.';
          }
        });
      } else {
        console.error('localStorage or sessionStorage not available');
      }
    } else {
      console.log("הטופס לא תקין");
    }
  }
}
