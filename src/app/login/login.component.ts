import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule, FloatLabelModule, FormsModule, PasswordModule,ButtonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userNameValue: string | undefined;
  passwordValue: string | undefined;
  errorMsg: string = '';
  userData: any = {
    userName: 'user',
    password:'@UserPass2024'
  };

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _Router:Router){}

  handleLogin(loginForm: FormGroup) {
    let userNameValue = loginForm.value.userName;
    let passwordValue = loginForm.value.password;

    if (userNameValue == this.userData.userName && passwordValue == this.userData.password) {
      localStorage.setItem('isLogin', 'true');
      this._Router.navigate(['/to-do']);
    } else {
      this.errorMsg = 'Username or password is incorrect';
    }
    
  }


}
