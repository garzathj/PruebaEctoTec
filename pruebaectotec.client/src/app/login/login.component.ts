import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @Output() loginEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      this.authService.login(user).subscribe(
        (response) => {
          if (response.token) {
            localStorage.setItem('BearerToken', response.token);
            this.router.navigate(["/home"]);
          } else {
            alert('Usuario y/o contraseña incorrectos.');
          }
        },
        (error) => {
          console.log(error);
          alert('Usuario y/o contraseña incorrectos.');
        }
      );
    }
  }
}
