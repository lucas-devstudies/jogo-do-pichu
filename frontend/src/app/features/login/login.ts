import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CustomInput } from "../../shared/components/custom-input/custom-input";
import { Button } from "../../core/components/button/button";
import { Auth } from '../../core/auth/auth';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

declare var bootstrap: any;

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

  messageToast:string = "";

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  confirmar(event:Event) {
    event.preventDefault();
    this.auth.login(this.loginDTO.email,this.loginDTO.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['principal']);
      },
      error: (err) => {
        const mensagemErro = err.error?.message || 'Erro inesperado ao fazer login';
        this.showToast(mensagemErro);
      }
    });
  }
  reverse(){
    this.router.navigate(['registro'])
  }
  @ViewChild('liveToast', { static: true }) toastElement!: ElementRef;

  showToast(text: string) {
    this.messageToast = text;
    
    this.cdr.detectChanges();

    const toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);
    toastInstance.show();
  }
}