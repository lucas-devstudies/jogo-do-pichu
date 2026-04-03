import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Button } from "../../core/components/button/button";
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { CustomInput } from "../../shared/components/custom-input/custom-input";

declare var bootstrap: any;

interface RegisterDTO {
  name:string;
  email:string;
  password:string;
  theme:string;
}

@Component({
  selector: 'app-register',
  imports: [Button, CustomInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  
  registerDTO:RegisterDTO = {
    name:'',
    email:'',
    password:'',
    theme:'Dark'
  } 

  messageToast:string = "";


  constructor(
    private router: Router,
    private user:UserService,
    private cdr: ChangeDetectorRef
  ){}

  confirmar(event:Event) {
    event.preventDefault();
      this.user.add(this.registerDTO.name,this.registerDTO.email,this.registerDTO.password,this.registerDTO.theme).subscribe({
        next: (dados) => {
          this.showToast(`Usuário ${dados.name} cadastrado!`);
          this.router.navigate(['login'])
          
        },
        error: (err) => {
          console.log(err)
          const mensagemErro = err.error?.message || 'Erro inesperado ao fazer login';
          this.showToast(mensagemErro);
        }
    });
  }
  reverse(){
    this.router.navigate(['login'])
  }
  @ViewChild('liveToast', { static: true }) toastElement!: ElementRef;

  showToast(text: string) {
    this.messageToast = text;
    
    this.cdr.detectChanges();

    const toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);
    toastInstance.show();
  }
}
