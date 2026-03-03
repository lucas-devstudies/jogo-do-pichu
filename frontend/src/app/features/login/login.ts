import { Component } from '@angular/core';
import { CustomInput } from "../../shared/components/custom-input/custom-input";
import { Button } from "../../core/components/button/button";
import { Auth } from '../../core/auth/auth';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-login',
  imports: [CustomInput, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  email: string = "";
  password: string = "";

  constructor(
    private auth: Auth,
    private router: Router,
    private user: UserService
  ) {}

  confirmar(event:Event) {
    event.preventDefault();
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access);
        this.router.navigate(['home']);
      },
      error: (err) => {
        alert("Erro ao logar");
        console.log("Erro de login:", err);
      }
    });
  }
  reverse(){
    this.router.navigate(['register'])
  }
}