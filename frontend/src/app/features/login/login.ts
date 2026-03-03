import { Component } from '@angular/core';
import { CustomInput } from "../../shared/components/custom-input/custom-input";
import { Button } from "../../core/components/button/button";
import { Auth } from '../../core/auth/auth';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

interface LoginDTO{
  email:string;
  password:string;
}

@Component({
  selector: 'app-login',
  imports: [CustomInput, Button, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginDTO:LoginDTO = {
    email:'',
    password:''
  } 

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  confirmar(event:Event) {
    event.preventDefault();
    this.auth.login(this.loginDTO.email,this.loginDTO.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['principal']);
      },
      error: (err) => {
        // alert("Erro ao logar");
        console.log(this.loginDTO)
        console.log(err);      
      }
    });
  }
  reverse(){
    this.router.navigate(['registro'])
  }
}